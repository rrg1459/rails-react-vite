# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Replace "http://localhost:5173" with the actual origin of your React app.
    # If your React app is running on a different port or domain, update this.
    # For development, you might use "*" to allow all origins, but this is NOT
    # recommended for production due to security implications.
    origins 'http://localhost:5173'

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             expose: %w[access-token expiry token-type uid client],
             credentials: true
  end
end
