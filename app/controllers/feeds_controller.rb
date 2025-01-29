class FeedsController < ApplicationController
  def index
    @feeds = Feed.all
  end

  def show
    @feed = Feed.find_by(feed_code: params[:feed_code])
    @filters = @feed.feed_filters
  end

  def new
    @feed = Feed.new
    @filters = [FeedFilter.new]
  end

  def create
    @feed = Feed.new(feed_params)
    @feed.feed_code = SecureRandom.urlsafe_base64(7)
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
    if @feed.update(feed_params)
      redirect_to feeds_path
    else
      render "edit"
    end
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
