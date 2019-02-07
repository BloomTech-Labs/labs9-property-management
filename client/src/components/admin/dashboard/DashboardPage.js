import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import EmptyPage from '../../emptypage/EmptyPage';
import Loading from '../../loading/Loading';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { Home, Build, CheckCircleOutline } from '@material-ui/icons';

const styles = theme => ({
  container: {
    marginTop: 75,
    marginLeft: 0,
  },
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    marginTop: 25,
    position: 'relative',
    overflow: 'visible',
    minWidth: '40%',
    minHeight: 360,
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
  cardHeader: {
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
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
  emptyPage: {
    padding: theme.spacing.unit * 3,
    height: '200px',
  },
});

class DashBoard extends Component {
  state = {
    workOrder: '',
    orderLoading: true,
  };

  componentDidMount() {
    if (this.props.authTokenRecieved) {
      axios
        .get('/api/work-orders/owner')
        .then(orders => {
          this.setState({
            workOrder: orders.data.orders.pop(),
            orderLoading: false,
          });
        })
        .catch(error => {
          console.error('Server Error: ', error);
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.authTokenRecieved &&
      this.props.authTokenRecieved !== prevProps.authTokenRecieved
    ) {
      axios
        .get('/api/work-orders/owner')
        .then(orders => {
          this.setState({
            workOrder: orders.data.orders.pop(),
            orderLoading: false,
          });
        })
        .catch(error => {
          console.error('Server Error: ', error);
        });
    }
  }

  render() {
    const { classes } = this.props;
    const { workOrder, orderLoading } = this.state;

    let orderBody = null;

    if (!orderLoading && this.state.workOrder) {
      orderBody = (
        <Card className={classes.card}>
          <CardHeader
            title="Work Order Summary"
            subheader="Most Recent Work Order"
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
          <CardContent>
            <List className={classes.root}>
              <ListItem>
                <Avatar>
                  <Home />
                </Avatar>
                <ListItemText primary="Address" secondary={workOrder.address} />
              </ListItem>
              <ListItem>
                <Avatar>
                  <Build />
                </Avatar>
                <ListItemText
                  primary="Issue"
                  secondary={workOrder.description}
                />
              </ListItem>
              <ListItem>
                <Avatar>
                  <CheckCircleOutline />
                </Avatar>
                <ListItemText
                  primary="Permission to Enter Property"
                  secondary={workOrder.property_access ? 'YES' : 'NO'}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      );
    } else if (!orderLoading && !workOrder) {
      orderBody = (
        <Card className={classes.card}>
          <CardHeader
            title="Work Order Summary"
            subheader="Most Recent Work Order"
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
          <EmptyPage
            className={classes.emptyPage}
            variant="h5"
            message="No Work Orders"
          />
        </Card>
      );
    } else {
      orderBody = (
        <Card className={classes.card}>
          <CardHeader
            title="Work Order Summary"
            subheader="Most Recent Work Order"
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
          <Loading className={classes.loading} size={80} />
        </Card>
      );
    }

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="space-around" spacing={16}>
            <Grid item xs={12} md={5}>
              <Card className={classes.card}>
                <CardHeader
                  title="Notifications"
                  subheader="Recent Activity"
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
                <EmptyPage
                  className={classes.emptyPage}
                  variant="h5"
                  message="No Notifications"
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              {orderBody}
            </Grid>
            <Grid item xs={12} md={11}>
              <Card className={classes.longCard}>
                <CardHeader
                  title="Rent Summary"
                  subheader="Current Month's Rent Details"
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
                <EmptyPage
                  className={classes.emptyPage}
                  variant="h5"
                  message="No Rent Data"
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const DashBoardPage = compose(
  withAuthUser,
  withStyles(styles)
)(DashBoard);

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default DashBoardPage;
