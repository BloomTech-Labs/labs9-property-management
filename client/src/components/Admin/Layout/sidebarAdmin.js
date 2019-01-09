import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    render() { 
        return ( 
            <div>
                <div> 
                <Link to='/properties' style={{'textDecoration': 'none','color':'black'}}><div>Properties</div></Link>       
                <Link to='/work-orders' style={{'textDecoration': 'none','color':'black'}}><div>Work Orders</div></Link>
                <Link to='/tenants' style={{'textDecoration': 'none','color':'black'}}><div>Add Tenant</div></Link>
                <Link to='/billing' style={{'textDecoration': 'none','color':'black'}}><div>Billing</div></Link>
                <Link to='/settings' style={{'textDecoration': 'none','color':'black'}}><div>Settings</div></Link>              
                </div>
            </div>
         );
    }
}
 
export default Sidebar;