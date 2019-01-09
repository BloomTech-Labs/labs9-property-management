import React, { Component } from 'react';
import Sidebar from './SidebarAdmin'
import SidebarAdmin from './SidebarAdmin';


class Layout extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <SidebarAdmin/>
            {this.props.children}
            </>
         );
    }
}
 
export default Layout;