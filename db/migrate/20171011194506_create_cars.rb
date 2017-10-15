class CreateCars < ActiveRecord::Migration[5.1]
  def change
    create_table :cars do |t|
      t.string :make, null: false
      t.string :color
      t.integer :fuel, null: false, default: 0
      t.integer :transmission, null: false, default: 0
      t.date :year
      t.timestamps
    end
  end
end
