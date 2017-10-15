import React from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import moment from 'moment'

class ReservationForm extends React.Component {
  constructor () {
    super()
    this.state = { 
      takenAt: moment(),
      takenTill: moment()
    }
  }  
  
  reserveCar(){
    const { takenAt, takenTill } = this.state;
    
    event.preventDefault();
    App.reservationChannel.perform("reserve_car", { 
      taken_at: takenAt, 
      taken_till: takenTill, 
      car_id: this.props.carId
    });
    
    this.props.toggleForm.bind(this)
  }
  
  handleChange(date, key) {
    this.setState({ [key]: date })
  }
  
  render () {
    const { takenAt, takenTill } = this.state;
    
    return(
      <form>
        <div className="form-group">
          <label>Take At:</label>
          <DatePicker dateFormat="DD/MM/YYYY" selected={takenAt} onChange={this.handleChange.bind(this, 'takenAt')} showTimeSelect />
        </div>
        <div className="form-group">
          <label>Take Till:</label>
          <DatePicker dateFormat="DD/MM/YYYY" selected={takenTill} onChange={this.handleChange.bind(this, 'takenTill')} showTimeSelect />
        </div>
        <button className="btn btn-default pull-left" onClick={ this.props.toggleForm.bind(this) }>
          Cancel
        </button>
        <button className="btn btn-primary pull-right" onClick={ this.reserveCar.bind(this) }>
          Save
        </button>
      </form>
    )   
  }
}

export default ReservationForm