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
import { Home, Call, Email } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Skeleton from 'react-loading-skeleton';

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
    minHeight: 350,
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
  card: {
    height: 150,
  },
  customPaper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
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

  render() {
    const { classes } = this.props;
    let tenantDetails;

    // ======= renders tenant information if the tenant was assign to a property
    if (this.state.address) {
      tenantDetails = (
        <Paper className={classNames.customPaper}>
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
              secondary={this.state.office_phone}
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
              secondary={this.state.maintenance_phone}
            />
          </ListItem>
        </Paper>
      );
    } else {
      tenantDetails = (
        <Paper className={classNames.customPaper}>
          <ListItem>
            <ListItemText
              primary="No house property assign."
              secondary="Talk to your administrator."
            />
          </ListItem>
        </Paper>
      );
    }

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12} className={classes.title}>
          <List className={classes.root}>
            <Typography component="h1" variant="h5">
              Outstanding Balance
            </Typography>
            <Typography component="h1" variant="h5">
              -350.00
            </Typography>

            <Divider component="li" />
          </List>
          <Grid container justify="space-around" spacing={16}>
            <Grid item xs={12} md={12}>
              <List className={classes.center}>
                <Typography component="h1" variant="h5">
                  Payment Details
                </Typography>
              </List>
            </Grid>
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
                  <ListItemText
                    className={classes.cardTitle}
                    color="primary"
                    primary="Alerts"
                    gutterBottom
                  />
                  <Divider component="li" />
                  <Typography component="p">
                    Work order #123 completed
                  </Typography>
                  <Typography component="p">Rent due 7/5/18</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              {tenantDetails}
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
