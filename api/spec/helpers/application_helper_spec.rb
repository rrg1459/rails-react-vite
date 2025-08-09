# frozen_string_literal: true

# spec/helpers/application_helper_spec.rb
require 'rails_helper'

RSpec.describe ApplicationHelper, type: :helper do
  # Agrupamos las pruebas por el método que estamos probando
  describe '#formatted_date' do
    context 'when a date is provided' do
      let(:date) { Date.new(2025, 8, 4) }

      it 'returns the date in the correct format' do
        expect(helper.formatted_date(date)).to eq('August 04, 2025')
      end
    end

    context 'when no date is provided' do
      it 'returns nil' do
        expect(helper.formatted_date(nil)).to be_nil
      end
    end
  end
end
