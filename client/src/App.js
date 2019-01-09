import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import 'typeface-roboto';
import Admin from './components/Admin/Admin'
import {Route} from 'react-router-dom'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const { classes } = this.props;

    return (
      <div className="App">
        <CssBaseline />
    <Route exact path='/' render={props => <Admin/>}/>

        <div>

     {/*<Route exact path='/orders' render={props => </>}/>*/}
     {/*<Route exact path='/tenants' render={props => </>}/>*/}
     {/*<Route exact path='/billing' render={props => </>}/>*/}
     {/*<Route exact path='/settings' render={props => </>}/>*/}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);