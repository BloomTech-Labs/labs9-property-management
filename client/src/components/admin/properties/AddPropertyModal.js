import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import states from './states';

const styles = theme => ({
  paper: {
    margin: 'auto',
    marginTop: 50,
    height: '80vh',
    width: '90%',
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    overflowY: 'scroll',
  },
  textField: {
    width: '100%',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  div: {
    display: 'flex',
    justifyContent: 'center',
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
    office_ph: 0,
    maintenance_ph: 0,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  addProperty = event => {
    event.preventDefault();

    const {
      name,
      address,
      city,
      state,
      zip_code,
      bedrooms,
      bathrooms,
      max_occupants,
      square_footage,
      year_built,
      office_ph,
      maintenance_ph,
    } = this.state;

    const request = {
      property_name: name,
      address: address,
      city: city,
      state: state,
      zip_code: zip_code,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      max_occupants: max_occupants,
      square_footage: square_footage,
      year_built: year_built,
      office_ph: office_ph,
      maintenance_ph: maintenance_ph,
    };

    axios
      .post('/api/properties', request)
      .then(response => {
        this.props.addPropertyHandler({
          house_id: response.data[0],
          tenants: [],
          ...request,
        });
      })
      .catch(err => {
        this.props.snackbarErrorHandler(
          'There was an error adding the property!'
        );
      });
  };

  render() {
    const { classes, open, onClose } = this.props;

    return (
      <Modal open={open} onClose={onClose}>
        <Paper className={classes.paper}>
          <Grid container justify="flex-end">
            <Grid item xs={1}>
              <Tooltip title="Close">
                <IconButton onClick={onClose}>
                  <Close />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center" component="h6">
                Add a New Property
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={24}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                margin="normal"
                helperText="Give a nickname to your property"
                onChange={this.handleChange('name')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address"
                label="Street Address"
                className={classes.textField}
                value={this.state.address}
                margin="normal"
                onChange={this.handleChange('address')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                label="City"
                className={classes.textField}
                value={this.state.city}
                margin="normal"
                onChange={this.handleChange('city')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zipCode"
                label="Zip Code"
                className={classes.textField}
                value={this.state.zip_code}
                margin="normal"
                onChange={this.handleChange('zip_code')}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="bedrooms"
                label="Bedrooms"
                value={this.state.bedrooms}
                onChange={this.handleChange('bedrooms')}
                type="number"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="bathrooms"
                label="Bathrooms"
                value={this.state.bathrooms}
                onChange={this.handleChange('bathrooms')}
                type="number"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="maxOccupants"
                label="Max. Occupants"
                value={this.state.max_occupants}
                onChange={this.handleChange('max_occupants')}
                type="number"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="squareFootage"
                label="Square Footage"
                value={this.state.square_footage}
                onChange={this.handleChange('square_footage')}
                type="number"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="yearBuilt"
                label="Year Built"
                value={this.state.year_built}
                onChange={this.handleChange('year_built')}
                type="number"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="officePhone"
                label="Office Phone"
                value={this.state.office_ph}
                onChange={this.handleChange('office_ph')}
                type="number"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="maintenancePhone"
                label="Maintenance Phone"
                value={this.state.maintenance_ph}
                onChange={this.handleChange('maintenance_ph')}
                type="number"
                className={classes.textField}
              />
            </Grid>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '25px',
                marginBottom: '25px',
              }}
            >
              <Grid item xs={12}>
                <Button
                  color="primary"
                  onClick={this.addProperty}
                  variant="text"
                >
                  Add Property
                </Button>
              </Grid>
            </div>
          </Grid>
        </Paper>
      </Modal>
    );
  }
}

export default withStyles(styles)(AddPropertyModal);
