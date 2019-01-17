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
        <ul>
          {this.state.userData.map(property => {
            return (
              <div>
                <li>owner_id: {property.owner_id}</li>
                <li>address: {property.address}</li>
                <li>bedrooms: {property.bedrooms}</li>
                <li>max occupants: {property.max_occupants}</li>
                <li>square footage: {property.square_footage}</li>
                <li>
                  work orders:{' '}
                  {property.work_orders.map(workorder => {
                    return (
                      <div>
                        <li>work order: {workorder.work_order_id}</li>
                        <li>
                          tenant full name: {workorder.tenant_name}{' '}
                          {workorder.tenant_last_name}
                        </li>
                        <li>Tenant mobile: {workorder.mobile}</li>
                        <li>
                          Work order description:
                          {workorder.work_order_description}
                        </li>
                        <li>
                          Work order status: {workorder.work_order_status}
                        </li>
                        <li>Property access: {workorder.property_access}</li>
                      </div>
                    );
                  })}
                </li>
                <br />
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TestingEndpoints;
