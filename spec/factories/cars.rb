FactoryGirl.define do
  factory :car do
    make "Audi"
    fuel Car.fuels.keys.sample
    transmission Car.transmissions.keys.sample
  end
end