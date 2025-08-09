# frozen_string_literal: true

# class AddUniqueIndexToUsersEmailAndProvider for API
class AddUniqueIndexToUsersEmailAndProvider < ActiveRecord::Migration[7.2]
  def change
    add_index :users, %i[email provider], unique: true
  end
end
