import React, { Component } from 'react';
import axios from 'axios';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {
  Home,
  Call,
  Email,
  CreditCard,
  Build,
  Payment,
} from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';

const styles = theme => ({
  container: {
    padding: 20,
    marginTop: 70,
  },
  root: {
    width: '100%',
  },
  card: {
    marginTop: 25,
    position: 'relative',
    overflow: 'visible',
    minWidth: '40%',
    minHeight: 150,
    zIndex: 0,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  displayNone: {
    display: 'none',
  },
  paper: {
    width: '80%',
    height: '80vh',
    margin: 'auto',
    marginTop: 50,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 50,
  },
  noPadding: {
    padding: 0,
  },
  blockElement: {
    display: 'block',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  dense: {
    marginTop: 16,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    padding: 40,
  },
  customPadding: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 0,
    paddingRight: 0,
  },
  biggerText: {
    fontSize: 20,
  },
  marginTop: {
    marginTop: 40,
  },
  cardTitle: {
    fontSize: 14,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  customPaper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  padding: {
    padding: 20,
  },
});

class Dashboard extends Component {
  state = {
    amount: '',
    city: '',
    state: '',
    zip_code: '',
    address: '',
    office_phone: '',
    maintenance_phone: '',
    owner_email: '',
  };

  componentDidMount() {
    if (this.props.authTokenRecieved) {
      const endpoint = 'api/tenants/dashboard/';
      axios
        .get(endpoint)
        .then(response => {
          if (response.data.length > 0) {
            console.log('This is the response: ', response);
            this.setState(() => ({
              address: response.data[0].address,
              city: response.data[0].city,
              state: response.data[0].state,
              zip_code: response.data[0].zip_code,
              office_phone: response.data[0].office_ph,
              maintenance_phone: response.data[0].maintenance_ph,
              owner_email: response.data[0].email,
            }));
          }
        })
        .catch(err => console.log('ERROR CHECKING USER STRIPE ID', err));
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.authTokenRecieved &&
      this.props.authTokenRecieved !== prevProps.authTokenRecieved
    ) {
      const endpoint = 'api/tenants/dashboard/';
      axios
        .get(endpoint)
        .then(response => {
          if (response.data.length > 0) {
            console.log('This is the response: ', response);
            this.setState(() => ({
              address: response.data[0].address,
              city: response.data[0].city,
              state: response.data[0].state,
              zip_code: response.data[0].zip_code,
              office_phone: response.data[0].office_ph,
              maintenance_phone: response.data[0].maintenance_ph,
              owner_email: response.data[0].email,
            }));
          }
        })
        .catch(err => console.log('ERROR CHECKING USER STRIPE ID', err));
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submitWorkorder = event => {
    this.props.history.push('/tenant/maintenance');
  };

  makePayment = event => {
    this.props.history.push('/tenant/payments');
  };

  phoneConverter = int => {
    if (int) {
      let arr = Array.from(int.toString());
      arr.splice(6, 0, '-');
      arr.splice(3, 0, '-');
      return arr.join('');
    } else return '800-888-8888';
  };

  render() {
    const { classes } = this.props;
    let tenantDetails;

    // ======= renders tenant information if the tenant was assign to a property
    if (this.state.address) {
      tenantDetails = (
        <div>
          <CardHeader
            title="Property information"
            subheader="You are assign to this property"
            className={classes.cardHeader}
            titleTypographyProps={{
              component: 'h6',
              variant: 'h6',
              color: 'inherit',
            }}
            subheaderTypographyProps={{
              variant: 'overline',
            }}
          />
          <ListItem>
            <Avatar>
              <Home />
            </Avatar>
            <ListItemText
              primary="Address:"
              secondary={
                this.state.address +
                ', ' +
                this.state.city +
                ', ' +
                this.state.state +
                ', ' +
                this.state.zip_code
              }
            />
          </ListItem>
          <ListItem>
            <Avatar>
              <Call />
            </Avatar>
            <ListItemText
              primary="Office:"
              secondary={this.phoneConverter(this.state.office_phone)}
            />
          </ListItem>
          <ListItem>
            <Avatar>
              <Email />
            </Avatar>
            <ListItemText primary="Email:" secondary={this.state.owner_email} />
          </ListItem>
          <ListItem>
            <Avatar>
              <Call />
            </Avatar>
            <ListItemText
              primary="24/7 Maintenance:"
              secondary={this.phoneConverter(this.state.maintenance_phone)}
            />
          </ListItem>
        </div>
      );
    } else {
      tenantDetails = (
        <div>
          <ListItem>
            <ListItemText
              primary="Account does not yet have a property assigned"
              secondary="Please check the settings page to connect"
            />
          </ListItem>
        </div>
      );
    }

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12} className={classes.title}>
          <Grid container justify="space-around" spacing={16}>
            <Grid item xs={12} md={5}>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                className={classNames(classes.button, classes.biggerText)}
                onClick={this.makePayment}
              >
                Make a Payment
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                className={classNames(
                  classes.button,
                  classes.marginTop,
                  classes.biggerText
                )}
                onClick={this.submitWorkorder}
              >
                Submit a Work Order
              </Button>
              <Card className={classNames(classes.card, classes.marginTop)}>
                <CardContent>
                  <CardHeader
                    title="Alerts"
                    subheader="Check your status"
                    className={classes.cardHeader}
                    titleTypographyProps={{
                      component: 'h6',
                      variant: 'h6',
                      color: 'inherit',
                    }}
                    subheaderTypographyProps={{
                      variant: 'overline',
                    }}
                  />
                  <ListItem>
                    <Avatar>
                      <Build />
                    </Avatar>
                    <ListItemText primary="Work order #123 completed" />
                  </ListItem>
                  <ListItem>
                    <Avatar>
                      <CreditCard />
                    </Avatar>
                    <ListItemText primary="Rent due 7/5/18" />
                  </ListItem>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper
                className={classNames(classNames.customPaper, classes.padding)}
              >
                <CardHeader
                  title="Amount due"
                  subheader="Keep track of your monthly payments"
                  className={classes.cardHeader}
                  titleTypographyProps={{
                    component: 'h6',
                    variant: 'h6',
                    color: 'inherit',
                  }}
                  subheaderTypographyProps={{
                    variant: 'overline',
                  }}
                />
                <ListItem>
                  <Avatar>
                    <Payment />
                  </Avatar>
                  <ListItemText primary="Balance:" secondary="$ 0.00" />
                </ListItem>
              </Paper>
              <Paper
                className={classNames(
                  classNames.customPaper,
                  classes.padding,
                  classes.marginTop
                )}
              >
                {tenantDetails}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const DashboardPage = compose(
  withAuthUser,
  withStyles(styles)
)(Dashboard);

export default DashboardPage;
