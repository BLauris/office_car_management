import React from 'react'
import axios from 'axios'
import ReserveCar from './Car';

class CarList extends React.Component {
  constructor () {
    super()
    this.state = { 
      carList: []
    }
  }

  getCarList() {
    axios.get('/api/cars').then(response => {
      this.setState({ carList: response.data })
    })
    .catch(error => {
      console.error(error)
    })
  }   

  componentDidMount () { 
    this.getCarList()
  }

  render () {
    return(
      <div className="row">
        <div className="col-sm-6">
          <h1> TODO: Add Calendar</h1>
        </div>
        <div className="col-sm-6">
          { this.cars() }
        </div>
      </div>
    )   
  }
  
  cars(){
    const { carList } = this.state

    return carList.map((car, index) =>
      <div className="row" key={ index }>
        <div className="col-sm-6" >
          <ReserveCar car={ car } />
        </div>
      </div>
    );
  }
}

export default CarList