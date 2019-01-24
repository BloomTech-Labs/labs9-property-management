import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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
    property: '', // Selected property
  };

  componentDidMount() {
    if (this.props.authTokenRecieved) {
      axios.get('/api/properties/admin').then(response => {
        this.setState({ properties: response.data.properties });
      });
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
    }
  }

  handleChange = prop => date => {
    this.setState({ [prop]: date });
  };

  inviteTenant = event => {
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="space-around" spacing={16}>
            <Grid item xs={12} md={5}>
              <Card className={classes.card}>
                <CardHeader
                  title="Pending Invites"
                  subheader="Invites you have sent"
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
            <Grid item xs={12} md={5}>
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
            <Grid item xs={12} md={11}>
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
                    <TextField id="TenantEmail" label="Tenant Email" required />
                    <FormControl required className={classes.formControl}>
                      <InputLabel htmlFor="property-native-required">
                        Property
                      </InputLabel>
                      <Select
                        native
                        value={this.state.property}
                        onChange={this.handleChange('property')}
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
                        onChange={this.handleChange('leaseStart')}
                        format={'MM/dd/yyyy'}
                      />
                      <DatePicker
                        margin="normal"
                        label="Lease End Date"
                        value={this.state.leaseEnd}
                        onChange={this.handleChange('leaseEnd')}
                        format={'MM/dd/yyyy'}
                      />
                    </MuiPickersUtilsProvider>
                    <Button variant="outlined">Send Invite</Button>
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
