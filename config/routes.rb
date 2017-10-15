Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "cars#index"
  
  mount ActionCable.server => '/cable'
  
  resources :cars
  resources :users, only: [ :index ] do
    collection do
      get :reservations
    end
  end
  
  namespace :api, defaults: { format: :json } do
    resources :cars, only: [ :index ] do
      get :reservation_details
      collection do
        get :all_reservations
      end
    end
  end
end
