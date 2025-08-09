# frozen_string_literal: true

# module Cutom for API
module Custom
  module DeviseTokenAuth
    # Controller for user passwords in Devise Token Auth.
    class PasswordsController < ::DeviseTokenAuth::PasswordsController
      def edit
        params.delete(:redirect_url)
        params.delete(:config)
        super
      end

      def create
        params.delete(:redirect_url)
        params.delete(:password)
        super
      end

      def update
        params.delete(:uid)
        params.delete(:client)
        params.delete(:access_token)
        super
      end
    end
  end
end
