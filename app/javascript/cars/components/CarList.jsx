import React from 'react'
import axios from 'axios'
import ReserveCar from './Car';
import Calendar from './Calendar';

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
      <div>
        <div className="col-sm-7">
          <Calendar />
        </div>
        <div className="col-sm-5">
          { this.cars() }
        </div>
      </div>
    )   
  }
  
  cars(){
    const { carList } = this.state;

    return carList.map((car, index) =>
      <div className="row" key={ index }>
        <div className="col-sm-12" >
          <ReserveCar car={ car } />
        </div>
      </div>
    );
  }
}

export default CarList