MAKES = ['Audi', "BMW", 'Honda', 'Mazda', 'Ford', 'Citroen', 'Peogeot', 'Lexus']

puts "Re-creating Cars"
Car.destroy_all
10.times do
  Car.create(
    make: MAKES.sample,
    color: Faker::Color.color_name,
    fuel: Car.fuels.keys.sample,
    transmission: Car.transmissions.keys.sample,
    year: Faker::Date.between(10.years.ago, Date.today)
  )
end
puts " DONE "

puts "Re-creating Users"
User.destroy_all
19.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    password: "defaultpw",
    password_confirmation: "defaultpw"
  )
end

User.create(
  first_name: "Lauris",
  last_name: "Bligzna",
  email: "bligzna.lauris@gmail.com",
  password: "defaultpw",
  password_confirmation: "defaultpw"
)
puts " DONE "

puts "Re-Assigning Reservations"
  Car.all.each do |car|
    taken_at = Date.today + rand(1..7).days
    taken_till = taken_at + rand(1..3).days
    
    UserCar.create(
      user_id: User.pluck(:id).sample,
      car_id: car.id,
      taken_at: taken_at,
      taken_till: taken_till
    )
  end
puts " DONE "