# frozen_string_literal: true

module Custom
  module DeviseTokenAuth
    # Controller for user registrations in Devise Token Auth.
    class RegistrationsController < ::DeviseTokenAuth::RegistrationsController
      protected

      def sign_up_params
        params.require(:registration).permit(:email, :password,
                                             :password_confirmation)
      end
    end
  end
end
