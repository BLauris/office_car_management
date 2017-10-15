class UserCarsSerializer < ActiveModel::Serializer
  attributes :id, :taken_at, :taken_till, :taken_by
  
  def taken_by
    object.user.first_name + " " + object.user.last_name 
  end
  
  def taken_at
    object.taken_at.strftime("%d/%m/%Y - %H:%M")
  end
  
  def taken_till
    object.taken_till.strftime("%d/%m/%Y - %H:%M")
  end
end
