import React from 'react'
import axios from 'axios'
import Form from './Form';

class Car extends React.Component {
  constructor () {
    super()
    this.state = { 
      showForm: false,
      userCars: []
    }
  }
  
  // reserveCar(){
  //   axios.post('/user', {
  //     firstName: 'Fred',
  //     lastName: 'Flintstone'
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }
  
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
    const { car } = this.props
    
    return ( 
      <div className="list-group">
        <a href="#" className="list-group-item">
          <b>Make: </b> { car.make }
        </a>
        <a href="#" className="list-group-item">
          <b>Fuel: </b> { car.fuel }
        </a>
        <a href="#" className="list-group-item">
          <b>Color: </b> { car.color }
        </a>
        <a href="#" className="list-group-item">
          <b>Transmission: </b> { car.transmission }
        </a>
        <button className="btn btn-primary" onClick={ this.toggleForm.bind(this) }>
          Reserve
        </button>
      </div>
    )
  }
  
  form(){
    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label>Take At:</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="form-group">
              <label>Take Till:</label>
              <input type="text" className="form-control"/>
            </div>
            <button className="btn btn-default pull-left" onClick={ this.toggleForm.bind(this) }>
              Cancel
            </button>
            <button className="btn btn-primary pull-right" onClick={ this.toggleForm.bind(this) }>
              Save
            </button>
          </form>
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
      return this.form();
      // return(
      //   <Form carId={ this.props.car.id } />
      // )
    } else {
      return this.carDetails();
    }
  }
}

export default Car