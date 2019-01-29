import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import InvitesTable from './InvitesTable';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import styles from './styles';
import axios from 'axios';

class Tenants extends Component {
  state = {
    email: '',
    leaseStart: new Date(),
    leaseEnd: new Date(),
    properties: [],
    house_id: 0, // Selected property
    pending_invites: [],
  };

  componentDidMount() {
    if (this.props.authTokenRecieved) {
      axios.get('/api/properties/admin').then(response => {
        this.setState({ properties: response.data.properties });
      });

      axios
        .get('/api/invitations/admin')
        .then(response => {
          console.log(response.data);
          this.setState({ pending_invites: response.data });
        })
        .catch(error => console.log(error));
    }
  }

  componentDidUpdate(prevProps) {
    console.log('update');
    if (
      this.props.authTokenRecieved &&
      this.props.authTokenRecieved !== prevProps.authTokenRecieved
    ) {
      axios.get('/api/properties/admin').then(response => {
        console.log(response.data.properties);
        this.setState({ properties: response.data.properties });
      });

      axios
        .get('/api/invitations/admin')
        .then(response => {
          console.log(response.data);
          this.setState({ pending_invites: response.data });
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

  sendInvite = event => {
    event.preventDefault();

    const property = {
      email: this.state.email,
      lease_start_date: this.state.leaseStart.toDateString(),
      lease_end_date: this.state.leaseEnd.toDateString(),
      house_id: this.state.house_id,
    };

    console.log('property: ', property);
    axios
      .post('/api/invitations/admin', property)
      .then(response => {
        console.log(response);
        axios.get('/api/invitations/admin').then(response => {
          console.log(response.data);
          this.setState({ pending_invites: response.data });
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const { pending_invites } = this.state;

    console.log(this.state.leaseStart, ' ', this.state.leaseEnd);
    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="space-around" spacing={16}>
            <Grid item xs={12} md={6}>
              <InvitesTable pending={pending_invites} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.card}>
                <CardHeader
                  title="Tenants"
                  subheader="Your Current Tenants"
                  className={classes.cardTop}
                  titleTypographyProps={{
                    component: 'h4',
                    variant: 'body1',
                    color: 'inherit',
                  }}
                  subheaderTypographyProps={{
                    variant: 'overline',
                    color: 'secondary',
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card className={classes.longCard}>
                <CardHeader
                  title="Add a Tenant"
                  subheader="Invite a tenant to connect with you"
                  className={classes.cardTop}
                  titleTypographyProps={{
                    component: 'h4',
                    variant: 'body1',
                    color: 'inherit',
                  }}
                  subheaderTypographyProps={{
                    variant: 'overline',
                    color: 'secondary',
                  }}
                />
                <CardContent>
                  <form style={{ marginTop: 50 }}>
                    <TextField
                      id="email"
                      label="Tenant Email"
                      value={this.state.email}
                      onChange={this.handleInputChange('email')}
                      required
                    />
                    <FormControl required className={classes.formControl}>
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
                        <option value="" />
                        {this.state.properties.map((property, index) => (
                          <option key={index} value={property.house_id}>
                            {property.property_name}
                          </option>
                        ))}
                      </Select>
                      <FormHelperText>Required</FormHelperText>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        margin="normal"
                        label="Lease Start Date"
                        value={this.state.leaseStart}
                        onChange={this.handleDateChange('leaseStart')}
                        format={'MM/dd/yyyy'}
                      />
                      <DatePicker
                        margin="normal"
                        label="Lease End Date"
                        value={this.state.leaseEnd}
                        onChange={this.handleDateChange('leaseEnd')}
                        format={'MM/dd/yyyy'}
                      />
                    </MuiPickersUtilsProvider>
                    <Button onClick={this.sendInvite} variant="outlined">
                      Send Invite
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Grid>
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
