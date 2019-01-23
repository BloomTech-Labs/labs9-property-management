import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import states from './states';

const styles = theme => ({
  paper: {
    width: '80%',
    height: '80vh',
    margin: 'auto',
    marginTop: 50,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 100,
  },
});

class AddPropertyModal extends Component {
  state = {
    name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    bedrooms: 0,
    bathrooms: 0,
    max_occupants: 0,
    square_footage: 0,
    year_built: 2019,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, open, onClose } = this.props;

    return (
      <Modal open={open} onClose={onClose}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="h6">
            Add a new property
          </Typography>
          <form>
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              margin="normal"
              helperText="Give a nickname to your property"
              onChange={this.handleChange('name')}
            />
            <TextField
              required
              id="address"
              label="Street Address"
              className={classes.textField}
              value={this.state.address}
              margin="normal"
              onChange={this.handleChange('address')}
            />
            <TextField
              required
              id="city"
              label="City"
              className={classes.textField}
              value={this.state.city}
              margin="normal"
              onChange={this.handleChange('city')}
            />
            <FormControl className={classes.formControl} required>
              <InputLabel htmlFor="state-native-required">State</InputLabel>
              <Select
                native
                value={this.state.state}
                onChange={this.handleChange('state')}
                name="State"
                inputProps={{
                  id: 'state-native-required',
                }}
              >
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <TextField
              id="bedrooms"
              label="Bedrooms"
              value={this.state.bedrooms}
              onChange={this.handleChange('bedrooms')}
              type="number"
              className={classes.textField}
            />
            <TextField
              id="bathrooms"
              label="Bathrooms"
              value={this.state.bathrooms}
              onChange={this.handleChange('bathrooms')}
              type="number"
              className={classes.textField}
            />
            <TextField
              id="maxOccupants"
              label="Max. Occupants"
              value={this.state.bathrooms}
              onChange={this.handleChange('max_occupants')}
              type="number"
              className={classes.textField}
            />
            <TextField
              id="squareFootage"
              label="Square Footage"
              value={this.state.square_footage}
              onChange={this.handleChange('square_footage')}
              type="number"
              className={classes.textField}
            />
            <TextField
              id="yearBuilt"
              label="Year Built"
              value={this.state.year_built}
              onChange={this.handleChange('year_built')}
              type="number"
              className={classes.textField}
            />
          </form>
        </Paper>
      </Modal>
    );
  }
}

export default withStyles(styles)(AddPropertyModal);
