import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'typeface-roboto';

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
        <Button variant="contained" className={classes.button}>
          Default
        </Button>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
