# frozen_string_literal: true

# spec/controllers/custom/devise_token_auth/passwords_controller_spec.rb
require 'rails_helper'

RSpec.describe Custom::DeviseTokenAuth::PasswordsController,
               type: :controller do
  # Crea un "doble" de la clase padre para espiarla.
  let(:devise_controller_spy) { instance_double(DeviseTokenAuth::PasswordsController) }

  # El mapeo sigue siendo necesario para que Devise funcione.
  before do
    request.env['devise.mapping'] = Devise.mappings[:v1_user]
  end

  # --- Test para el método `create` ---
  describe 'POST #create' do
    let(:params) do
      {
        email: 'user@example.com',
        redirect_url: 'http://example.com/reset',
        password: 'new-password'
      }
    end

    it 'deletes `redirect_url` and `password` from params' do
      post :create, params: params
      expect(controller.params.key?(%i[redirect_url password])).to be false
    end
  end

  # --- Test para el método `update` ---
  describe 'PUT #update' do
    let(:params) do
      {
        uid: 'user@example.com',
        client: 'client_id_token',
        access_token: 'access_token_value',
        password: 'new-password',
        password_confirmation: 'new-password'
      }
    end

    it 'deletes `uid`, `client`, and `access_token` from params' do
      put :update, params: params
      expect(controller.params.key?(%i[uid client access_token])).to be false
    end
  end
end
