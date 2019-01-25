import React, { Component } from 'react';
import axios from 'axios';
import connectwstripe from '../../../images/connect-with-stripe@2x.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StripeButton = styled.img`
  width: 200px;
`;

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 50,
    minHeight: '400px',
    // border: "1px solid orange"
  },
  leftColumn: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    // border: "1px solid black",
    flexDirection: 'column',
  },
  rightColumn: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
    marginTop: 66,
    marginBottom: 30,
  },
  button: {
    width: 200,
    marginTop: 38,
  },
  card: {
    maxWidth: 300,
    marginTop: 50,
    paddingLeft: 30,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 220,
    marginTop: 30,
    marginLeft: 30,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  rootTable: {
    // width: "100%",
    overflowX: 'auto',
    marginTop: 30,
  },
  table: {
    minWidth: 150,
  },
  tableTitle: {
    marginLeft: 10,
  },
});

class Billing extends Component {
  state = {
    hasStripeID: null,
    fetchingStripeID: true,
    property: '171 N 600 E',
    cc: '1234567812345678',
    exp: '09/20',
    cvv: '***',
    history: [
      { date: '1/2/2018', amount: '$350.00' },
      { date: '2/1/2018', amount: '$350.00' },
      { date: '3/3/2018', amount: '$350.00' },
      { date: '4/3/2018', amount: '$350.00' },
    ],
    properties: [
      {
        id: 1,
        address: '171 N 600 E',
        cc: '1234567812345678',
        exp: '09/19',
        cvv: '***',
        history: [
          { date: '1/2/2018', amount: '$350.00' },
          { date: '2/1/2018', amount: '$350.00' },
          { date: '3/3/2018', amount: '$350.00' },
          { date: '4/3/2018', amount: '$350.00' },
        ],
      },
      {
        id: 2,
        address: '990 Smith Ave',
        cc: '1123445677650989',
        exp: '07/19',
        cvv: '***',
        history: [
          { date: '1/2/2018', amount: '$390.00' },
          { date: '2/2/2018', amount: '$390.00' },
          { date: '3/2/2018', amount: '$390.00' },
          { date: '4/4/2018', amount: '$390.00' },
          { date: '5/1/2018', amount: '$390.00' },
        ],
      },
      {
        id: 3,
        address: '124 Elm Ave',
        cc: '1455445677650989',
        exp: '08/19',
        cvv: '***',
        history: [
          { date: '1/3/2018', amount: '$440.00' },
          { date: '2/2/2018', amount: '$440.00' },
          { date: '3/3/2018', amount: '$440.00' },
          { date: '4/2/2018', amount: '$440.00' },
          { date: '5/3/2018', amount: '$440.00' },
        ],
      },
    ],
  };
  componentDidMount() {
    console.log('props', this.props);
    // check to see if owner has stripe account connected
    setTimeout(
      () =>
        axios
          .get('/api/stripe-connect')
          .then(response =>
            response.data.hasStripeID === true
              ? this.setState({ hasStripeID: true, fetchingStripeID: false })
              : this.setState({ hasStripeID: false, fetchingStripeID: false })
          )
          .catch(err => console.log('ERROR CHECKING USER STRIPE ID', err)),
      2000
    );
    // check to see if auth code is provided
    if (this.props.location.search) {
      console.log('BINGO', this.props.location.search.substring(23));
      let computedCode = this.props.location.search.substring(23);
      const stripeAuthCode = {
        computedCode,
      };
      console.log(stripeAuthCode);
      setTimeout(
        () =>
          axios
            .post('/api/stripe-connect', stripeAuthCode)
            .then(response => console.log('response'))
            .catch(err => console.log(err)),
        2000
      );
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      cc: this.state.properties.find(
        entry => entry.address === event.target.value
      ).cc,
      exp: this.state.properties.find(
        entry => entry.address === event.target.value
      ).exp,
      cvv: this.state.properties.find(
        entry => entry.address === event.target.value
      ).cvv,
      history: this.state.properties.find(
        entry => entry.address === event.target.value
      ).history,
    });
    console.log(
      this.state.properties.find(entry => entry.address === event.target.value)
    );
    console.log(
      this.state.properties.find(entry => entry.address === event.target.value)
        .cc
    );
    console.log(event.target.value);
  };

  render() {
    const { classes } = this.props;
    console.log('STATE', this.state.hasStripeID);
    let stripeConnectionDetails;

    if (this.state.hasStripeID) {
      stripeConnectionDetails = (
        <Typography className={classes.tableTitle} component="h5" variant="h6">
          Connected to Stripe
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
          {' '}
          <StripeButton src={connectwstripe} />
        </Link>
      );
    }

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid className={classes.leftColumn}>
          <form className={classes.root} autoComplete="off">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Property</InputLabel>
              <Select
                value={this.state.property}
                onChange={this.handleChange}
                input={
                  <OutlinedInput
                    name="property"
                    id="outlined-simple"
                    labelWidth={2}
                  />
                }
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {this.state.properties.map((addr, index) => (
                  <MenuItem key={index} value={addr.address}>
                    {addr.address}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
          <Card className={classes.card}>
            <CardContent>
              {this.state.fetchingStripeID ? (
                <Typography
                  className={classes.tableTitle}
                  component="h6"
                  variant="h6"
                >
                  Loading stripe details...
                </Typography>
              ) : (
                stripeConnectionDetails
              )}
              <List className={classes.root}>
                <ListItem>
                  <ListItemText primary="CC#" secondary={this.state.cc} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="EXP" secondary={this.state.exp} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="CVV" secondary={this.state.cvv} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid className={classes.rightColumn}>
          <Paper className={classes.rootTable}>
            <Typography
              className={classes.tableTitle}
              component="h5"
              variant="h6"
            >
              Rent History
            </Typography>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Amount Paid</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.history.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {entry.date}
                    </TableCell>
                    <TableCell align="right">{entry.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Billing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Billing);
