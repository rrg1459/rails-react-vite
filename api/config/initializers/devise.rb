# frozen_string_literal: true

Devise.setup do |config|
  config.parent_controller = 'ActionController::API' # Si estás usando API

  config.mailer_sender = 'change-me-at-config-initializers-devise@example.com'

  config.mailer = 'CustomDeviseMailer'

  require 'devise/orm/active_record'

  config.case_insensitive_keys = [:email]

  config.strip_whitespace_keys = [:email]

  config.skip_session_storage = [:http_auth]

  config.stretches = Rails.env.test? ? 1 : 12

  config.reconfirmable = true

  config.confirmation_keys = [:email]

  config.expire_all_remember_me_on_sign_out = true

  config.password_length = 6..128

  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/

  config.unlock_keys = [:email]

  config.unlock_strategy = :both

  config.maximum_attempts = 5

  config.unlock_in = 30.minutes

  config.reset_password_keys = [:email]

  config.reset_password_within = 6.hours

  config.sign_out_via = :delete

  config.responder.error_status = :unprocessable_entity
  config.responder.redirect_status = :see_other
end
