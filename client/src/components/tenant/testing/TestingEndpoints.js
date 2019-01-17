import React, { Component } from 'react';
import axios from 'axios';

class TestingEndpoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
    };
  }

  componentDidMount() {
    const endpoint =
      'https://property-management-dev.herokuapp.com/api/work-orders/3/workOrdersByProp';

    axios
      .get(endpoint)
      .then(response => {
        this.setState(() => ({ userData: response.data }));
        console.log('Heroku data: ', this.state.userData);
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div>
        <h3>Displaying data from OWNER with user_id: 3</h3>
      </div>
    );
  }
}

export default TestingEndpoints;
