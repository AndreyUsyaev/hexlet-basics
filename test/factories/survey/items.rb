# == Schema Information
#
# Table name: survey_items
#
#  id         :integer          not null, primary key
#  order      :integer          not null
#  state      :string
#  value      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  survey_id  :integer          not null
#
# Indexes
#
#  index_survey_items_on_survey_id  (survey_id)
#
# Foreign Keys
#
#  survey_id  (survey_id => surveys.id)
#
FactoryBot.define do
  factory "survey/item" do
    value { Faker::Lorem.sentence }
    order { 100 }
  end
end
