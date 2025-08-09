# frozen_string_literal: true

# spec/controllers/google_oauth_controller_spec.rb
require 'rails_helper'

RSpec.describe GoogleOauthController, type: :controller do
  # Usaremos un token de ejemplo para las pruebas exitosas
  let(:valid_id_token) { 'valid_token' }
  let(:invalid_id_token) { 'invalid_token' }

  # Payload simulado que recibiríamos de Google
  let(:payload) do
    {
      'sub' => '12345',
      'email' => 'user@example.com',
      'name' => 'Test User'
    }
  end

  # Create a spy for the validator instance
  let(:validator_spy) { instance_double(GoogleIDToken::Validator) }

  before do
    # Tell the GoogleIDToken::Validator class to return your spy
    # when a new instance is created.
    allow(GoogleIDToken::Validator).to receive(:new).and_return(validator_spy)

    # Now, stub the specific spy instance instead of using `any_instance_of`.
    allow(validator_spy)
      .to receive(:check)
      .with(valid_id_token, any_args)
      .and_return(payload)

    # For the invalid token case
    allow(validator_spy)
      .to receive(:check)
      .with(invalid_id_token, any_args)
      .and_raise(GoogleIDToken::ValidationError.new('Invalid signature'))
  end

  # --- Escenarios de error ---
  describe 'POST #verify_token' do
    context 'when no id_token is provided' do
      it 'returns a bad request error' do
        post :verify_token, params: { id_token: '' }
        expect(response).to have_http_status(:bad_request)
      end

      it 'returns a no id_token provided' do
        post :verify_token, params: { id_token: '' }
        expect(json_response['error']).to eq('No id_token provided')
      end
    end

    context 'when an invalid id_token is provided' do
      it 'returns an unauthorized error' do
        post :verify_token, params: { id_token: invalid_id_token }
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns an invalid token' do
        post :verify_token, params: { id_token: invalid_id_token }
        expect(json_response['error']).to include('Invalid token')
      end
    end

    # --- Escenarios de éxito ---
    context 'when a valid id_token is provided' do
      it 'devuelve un estado HTTP 200 OK' do
        post :verify_token, params: { id_token: valid_id_token }
        expect(response).to have_http_status(:ok)
      end

      it 'incluye la clave `token` en la respuesta' do
        post :verify_token, params: { id_token: valid_id_token }
        expect(json_response).to have_key('token')
      end

      it 'el valor del token es un hash' do
        post :verify_token, params: { id_token: valid_id_token }
        expect(json_response['token']).to be_a(Hash)
      end
    end
  end
end

# Helper para analizar la respuesta JSON
def json_response
  response.parsed_body
end
