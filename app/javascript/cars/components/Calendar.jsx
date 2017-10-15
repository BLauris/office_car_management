import React from 'react'
import axios from 'axios'

class Calendar extends React.Component {
  constructor () {
    super()
    this.state = { 

    }
  }

  componentDidMount(){
    // App.car_reservations = App.cable.subscriptions.create("CarReservationsChannel", {
    //   connected: function() {},
    //   disconnected: function() {},
    //   received: function(data) {}
    // });
    // App.chatChannel = App.cable.subscriptions.create({
    //   channel: "CarReservationsChannel"
    // }, {
    //   connected: () => {
    //     // TODO: Something on new connection
    //   },
    //   disconnected: () => {
    //     // TODO: Something on disconnection
    //   },
    //   received: ({type, data}) => {
    //     switch (type) {
    //       case 'new_message':
    //         this.newMessage(data);
    //         break;
    //       case 'errors':
    //         this.addErrors(data);
    //         break;
    //       default:
    //         console.error({type, data});
    //     }
    //   }
    // });
  }
  
  render () {
    const { showForm } = this.state

    if (showForm) {
      return this.form();
    } else {
      return this.carDetails();
    }
  }
}

  export default Calendar