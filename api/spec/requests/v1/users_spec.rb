# frozen_string_literal: true

require 'rails_helper' # Incluye el entorno de Rails para tus pruebas

# Describe el grupo de pruebas para el controlador V1::Users
# El 'type: :request' indica que es una prueba de solicitud
# (simula una petición HTTP)
RSpec.describe 'V1::Users', type: :request do
  # --- Prueba para el endpoint GET /v1/users ---
  let(:user) { create(:user) }

  describe 'GET /api/v1/users/index' do
    context 'when authenticated' do
      let!(:auth_headers) do
        user.confirm # Confirm the user
        post '/api/v1/auth/sign_in',
             params: { email: user.email, password: user.password }

        # Check if sign-in was successful before trying to get headers
        unless response.status == 200
          raise 'Sign-in failed in test setup. ' \
                "Status: #{response.status}, Body: #{response.body}"
        end

        response.headers.slice('access-token', 'client', 'uid')
      end

      before do
        user.confirm
        post '/api/v1/auth/sign_in', params: {
          email: user.email, password: user.password
        }
        @auth_headers = response.headers.slice('access-token', 'client', 'uid')
        get '/api/v1/users/index', headers: auth_headers
        response.parsed_body
      end

      # Asegura que la respuesta HTTP sea 200 OK
      it 'returns a list of users with status 200 OK' do
        expect(response).to have_http_status(:ok)
      end

      # Asegura que la respuesta JSON contenga los datos de usuario esperados
      it 'devuelve que la respuesta es un array' do
        expect(json_response).to be_an(Array)
      end

      it 'devuelve 15 elementos en el array de usuarios' do
        # json_response = response.parsed_body
        expect(json_response.size).to eq(15)
      end

      it 'tiene el first ID correcto' do
        expect(json_response.first['id']).to eq(1)
      end

      it 'tiene el first nombre correcto' do
        expect(json_response.first['firstName']).to eq('Eula')
      end

      it 'tiene el first email correcto' do
        expect(json_response.first['email']).to eq('hubbard@gmail.com')
      end

      it 'tiene el first verified correcto' do
        expect(json_response.first['verified']).to be(true)
      end

      it 'tiene el last ID correcto' do
        expect(json_response.last['id']).to eq(15)
      end

      it 'tiene el last nombre correcto' do
        expect(json_response.last['firstName']).to eq('Eric')
      end

      it 'tiene el last email correcto' do
        expect(json_response.last['email']).to eq('griffin@gmail.com')
      end
    end

    # Contexto para cuando el usuario NO está autenticado
    context 'when not authenticated' do
      # En este contexto, no simulamos la autenticación,
      # dejando que el before_action
      # de tu controlador actúe como lo haría normalmente.
      before { get '/api/v1/users/index' }

      # Asegura que la respuesta HTTP sea 401 Unauthorized
      it 'returns status 401 Unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      # Asegura que la respuesta contenga un mensaje de error de autenticación.
      # El mensaje exacto puede variar según tu gema de autenticación
      # (Devise, Devise Token Auth, etc.).
      it 'returns an authentication error message' do
        # Verifica que el cuerpo de la respuesta incluya el texto esperado.
        # Ajusta este string si tu mensaje de error es diferente.
        expect(response.body).to include(
          'You need to sign in or sign up before continuing.'
        )
      end
    end
  end
end
