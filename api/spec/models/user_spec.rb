# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  allow_password_change  :boolean          default(FALSE)
#  confirmation_sent_at   :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string
#  email                  :string
#  encrypted_password     :string           default(""), not null
#  failed_attempts        :integer          default(0), not null
#  image                  :string
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string
#  locked_at              :datetime
#  name                   :string
#  nickname               :string
#  provider               :string           default("email"), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0), not null
#  tokens                 :json
#  uid                    :string           default(""), not null
#  unconfirmed_email      :string
#  unlock_token           :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_email_and_provider    (email,provider) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_uid_and_provider      (uid,provider) UNIQUE
#  index_users_on_unlock_token          (unlock_token) UNIQUE
#
require 'rails_helper' # Incluye el entorno de Rails para tus pruebas

# Describe el grupo de pruebas para el modelo User
RSpec.describe User, type: :model do
  # --- Pruebas de Validaciones ---
  describe 'validations' do
    # Usamos FactoryBot para crear una instancia de usuario válida.
    # Asegúrate de tener un factory para :user
    # configurado en spec/factories/users.rb
    # Si no lo tienes, puedes crearlo:
    # FactoryBot.define do
    #   factory :user do
    #     email { Faker::Internet.email }
    #     password { 'password123' }
    #     password_confirmation { 'password123' }
    #     # Si tienes otros campos requeridos, añádelos aquí
    #   end
    # end
    # Y asegúrate de instalar la gema 'faker' en
    # tu Gemfile (group :development, :test)
    # let(:user) { build(:user) } # 'build' crea una instancia
    # pero no la guarda en la DB
    let(:user) { FactoryBot.create(:user) }

    # Prueba la presencia del email
    it { is_expected.to validate_presence_of(:email) }

    # Prueba la singularidad del email (case-insensitive)
    # Se necesita un usuario ya existente para probar la singularidad
    # it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
    it {
      expect(user).to validate_uniqueness_of(:email).scoped_to(:provider)
                                                    .case_insensitive
    }

    # Prueba la presencia de la contraseña al crear un nuevo registro
    # (Devise maneja esto automáticamente)
    it { is_expected.to validate_presence_of(:password).on(:create) }

    # Prueba la longitud mínima de la contraseña (por defecto 6 en Devise)
    it {
      expect(user).to validate_length_of(:password).is_at_least(6).on(:create)
    }

    # Prueba la confirmación de la contraseña
    # Requiere que el campo password_confirmation esté
    # presente para que falle si no coincide
    it { is_expected.to validate_confirmation_of(:password) }
  end

  # -----------------------------------------------------------
  # Pruebas de Devise modules
  # -----------------------------------------------------------
  # Código corregido
  describe 'Devise modules' do
    # --- Pruebas del módulo `confirmable` ---
    # Cada `it` ahora tiene una única expectativa.
    it 'responds to :confirm' do
      expect(described_class.new).to respond_to(:confirm)
    end

    it 'responds to :confirmed?' do
      expect(described_class.new).to respond_to(:confirmed?)
    end

    # --- Pruebas del módulo `lockable` ---
    it 'responds to :lock_access!' do
      expect(described_class.new).to respond_to(:lock_access!)
    end

    it 'responds to :unlock_access!' do
      expect(described_class.new).to respond_to(:unlock_access!)
    end

    # --- Pruebas del módulo `trackable` ---
    it 'responds to :current_sign_in_at' do
      expect(described_class.new).to respond_to(:current_sign_in_at)
    end

    it 'responds to :last_sign_in_at' do
      expect(described_class.new).to respond_to(:last_sign_in_at)
    end

    it 'responds to :sign_in_count' do
      expect(described_class.new).to respond_to(:sign_in_count)
    end
  end
end
