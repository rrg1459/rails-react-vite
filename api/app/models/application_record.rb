# frozen_string_literal: true

# ApplicationRecord serves as the base class for all models in the API.
class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
end
