import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import {
  Home,
  Build,
  Call,
  InsertPhoto,
  CheckCircleOutline,
} from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';

const styles = theme => ({
  container: {
    marginTop: 100,
  },
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    maxWidth: 400,
    minHeight: 384,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  description: {
    marginRight: '25%',
    transform: 'translateX(25%)',
  },
  customPaper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 11,
    maxWidth: 300,
  },
});

class WorkOrders extends Component {
  state = {
    workOrders: [],
  };

  componentDidMount() {
    if (this.props.authTokenRecieved) {
      axios.get('/api/work-orders/owner').then(orders => {
        this.setState({ workOrders: orders.data.orders });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.authTokenRecieved &&
      this.props.authTokenRecieved !== prevProps.authTokenRecieved
    ) {
      axios.get('/api/work-orders/owner').then(orders => {
        this.setState({ workOrders: orders.data.orders });
      });
    }
    console.log('CDU state: ', this.state);
  }

  sendAlert = () => {
    fetch('http://property-management-dev.herokuapp.com/text').catch(err =>
      console.error(err)
    );
  };

  handleRadio = (name, index) => event => {
    const workOrdersCopy = this.state.workOrders.slice();
    workOrdersCopy[index][name] = event.target.value;
    console.log('workorderscopy: ', workOrdersCopy);
    console.log('workorderscopy[index][name]: ', workOrdersCopy[index][name]);
    this.setState({ workOrders: workOrdersCopy });
  };

  render() {
    const { classes } = this.props;
    if (this.state.workOrders.length === 0) {
      return (
        <Grid container className={classes.container} spacing={16}>
          <Grid item xs={12}>
            <Paper className={classNames.customPaper}>
              <ListItem>
                <ListItemText primary="No work orders in queue" />
              </ListItem>
            </Paper>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container className={classes.container} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="flex-start" spacing={16}>
              {this.state.workOrders.map((entry, index) => (
                <Grid key={index} item xs={12} sm={6} lg={4}>
                  <Card className={classes.card}>
                    <CardActions
                      className={classes.actions}
                      disableActionSpacing
                    >
                      <Typography
                        className={classes.description}
                        variant="h5"
                        component="p"
                      >
                        {`Work order #${entry.work_order_id}`}
                      </Typography>
                      <IconButton aria-label="View Image">
                        <InsertPhoto />
                      </IconButton>
                    </CardActions>
                    <CardContent>
                      <List className={classes.root}>
                        <ListItem>
                          <Avatar>
                            <Home />
                          </Avatar>
                          <ListItemText
                            primary="Address"
                            secondary={entry.address}
                          />
                        </ListItem>
                        <ListItem>
                          <Avatar>
                            <Build />
                          </Avatar>
                          <ListItemText
                            primary="Issue"
                            secondary={entry.description}
                          />
                        </ListItem>
                        <ListItem>
                          <Avatar>
                            <CheckCircleOutline />
                          </Avatar>
                          <ListItemText
                            primary="Permission to Enter Property"
                            secondary={entry.property_access ? 'YES' : 'NO'}
                          />
                        </ListItem>
                        <ListItem>
                          <Avatar>
                            <Call />
                          </Avatar>
                          <ListItemText
                            primary="Phone"
                            secondary={entry.mobile}
                          />
                        </ListItem>
                      </List>
                      <FormControl component="fieldset" fullWidth={true}>
                        <RadioGroup
                          aria-label="work_order_status"
                          name="work_order_status"
                          value={entry.work_order_status}
                          onChange={this.handleRadio(
                            'work_order_status',
                            index
                          )}
                          row
                        >
                          <FormControlLabel
                            value="submitted"
                            control={
                              <Radio
                                checked={
                                  entry.work_order_status === 'submitted'
                                }
                                name="work-order-status"
                                aria-label="submitted"
                              />
                            }
                            label="Submitted"
                            labelPlacement="top"
                          />
                          <FormControlLabel
                            value="in-progress"
                            control={
                              <Radio
                                checked={
                                  entry.work_order_status === 'in-progress'
                                }
                                name="work-order-status"
                                aria-label="In Progress"
                              />
                            }
                            label="In Progress"
                            labelPlacement="top"
                          />
                          <FormControlLabel
                            value="completed"
                            control={
                              <Radio
                                checked={
                                  entry.work_order_status === 'completed'
                                }
                                name="work-order-status"
                                aria-label="Completed"
                              />
                            }
                            label="Completed"
                            labelPlacement="top"
                          />
                        </RadioGroup>
                      </FormControl>
                      <Button color="inherit" onClick={this.sendAlert}>
                        Submit
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }
}

const WorkOrdersPage = compose(
  withAuthUser,
  withStyles(styles)
)(WorkOrders);

WorkOrders.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WorkOrdersPage;
