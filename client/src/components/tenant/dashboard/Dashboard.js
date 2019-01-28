import React, { Component } from 'react';
import axios from 'axios';
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
});

class Dashboard extends React.Component {
  state = {
    amount: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

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
          <form onSubmit={''} autoComplete="off">
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
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="secondary"
                  className={classNames(classes.button, classes.biggerText)}
                  onClick={this.makePayment}
                >
                  Make a Payment
                </Button>
                <Button
                  type="submit"
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
                <ListItem>
                  <Avatar>
                    <Home />
                  </Avatar>
                  <ListItemText primary="Address" />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <Call />
                  </Avatar>
                  <ListItemText primary="Office" />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <Email />
                  </Avatar>
                  <ListItemText primary="Email" />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <Call />
                  </Avatar>
                  <ListItemText primary="24/7 Maintenance" />
                </ListItem>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
