import React from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';

class ReservationForm extends React.Component {
  constructor () {
    super()
    this.state = { 
      takenAt: moment(),
      takenTill: moment()
    }
  }  
  
  reserveCar(){
    this.props.toggleForm()
    
    const { takenAt, takenTill } = this.state;
    
    event.preventDefault();
    App.reservationChannel.perform("reserve_car", { 
      taken_at: takenAt, 
      taken_till: takenTill, 
      car_id: this.props.carId
    });    
  }
  
  handleChange(date, key) {
    this.setState({ [key]: date })
  }
  
  render () {
    const { takenAt, takenTill } = this.state;
    
    return(
      <div className="col-sm-12">
        <div className="col-sm-6">
          <label>Take At:</label>
          <DatePicker
            dateFormat="DD/MM/YYYY"
            selected={takenAt}
            onChange={(e) => this.handleChange(e, 'takenAt')}
            showTimeSelect
            timeIntervals={15}
            dateFormat="LLL"
          />
        </div>  
        <div className="col-sm-6">
          <label>Take Till:</label>
          <DatePicker
            dateFormat="DD/MM/YYYY"
            selected={takenTill}
            onChange={(e) => this.handleChange(e, 'takenTill')}
            showTimeSelect
            timeIntervals={15}
            dateFormat="LLL"
          />
        </div>
        <br/>
        <br/>
        <br/>
        <div className="col-sm-12">
          <button className="btn btn-default pull-left" onClick={ this.props.toggleForm.bind(this) }>
            Cancel
          </button>
          <button className="btn btn-primary pull-right" onClick={ this.reserveCar.bind(this) }>
            Save
          </button>
        </div>
      </div>
    )   
  }
}

export default ReservationForm