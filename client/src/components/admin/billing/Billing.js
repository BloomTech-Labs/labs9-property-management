import React, { Component } from 'react';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import axios from 'axios';
import connectwstripe from '../../../images/connect-with-stripe@2x.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CheckCircleOutline } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const StripeButton = styled.img`
  width: 200px;
`;

let id = 0;
function createData(name, amount) {
  id += 1;
  return { id, name, amount };
}

const rows = [createData('Jan 30', '$625.00'), createData('Jan 22', '$500.00')];

const styles = theme => ({
  container: {
    marginTop: 100,
    marginLeft: 0,
  },
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    overflowX: 'auto',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  card: {
    marginTop: 25,
    paddingTop: 75,
    position: 'relative',
    overflow: 'visible',
    minWidth: '40%',
    minHeight: 350,
    zIndex: 0,
  },
  longCard: {
    position: 'relative',
    overflow: 'visible',
    minWidth: '80%',
    minHeight: 350,
    zIndex: 0,
    marginTop: 50,
  },
  cardTop: {
    padding: '15px',
    width: '90%',
    backgroundColor: '#5f29ff',
    zIndex: '2000',
    top: '-6%',
    left: '50%',
    transform: 'translateX(-50%)',
    position: 'absolute',
    boxShadow:
      '0px 5px 5px -3px rgba(81,71,255,0.2), 0px 8px 10px 1px rgba(81,71,255,0.2), 0px 3px 14px 2px rgba(81,71,255,0.2)',
    borderRadius: '4px',
    color: 'white',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  displayNone: {
    display: 'none',
  },
  formControl: {
    width: '100%',
  },
  paper: {
    width: '100%',
    height: '50vh',
    margin: 'auto',
    marginTop: 0,
    paddingTop: 20,
    paddingBottom: 20,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  table: {
    minWidth: 200,
  },
});

class Billing extends Component {
  state = {
    hasStripeID: false,
    fetchingStripeID: true,
    properties: [{ property_name: '1101 Deer Valley Ct' }],
    house_id: 0, // Selected property
  };
  componentDidMount() {
    // check to see if owner has stripe account connected
    if (this.props.authTokenRecieved) {
      axios
        .get('/api/stripe-connect')
        .then(response => {
          if (response.data.hasStripeID === true) {
            this.setState({ hasStripeID: true, fetchingStripeID: false });
          } else {
            this.setState({ hasStripeID: false, fetchingStripeID: false });
          }
          // check to see if auth code is provided
          if (this.props.location.search) {
            let computedCode = this.props.location.search.substring(23);
            const stripeAuthCode = {
              computedCode,
            };

            axios.post('/api/stripe-connect', stripeAuthCode).then(response => {
              this.setState({ hasStripeID: true, fetchingStripeID: false });
            });
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
      axios
        .get('/api/stripe-connect')
        .then(response => {
          if (response.data.hasStripeID === true) {
            this.setState({ hasStripeID: true, fetchingStripeID: false });
          } else {
            // check to see if auth code is provided
            if (this.props.location.search) {
              let computedCode = this.props.location.search.substring(23);
              const stripeAuthCode = {
                computedCode,
              };

              axios
                .post('/api/stripe-connect', stripeAuthCode)
                .then(response => {
                  this.setState({ hasStripeID: true, fetchingStripeID: false });
                });
            } else {
              this.setState({ hasStripeID: false, fetchingStripeID: false });
            }
          }
        })
        .catch(err => console.log('ERROR CHECKING USER STRIPE ID', err));
    }
  }
  handleInputChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    let stripeConnectionDetails;

    if (this.state.hasStripeID) {
      stripeConnectionDetails = (
        <ListItem>
          <Avatar>
            <CheckCircleOutline />
          </Avatar>
          <ListItemText primary="Your Stripe account is connected" />
        </ListItem>
      );
    } else {
      stripeConnectionDetails = (
        <Link
          target="_blank"
          to={
            '//connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_ELLhp2vnlFHBpk0AVDL7PVxBzrsk2NXz&scope=read_write'
          }
        >
          <StripeButton src={connectwstripe} />
        </Link>
      );
    }

    return (
      <>
        <Grid container className={classes.container} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="space-evenly" spacing={16}>
              <Grid item xs={12} md={5}>
                <Paper className={classes.paper}>
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      Billing Information
                    </Typography>
                  </CardContent>
                  <Divider />
                  {this.state.fetchingStripeID ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {stripeConnectionDetails}
                      </Typography>
                      <Typography component="p" />
                    </CardContent>
                  )}
                  <CardContent>
                    <FormControl required className={classes.formControl}>
                      <InputLabel htmlFor="property-native-required">
                        Select a property to view payment history
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
                  </CardContent>
                </Paper>
              </Grid>

              <Grid item xs={12} md={5}>
                <Paper className={classes.paper}>
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      Payment History
                    </Typography>
                  </CardContent>
                  <Divider />
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

Billing.propTypes = {
  classes: PropTypes.object.isRequired,
};

const BillingPage = compose(
  withAuthUser,
  withStyles(styles)
)(Billing);

export default BillingPage;
