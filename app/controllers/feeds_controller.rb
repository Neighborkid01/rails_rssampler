class FeedsController < ApplicationController
  def index
    @feeds = Feed.all
  end

  def show
    @feed = Feed.find_by(feed_code: params[:feed_code])
    @filters = @feed.feed_filters
    respond_to do |format|
      format.html
      format.xml {
        parser_service = FeedFilterParsingService.new(@feed)
        render xml: parser_service.parse
      }
    end
  end

  def new
    @feed = Feed.new
    @filters = [FeedFilter.new]
  end

  def create
    @feed = Feed.new(feed_params)
    ActiveRecord::Base.transaction do
      @feed.save!
      conditions = JSON.parse(feed_filter_params[:conditions])
      substitutions = JSON.parse(feed_filter_params[:substitutions])
      FeedFilter.create!(feed_filter_params.merge(feed_id: @feed.id, conditions: conditions, substitutions: substitutions))
    end
    redirect_to feeds_path
  rescue ActiveRecord::RecordInvalid, ActiveRecord::NotNullViolation
    render "new"
  end

  def edit
    @feed = Feed.find_by(feed_code: params[:feed_code])
    @filters = @feed.feed_filters
  end

  def update
    @feed = Feed.find_by(feed_code: params[:feed_code])
    ActiveRecord::Base.transaction do
      @feed.update! feed_params
      conditions = JSON.parse(feed_filter_params[:conditions])
      substitutions = JSON.parse(feed_filter_params[:substitutions])
      FeedFilter.update(feed_filter_params.merge(conditions: conditions, substitutions: substitutions))
    end
    redirect_to feed_path(@feed.feed_code)
  rescue ActiveRecord::RecordInvalid, ActiveRecord::NotNullViolation
    render "edit"
  end

  def destroy
    @feed = Feed.find_by(feed_code: params[:feed_code])
    @feed.destroy!
    redirect_to feeds_path
  end

  private
    def feed_params
      params.require(:feed).permit(:name, feed_filter: [:url, :pronoun, { conditions: [], substitutions: [] }])
    end

    def feed_filter_params
      params.require(:feed_filter).permit(:url, :pronoun, :conditions, :substitutions)
    end
end
