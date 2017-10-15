import React from 'react'
import axios from 'axios'
import ReservationForm from './ReservationForm';

class Car extends React.Component {
  constructor () {
    super()
    this.state = { 
      showForm: false,
      userCars: []
    }
  }
  
  getCareReservations(){
    if(!this.state.showForm) return;
    
    let path = "/api/cars/" + this.props.car.id + "/reservation_details";
    axios.get(path).then(response => {
      console.log(response.data);
      this.setState({ userCars: response.data })
    })
    .catch(error => {
      console.error(error)
    })
  }
  
  toggleForm(){
    const { showForm } = this.state;
    this.setState({showForm: !showForm}, () =>
      this.getCareReservations()
    );    
  }
  
  carDetails(){
    const { car } = this.props;
    
    return ( 
      <div className="list-group">
        <a className="list-group-item">
          <b>Make: </b> { car.make }
        </a>
        <a className="list-group-item">
          <b>Fuel: </b> { car.fuel }
        </a>
        <a className="list-group-item">
          <b>Color: </b> { car.color }
        </a>
        <a className="list-group-item">
          <b>Transmission: </b> { car.transmission }
        </a>
        <div className="list-group-item">
          <button className="btn btn-primary center-block" onClick={ this.toggleForm.bind(this) }>
            Reserve
          </button>
        </div>
      </div>
    )
  }
  
  reservation(){
    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <ReservationForm carId={ this.props.car.id } toggleForm={ this.toggleForm.bind(this) } />
        </div>
        <div className="panel-footer">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Taken At</th>
                <th>taken Till</th>
                <th>Taken By</th>
              </tr>
            </thead>
            <tbody>
              { this.reservationDetails() }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  reservationDetails(){
    const { userCars } = this.state;
    
    return userCars.map((userCar, index) =>
      <tr key={ index }>
        <td>
          { userCar.taken_at }
        </td>
        <td>
          { userCar.taken_till }
        </td>
        <td>
          { userCar.taken_by }
        </td>
      </tr>
    );
  }

  render () {
    const { showForm } = this.state

    if (showForm) {
      return this.reservation();
    } else {
      return this.carDetails();
    }
  }
}

export default Car