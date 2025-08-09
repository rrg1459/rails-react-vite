# frozen_string_literal: true

# Custom Devise Mailer for the API.
class CustomDeviseMailer < Devise::Mailer
  helper :application
  # default template_path: 'mailer'

  # Sobrescribe métodos de instancia, NO métodos de clase
  def confirmation_instructions(record, token, opts = {})
    opts[:subject] = 'Confirma tu cuenta personalizada AAA'
    super
  end

  def unlock_instructions(record, token, opts = {})
    opts[:subject] = '¡Desbloquea tu cuenta personalizada XXX!'
    @time = Time.zone.now + Devise.unlock_in
    @unlock_in = Devise.unlock_in / 60
    super
  end

  def reset_password_instructions(record, token, opts = {})
    opts[:subject] = ' RRR Reset password instructions'
    @time = Time.zone.now + Devise.unlock_in
    @unlock_in = Devise.unlock_in / 60
    super
  end

  # Puedes sobrescribir otros métodos: confirmation_instructions,
  # reset_password_instructions, etc.
end
