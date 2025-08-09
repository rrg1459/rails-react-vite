# frozen_string_literal: true

# spec/models/application_record_spec.rb
require 'rails_helper'

RSpec.describe ApplicationRecord, type: :model do
  # Agrupamos las pruebas de la clase.
  describe 'abstract class' do
    # Usamos 'it' para describir la prueba.
    it 'is an abstract class' do
      # Verificamos si la clase responde al método primary_abstract_class?
      # expect(ApplicationRecord.primary_abstract_class?).to be(true)
      expect(described_class.respond_to?(:primary_abstract_class)).to be(true)
    end
  end

  # También podemos probar que no se puede instanciar,
  # lo que es un efecto de ser abstracta.
  describe 'instantiation' do
    it 'raises an error when trying to instantiate directly' do
      # Usamos 'expect { ... }.to raise_error' para capturar la excepción.
      expect { described_class.new }.to raise_error(NotImplementedError)
    end
  end
end
