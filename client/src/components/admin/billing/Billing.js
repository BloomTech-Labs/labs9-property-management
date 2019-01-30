import React, { Component } from 'react';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import axios from 'axios';
import connectwstripe from '../../../images/connect-with-stripe@2x.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Done } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FolderIcon from '@material-ui/icons/Folder';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

const StripeButton = styled.img`
  width: 200px;
`;

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
const styles = theme => ({
  container: {
    marginTop: 100,
    marginLeft: 0,
  },
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
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
    width: 300,
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
});

class Billing extends Component {
  state = {
    hasStripeID: false,
    fetchingStripeID: true,
    properties: [],
    house_id: 0, // Selected property
    dense: false,
    secondary: false,
  };
  componentDidMount() {
    console.log('props', this.props);
    // check to see if owner has stripe account connected
    if (this.props.authTokenRecieved) {
      axios
        .get('/api/stripe-connect')
        .then(response => {
          console.log('RESPONSE:', response.data);
          if (response.data.hasStripeID === true) {
            console.log('SERVER STRIPE ID:', response.data);
            this.setState({ hasStripeID: true, fetchingStripeID: false });
          } else {
            this.setState({ hasStripeID: false, fetchingStripeID: false });
          }
          // check to see if auth code is provided
          if (this.props.location.search) {
            console.log('BINGO', this.props.location.search.substring(23));
            let computedCode = this.props.location.search.substring(23);
            const stripeAuthCode = {
              computedCode,
            };
            console.log(stripeAuthCode);

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
              console.log('BINGO', this.props.location.search.substring(23));
              let computedCode = this.props.location.search.substring(23);
              const stripeAuthCode = {
                computedCode,
              };
              console.log(stripeAuthCode);

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
    console.log(this.state.hasStripeID);

    if (this.state.hasStripeID) {
      stripeConnectionDetails = (
        <Typography className={classes.tableTitle} component="h5" variant="h6">
          <Done /> Connected to Stripe
        </Typography>
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

    const { dense, secondary } = this.state;

    return (
      <>
        <Grid container className={classes.container} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="space-around" spacing={16}>
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
                  <CardContent>
                    <div className={classes.demo}>
                      <List dense={dense}>
                        {generate(
                          <ListItem>
                            <ListItemIcon>
                              <FolderIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Single-line item"
                              secondary={secondary ? 'Secondary text' : null}
                            />
                          </ListItem>
                        )}
                      </List>
                    </div>
                  </CardContent>
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
