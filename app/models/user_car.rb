class UserCar < ApplicationRecord
  
  belongs_to :user
  belongs_to :car
  
  validates :taken_at, :taken_till, :user_id, :car_id, presence: true
  validate :taken_till_after_taken_at?, if: Proc.new { |uc|  uc.taken_till.present? && uc.taken_at.present? }
  
  private
  
    def taken_till_after_taken_at?
      if taken_till != taken_at && taken_till < taken_at
        errors.add :taken_till, "must be after taken at"
      end
    end

end



