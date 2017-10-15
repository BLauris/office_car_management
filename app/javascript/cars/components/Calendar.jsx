import React from 'react'
import axios from 'axios'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

class Calendar extends React.Component {
  constructor () {
    super()
    this.state = { 
      reservations: []
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
  
  newReservation(reservation){
    const { reservations } = this.state;
    const reserv = [...reservations];
    
    reserv.push(reservation);
    this.setState({reservations: reserv});
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
            console.error("error");
            // this.addErrors(data);
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

  render () {
    return(
      // <div>
      //   <BigCalendar
      //     startAccessor='startDate'
      //     endAccessor='endDate'
      //   />
      // </div>
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
    )
  }
}

  export default Calendar