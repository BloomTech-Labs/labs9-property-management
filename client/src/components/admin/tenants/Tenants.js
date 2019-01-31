import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import InvitesTable from './InvitesTable';
import TenantsTable from './TenantsTable';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import CustomSnackbar from '../../snackbar/CustomSnackbar';
import styles from './styles';
import axios from 'axios';

class Tenants extends Component {
  state = {
    email: '',
    leaseStart: new Date(),
    leaseEnd: new Date(),
    properties: [],
    tenants: [],
    house_id: 0, // Selected property
    pending_invites: [],
    openSnackbar: false,
    snackbarMessage: '',
    snackbarVariant: '',
  };

  componentDidMount() {
    if (this.props.authTokenRecieved) {
      axios
        .get('/api/properties/admin')
        .then(response => {
          this.setState({ properties: response.data.properties });
        })
        .catch(error => console.log(error));

      axios
        .get('/api/invitations/admin')
        .then(response => {
          this.setState({ pending_invites: response.data });
        })
        .catch(error => console.log(error));

      axios
        .get('/api/users/tenants')
        .then(response => {
          this.setState({ tenants: response.data });
        })
        .catch(error => console.log(error));
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.authTokenRecieved &&
      this.props.authTokenRecieved !== prevProps.authTokenRecieved
    ) {
      axios
        .get('/api/properties/admin')
        .then(response => {
          this.setState({ properties: response.data.properties });
        })
        .catch(error => console.log(error));

      axios
        .get('/api/invitations/admin')
        .then(response => {
          this.setState({ pending_invites: response.data });
        })
        .catch(error => console.log(error));

      axios
        .get('/api/users/tenants')
        .then(response => {
          this.setState({ tenants: response.data });
        })
        .catch(error => console.log(error));
    }
  }

  handleInputChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleDateChange = prop => date => {
    this.setState({ [prop]: date });
  };

  snackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };

  sendInvite = event => {
    event.preventDefault();

    if (this.state.house_id === 0 || this.state.email === '') {
      this.setState({
        openSnackbar: true,
        snackbarMessage: 'Please fill out the form before submitting!',
        snackbarVariant: 'error',
      });

      return;
    }

    const property = {
      email: this.state.email,
      lease_start_date: this.state.leaseStart.toDateString(),
      lease_end_date: this.state.leaseEnd.toDateString(),
      house_id: this.state.house_id,
    };

    axios
      .post('/api/invitations/admin', property)
      .then(response => {
        axios.get('/api/invitations/admin').then(response => {
          this.setState({
            pending_invites: response.data,
            openSnackbar: true,
            snackbarMessage: 'Invitation Sent!',
            snackbarVariant: 'success',
          });
        });
      })
      .catch(err => {
        this.setState({
          openSnackbar: true,
          snackbarMessage: 'Error: That account might not exist!',
          snackbarVariant: 'error',
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { pending_invites, tenants } = this.state;

    return (
      <Grid
        container
        className={classes.container}
        justify="center"
        spacing={0}
      >
        <Grid item xs={12}>
          <Grid container justify="space-around" spacing={16}>
            <Grid item xs={12} md={12}>
              <TenantsTable data={tenants} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InvitesTable pending={pending_invites} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.longCard}>
                <Typography component="h6" variant="h6">
                  Send An Invite
                </Typography>
                <Typography component="p" variant="caption">
                  Connect With A Tenant
                </Typography>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="email"
                      label="Tenant Email"
                      value={this.state.email}
                      onChange={this.handleInputChange('email')}
                      className={classes.textField}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl required className={classes.textField}>
                      <InputLabel htmlFor="property-native-required">
                        Property
                      </InputLabel>
                      <Select
                        native
                        value={this.state.house_id}
                        onChange={this.handleInputChange('house_id')}
                        name="Property"
                        inputProps={{
                          id: 'property-native-required',
                        }}
                      >
                        <option value={0} />
                        {this.state.properties.map((property, index) => (
                          <option key={index} value={property.house_id}>
                            {property.property_name}
                          </option>
                        ))}
                      </Select>
                      <FormHelperText>Required</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        margin="normal"
                        label="Lease Start Date"
                        value={this.state.leaseStart}
                        onChange={this.handleDateChange('leaseStart')}
                        format={'MM/dd/yyyy'}
                        className={classes.textField}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        margin="normal"
                        label="Lease End Date"
                        value={this.state.leaseEnd}
                        onChange={this.handleDateChange('leaseEnd')}
                        format={'MM/dd/yyyy'}
                        className={classes.textField}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '25px',
                      marginBottom: '25px',
                      width: '100%',
                    }}
                  >
                    <Button
                      color="primary"
                      onClick={this.sendInvite}
                      variant="contained"
                    >
                      Send Invite
                    </Button>
                  </div>
                </Grid>
              </Card>
            </Grid>
            <CustomSnackbar
              open={this.state.openSnackbar}
              variant={this.state.snackbarVariant}
              message={this.state.snackbarMessage}
              onClose={this.snackbarClose}
              onClick={this.snackbarClose}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const TenantsPage = compose(
  withAuthUser,
  withStyles(styles)
)(Tenants);

export default TenantsPage;
