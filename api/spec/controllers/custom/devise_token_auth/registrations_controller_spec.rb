# frozen_string_literal: true

# spec/controllers/custom/devise_token_auth/registrations_controller_spec.rb
require 'rails_helper'

RSpec.describe Custom::DeviseTokenAuth::RegistrationsController,
               type: :controller do
  describe '#sign_up_params' do
    let(:permitted_params) do
      {
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'password'
      }
    end

    let(:unpermitted_params) do
      {
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'password',
        name: 'John Doe',
        address: '123 Main St'
      }
    end

    # Usamos `let` para definir el mapeo de Devise.
    let(:devise_mapping) { Devise.mappings[:v1_user] }

    before do
      # Asignamos el mapeo a la solicitud, evitando la variable de instancia.
      request.env['devise.mapping'] = devise_mapping
    end

    it 'permits only the allowed parameters' do
      post :create, params: { registration: unpermitted_params }
      controller_params = controller.send(:sign_up_params)
      expect(controller_params).to eq(ActionController::Parameters.new(permitted_params).permit!)
    end
  end
end
