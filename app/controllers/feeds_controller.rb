class FeedsController < ApplicationController
  load_and_authorize_resource find_by: :feed_code, id_param: :feed_code, except: [:preview]

  def index
  end

  def show
    @filters = @feed.feed_filters
    respond_to do |format|
      format.html
      format.xml {
        parser_service = FeedFilterParsingService.new(@filters)
        render xml: parser_service.parse
      }
    end
  end

  def preview
    conditions = JSON.parse(feed_filter_params[:conditions])
    substitutions = JSON.parse(feed_filter_params[:substitutions])
    filter = FeedFilter.new(feed_filter_params.merge(feed_id: nil, conditions: conditions, substitutions: substitutions))
    parser_service = FeedFilterParsingService.new([filter])
    parser_service.parse(generate_preview: true)
    render json: {
      title: parser_service.title,
      removed_items: parser_service.removed_items,
      retained_items: parser_service.retained_items,
    }
  end

  def new
    @filters = [FeedFilter.new]
  end

  def create
    ActiveRecord::Base.transaction do
      raise ActiveRecord::Rollback unless @feed.save
      conditions = JSON.parse(feed_filter_params[:conditions])
      substitutions = JSON.parse(feed_filter_params[:substitutions])
      filter = FeedFilter.new(feed_filter_params.merge(feed_id: @feed.id, conditions: conditions, substitutions: substitutions))
      @filters = [filter]
      raise ActiveRecord::Rollback unless filter.save
    end
    respond_to do |format|
      if @feed.errors.blank? && @filters.all? { |f| f.errors.blank? }
        format.html { redirect_to feeds_path }
        format.json { render json: { feed: @feed.as_json(include: :filters) }, status: :created }
      else
        format.html { render "new", status: :unprocessable_entity }
        # Only works for 1 filter for now
        format.json { render json: { error: { feed: @feed.errors, feed_filter: @filters&.first&.errors || {} } }, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @filters = @feed.feed_filters
  end

  def update
    ActiveRecord::Base.transaction do
      raise ActiveRecord::Rollback unless @feed.update feed_params
      conditions = JSON.parse feed_filter_params[:conditions]
      substitutions = JSON.parse feed_filter_params[:substitutions]
      filter = FeedFilter.find feed_filter_params[:id]
      @filters = [filter]
      raise ActiveRecord::Rollback unless filter.update feed_filter_params.merge(feed_id: @feed.id, conditions: conditions, substitutions: substitutions)
    end
    respond_to do |format|
      if @feed.errors.blank? && @filters.all? { |f| f.errors.blank? }
        format.html { redirect_to edit_feed_path(@feed) }
        format.json { render json: { feed: @feed.as_json(include: :filters) }, status: :ok }
      else
        format.html { render "new", status: :unprocessable_entity }
        # Only works for 1 filter for now
        format.json { render json: { error: { feed: @feed.errors, feed_filter: @filters&.first&.errors || {} } }, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    feed_name = @feed.name
    respond_to do |format|
      if  @feed.destroy!
        format.html { redirect_to feeds_path, notice: "Feed '#{feed_name}' was successfully deleted." }
        format.json { head :no_content }
      else
        format.html { redirect_to feeds_path, alert: "Failed to delete feed '#{feed_name}'.", status: :unprocessable_entity }
        format.json { render json: { error: "Failed to delete feed '#{feed_name}'." }, status: :unprocessable_entity }
      end
    end
  end

  private

    def current_ability
      @current_ability ||= Ability.new(current_user, request)
    end

    def feed_params
      params.require(:feed).permit(:user_id, :name, feed_filter: [:url, :pronoun, { conditions: [], substitutions: [] }])
    end

    def feed_filter_params
      params.require(:feed_filter).permit(:id, :url, :pronoun, :conditions, :substitutions)
    end
end
