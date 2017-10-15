require 'rails_helper'

RSpec.describe UserCar, type: :model do
    
  let(:car) { FactoryGirl.create(:car) }
  let(:user) { FactoryGirl.create(:user) }
  let(:now) { DateTime.now }
    
  it "validate 'taken_till' after 'taken_at'" do
    user_car = UserCar.create(
      taken_at: now, 
      taken_till: now - 2.days
    )
    
    expect(user_car.valid?).to eq(false)
    expect(user_car.errors.messages[:taken_till]).to include("must be after taken at")
  end

  it "reserve car jsut for one day" do
    user_car = UserCar.new(
      taken_at: now, 
      taken_till: now + 3.hours,
      user_id: user.id,
      car_id: car.id
    )
    
    expect(user_car.save).to eq(true)
  end
  
  it "can't reserve in past" do
    user_car = UserCar.create(
      taken_at: now - 1.day, 
      taken_till: now,
      user_id: user.id,
      car_id: car.id
    )
    
    expect(user_car.errors.messages[:taken_till]).to include("you can't car reserve in past")
  end
  
end