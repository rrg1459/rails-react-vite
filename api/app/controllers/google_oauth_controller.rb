# frozen_string_literal: true

# Controller for Google OAuth token verification
class GoogleOauthController < ApplicationController
  def verify_token
    id_token = params[:id_token]
    return render_error('No id_token provided', :bad_request) if id_token.blank?

    payload = validate_id_token(id_token)
    return if performed? # Si validate_id_token ya renderizó un error

    user = find_or_create_user_from_payload(payload)
    token = user.create_new_auth_token
    render json: { token: token }
  end

  private

  def validate_id_token(id_token)
    validator = GoogleIDToken::Validator.new
    begin
      validator.check(id_token, ENV.fetch('GOOGLE_CLIENT_ID', nil))
    rescue GoogleIDToken::ValidationError => e
      render_error("Invalid token: #{e.message}", :unauthorized)
      nil # Asegurarse de que el método devuelve nil si hay un error
    end
  end

  def find_or_create_user_from_payload(payload)
    User.find_or_create_by(email: payload['email']) do |u|
      u.password = Devise.friendly_token[0, 20]
      u.uid = payload['sub']
      u.provider = 'google_oauth2'
      u.name = payload['name']
    end
  end

  def render_error(message, status)
    render json: { error: message }, status: status
  end
end
