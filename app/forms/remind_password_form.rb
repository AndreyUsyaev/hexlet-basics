# frozen_string_literal: true

class RemindPasswordForm
  include ActiveFormModel::Virtual

  fields :email

  validates :email, presence: true
  validate :user_exists

  def user_exists
    errors.add(:email, :user_does_not_exist) if email.present? && !user
  end

  def user
    @user ||= User.find_by(email: email)
  end

  def email=(value)
    @email = value.downcase
  end
end
