import React from 'react'
import axios from 'axios'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

class Calendar extends React.Component {
  constructor () {
    super()
    this.state = { 
      reservations: [],
      errors: []
    }
  }
  
  componentDidMount(){
    this.allReservations()
    this.initChannel()
  }
  
  allReservations(){
    axios.get('/api/cars/all_reservations').then(response => {
      this.setState({ reservations: response.data })
    })
    .catch(error => {
      console.error(error)
    })
  }
  
  addErrors(errors) {
    this.setState({errors: errors})
  }
  
  newReservation(reservations){
    this.setState({reservations: reservations, errors: []});
  }
  
  initChannel(){
    App.reservationChannel = App.cable.subscriptions.create({
      channel: "CarReservationsChannel"
    }, {
      connected: () => {
        // TODO: Something on new connection
      },
      disconnected: () => {
        // TODO: Something on disconnection
      },
      received: ({type, data}) => {
        switch (type) {
          case 'new_reservation':
            this.newReservation(data);
            break;
          case 'errors':
            this.addErrors(data);
            break;
          default:
            console.error({type, data});
        }
      }
    });
  }
  
  list(){
    const { reservations } = this.state;
    
    return reservations.map((reservation, index) =>
      <tr key={ index }>
        <td>
          { reservation.taken_at }
        </td>
        <td>
          { reservation.taken_till }
        </td>
        <td>
          { reservation.taken_by }
        </td>
      </tr>
    );
  }
  
  errorList(){
    const { errors } = this.state;
    
    return errors.map((error, index) =>
      <li key={ index }>
        { error }
      </li>
    );
  }

  render () {
    return(
      <div>
        <ul>
          { this.errorList() }
        </ul>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Taken At</th>
              <th>taken Till</th>
              <th>Taken By</th>
            </tr>
          </thead>
          <tbody>
            { this.list() }
          </tbody>
        </table>
      </div>
    )
  }
}

  export default Calendar