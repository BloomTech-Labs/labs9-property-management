import React, { Component } from 'react';
import Sidebar from './sidebarAdmin'


class Layout extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <Sidebar/>
            {this.props.children}
            </>
         );
    }
}
 
export default Layout;