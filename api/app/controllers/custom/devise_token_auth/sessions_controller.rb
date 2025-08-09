# frozen_string_literal: true

module Custom
  module DeviseTokenAuth
    # Controller for user sessions in Devise Token Auth.
    class SessionsController < ::DeviseTokenAuth::SessionsController
      def create
        params.delete(:session)
        super
      end
    end
  end
end
