class ApplicationController < ActionController::Base
  def after_sign_in_path_for(_resource)
    # always go to feeds path
    feeds_path
  end
end
