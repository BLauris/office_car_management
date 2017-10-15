MAKES = ['Audi', "BMW", 'Honda', 'Mazda', 'Ford', 'Citroen', 'Peogeot', 'Lexus']

puts "Creating Cars"
Car.destroy_all
3.times do
  Car.create(
    make: MAKES.sample,
    color: Faker::Color.color_name,
    fuel: Car.fuels.keys.sample,
    transmission: Car.transmissions.keys.sample,
    year: Faker::Date.between(10.years.ago, Date.today)
  )
end
puts " DONE "

puts "Creating Users"
User.destroy_all
10.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    password: "defaultpw",
    password_confirmation: "defaultpw"
  )
end

User.create(
  first_name: "Jon",
  last_name: "Doe",
  email: "user@example.com",
  password: "defaultpw",
  password_confirmation: "defaultpw"
)
puts " DONE "