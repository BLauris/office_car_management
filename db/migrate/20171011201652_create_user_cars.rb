class CreateUserCars < ActiveRecord::Migration[5.1]
  def change
    create_table :user_cars do |t|
      t.integer :user_id, null: false
      t.integer :car_id, null: false
      t.datetime :taken_at, null: false 
      t.datetime :taken_till, null: false
      t.timestamps
    end
    
    add_index :user_cars, :user_id
    add_index :user_cars, :car_id
  end
end
