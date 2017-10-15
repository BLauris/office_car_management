import React from 'react'
import axios from 'axios'

class Form extends React.Component {
  constructor () {
    super()
    this.state = { 
      takenAt: "",
      takenTill: ""
    }
  }  

  render () {
    return(
      <form>
        <div className="form-group">
          <label>Take At:</label>
          <input type="text" className="form-control"/>
        </div>
        <div className="form-group">
          <label>Take Till:</label>
          <input type="text" className="form-control"/>
        </div>
        <button className="btn btn-primary pull-right" onClick={ this.props.toggleForm.bind(this) }>
          Save
        </button>
      </form>
    )   
  }
}

export default Form