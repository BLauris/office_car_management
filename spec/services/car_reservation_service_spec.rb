require 'rails_helper'

RSpec.describe CarReservationService do
  
  let(:audi) { FactoryGirl.create(:car) }
  let(:lexus) { FactoryGirl.create(:car, make: "Lexus") }
  
  let(:user_one) { FactoryGirl.create(:user) }
  let(:user_two) { FactoryGirl.create(:user, first_name: "lauris", last_name: "Blīgzna") }
  
  let(:today) { Date.today }
  
  let(:booked_car) { 
    UserCar.create!(
      user_id: user_one.id, 
      car_id: audi.id, 
      taken_at: today, 
      taken_till: today + 5.days
    ) 
  }
  
  describe "Sad path" do
    it "trying to to reserve an reserved car" do
      service = CarReservationService.new(
        user_id: user_two.id, 
        car_id: audi.id, 
        taken_at: booked_car.taken_at + 2.days, 
        taken_till: booked_car.taken_till + 2.days
      )
      
      expect(service.errors).to include("This car already is booked for these dates")
    end
    
    it "trying to reserve two cars for the same dates" do
      service = CarReservationService.new(
        user_id: user_one.id, 
        car_id: lexus.id, 
        taken_at: booked_car.taken_at + 2.days, 
        taken_till: booked_car.taken_till + 2.days
      )
      
      expect(service.errors).to include("You have already booked a car for these dates")
    end
  end
  
  describe "Happy path" do
    it "successfully reservs car" do
      service = CarReservationService.new(
        user_id: user_two.id, 
        car_id: lexus.id, 
        taken_at: today, 
        taken_till: today + 2.days
      )
      
      expect(user_two.user_cars.exists?).to eq(false)
      service.reserve!
      expect(user_two.user_cars.exists?).to eq(true)
    end
    
    it "User reserved two cars for different dates" do
      service = CarReservationService.new(
        user_id: user_one.id, 
        car_id: lexus.id, 
        taken_at: booked_car.taken_till + 1.day, 
        taken_till: booked_car.taken_till + 2.days
      )
      
      expect(user_one.user_cars.count).to eq(1)
      service.reserve!
      expect(user_one.user_cars.count).to eq(2)
    end
  end
end