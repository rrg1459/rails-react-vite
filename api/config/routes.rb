# frozen_string_literal: true

Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?

  scope :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'custom/devise_token_auth/registrations',
        sessions: 'custom/devise_token_auth/sessions',
        passwords: 'custom/devise_token_auth/passwords'
      }

      get 'users/index' => 'users#index'
    end
  end
  post 'google_oauth2_token', to: 'google_oauth#verify_token'
end
