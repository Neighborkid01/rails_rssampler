module ReactHelper
  def react_component(name, props = {}, options = {}, &block)
    context = {
      csrf_token: form_authenticity_token,
      current_user: current_user,
    }

    wrapped_props = {
      context: context,
      props: props,
      component: name,
    }

    super("shared/rails_component", wrapped_props, options, &block)
  end
end
