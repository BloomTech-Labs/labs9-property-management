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
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  container: {
    marginTop: 100,
  },
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '30%',
    height: '80vh',
    margin: 'auto',
    marginTop: 50,
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
    // ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
    marginTop: theme.spacing.unit * 11,
    // maxWidth: 300,
    minHeight: 200,
  },
  listItem: {
    fontSize: '1.4em',
    textAlign: 'center',
  },
});

class WorkOrders extends Component {
  state = {
    workOrders: [],
    imageModalOpen: false,
    img_src: '',
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

  toggleImageModal = event => {
    const src = event.currentTarget.getAttribute('data-src');

    this.setState({ imageModalOpen: !this.state.imageModalOpen, img_src: src });
  };

  closeImageModal = () => {
    this.setState({ imageModalOpen: false, img_src: '' });
  };

  sendAlert = () => {
    fetch('http://property-management-dev.herokuapp.com/text').catch(err =>
      console.error(err)
    );
  };

  // updateStatus =

  handleRadio = (name, index) => event => {
    const workOrdersCopy = this.state.workOrders.slice();
    workOrdersCopy[index][name] = event.target.value;
    // console.log('workorderscopy: ', workOrdersCopy);
    // console.log('workorderscopy[index][name]: ', workOrdersCopy[index][name]);
    this.setState({ workOrders: workOrdersCopy });
  };

  render() {
    const { classes } = this.props;

    const imageClass = {
      marginTop: '10vh',
      marginLeft: '50%',
      transform: 'translateX(-50%)',
      height: '80vh',
      maxWidth: '90%',
    };

    if (this.state.workOrders.length === 0) {
      return (
        <Grid
          container
          className={classes.container}
          spacing={16}
          justify="center"
        >
          <Grid item xs={12}>
            <Paper className={classNames.customPaper}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="No Work Orders In Queue"
                    classes={{ primary: classes.listItem }}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <>
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
                          {`Work Order # ${entry.work_order_id}`}
                        </Typography>
                        <IconButton
                          aria-label="View Image"
                          onClick={this.toggleImageModal}
                          data-src={entry.work_order_image}
                        >
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
                                  color="primary"
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
                                  color="primary"
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
                                  color="primary"
                                />
                              }
                              label="Completed"
                              labelPlacement="top"
                            />
                          </RadioGroup>
                        </FormControl>
                        <Grid container justify="center">
                          <Button color="primary" onClick={this.sendAlert}>
                            Submit
                          </Button>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Modal
            open={this.state.imageModalOpen}
            onClose={this.closeImageModal}
          >
            <img style={imageClass} src={this.state.img_src} />
          </Modal>
        </>
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
