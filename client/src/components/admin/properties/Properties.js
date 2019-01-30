import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {
  Edit,
  Delete,
  Home,
  Person,
  DateRange,
  CheckCircleOutline,
  Close,
} from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import AddPropertyModal from './AddPropertyModal';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CustomSnackbar from '../../snackbar/CustomSnackbar';
import axios from 'axios';

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
  card: {
    maxWidth: 400,
    minHeight: 384,
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
  dialog: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Properties extends React.Component {
  state = {
    detailedViewOn: false,
    selectedPropertyId: 0,
    selectedPropertyIndex: null,
    addPropertyModalOpen: false,
    editModalOpen: false,
    trashModalOpen: false,
    properties: [],
    openSnackbar: false,
    snackbarMessage: '',
    snackbarVariant: '',
  };

  componentDidMount() {
    if (this.props.authTokenRecieved) {
      axios.get('/api/properties/admin/alldata').then(properties => {
        this.setState({ properties: properties.data });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.authTokenRecieved &&
      this.props.authTokenRecieved !== prevProps.authTokenRecieved
    ) {
      axios.get('/api/properties/admin/alldata').then(properties => {
        this.setState({ properties: properties.data });
      });
    }
  }

  addPropertyHandler = property => {
    let properties = [...this.state.properties, property];

    this.setState({
      properties: properties,
      openSnackbar: true,
      snackbarMessage: 'Successfully Added Property!',
      snackbarVariant: 'success',
      addPropertyModalOpen: !this.state.addPropertyModalOpen,
    });
  };

  viewMore = event => {
    console.log(event.currentTarget.getAttribute('data-id'));

    if (
      this.state.detailedViewOn !== true &&
      this.state.selectedPropertyIndex !==
        this.state.properties[event.currentTarget.getAttribute('data-index')]
    ) {
      this.setState({ detailedViewOn: true });
    }
  };

  closeDetailedView = () => {
    this.setState({ detailedViewOn: false });
  };

  toggleEditProperty = () => {
    this.setState({ editModalOpen: !this.state.editModalOpen });
  };

  toggleRemovePropertyModal = event => {
    const id = event.currentTarget.getAttribute('data-id');
    const index = event.currentTarget.getAttribute('data-index');
    this.setState({
      trashModalOpen: !this.state.trashModalOpen,
      selectedPropertyId: id,
      selectedPropertyIndex: index,
    });
  };

  closeRemovePropertyModal = () => {
    this.setState({ trashModalOpen: !this.state.trashModalOpen });
  };

  removeProperty = () => {
    let properties = [];

    axios
      .delete(`/api/properties/${this.state.selectedPropertyId}`)
      .then(response => {
        this.state.properties.map((property, index) => {
          if (index !== this.state.selectedPropertyIndex)
            properties.push({ ...property });
        });

        properties.splice(this.state.selectedPropertyIndex, 1);
        this.setState({
          properties: properties,
          trashModalOpen: !this.state.trashModalOpen,
          openSnackbar: true,
          snackbarMessage: 'Successfully Deleted Property!',
          snackbarVariant: 'success',
        });
      })
      .catch(err => {
        this.toggleSnackbarError('Error: Could not delete the property!');
      });
  };

  toggleAddProperty = () => {
    this.setState({ addPropertyModalOpen: !this.state.addPropertyModalOpen });
  };

  toggleSnackbarError = message => {
    this.setState({
      openSnackbar: true,
      snackbarMessage: message,
      snackbarVariant: 'error',
      addPropertyModalOpen: !this.state.addPropertyModalOpen,
    });
  };

  snackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };

  render() {
    const { classes } = this.props;
    console.log('properties', this.state.properties);

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.toggleAddProperty}
          >
            Add Property
          </Button>
        </Grid>
        <Grid item xs={12} lg={this.state.detailedViewOn ? 8 : 12}>
          <Grid container justify="center" spacing={16}>
            {this.state.properties.map((entry, index) => (
              <Grid
                key={entry.house_id}
                item
                xs={12}
                sm={6}
                md={this.state.detailedViewOn ? 6 : 4}
              >
                <Card className={classes.card}>
                  <CardActions className={classes.actions} disableActionSpacing>
                    <Tooltip title="Edit">
                      <IconButton
                        aria-label="Edit Property"
                        onClick={this.toggleEditProperty}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        data-id={entry.house_id}
                        data-index={index}
                        aria-label="Delete Property"
                        onClick={this.toggleRemovePropertyModal}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                  <CardContent>
                    <Typography variant="h5" align="center" component="h6">
                      {entry.property_name}
                    </Typography>
                    <List className={classes.root}>
                      <ListItem>
                        <Avatar>
                          <Home />
                        </Avatar>
                        <ListItemText
                          primary="Address"
                          secondary={[
                            entry.address,
                            entry.city,
                            entry.state,
                            entry.zip_code,
                          ].join(' ')}
                        />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <Person />
                        </Avatar>
                        <ListItemText
                          primary="Tenant(s)"
                          secondary={
                            entry.tenants && entry.tenants.length > 0
                              ? entry.tenants.join(', ')
                              : 'No Tenants'
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <DateRange />
                        </Avatar>
                        <ListItemText
                          primary="Lease"
                          secondary={entry.leaseDate}
                        />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <CheckCircleOutline />
                        </Avatar>
                        <ListItemText
                          primary="Contract Signed"
                          secondary={
                            entry.contract
                              ? entry.contract.toString().toUpperCase()
                              : 'No Data'
                          }
                        />
                      </ListItem>
                    </List>
                    <Grid container justify="center">
                      <Button
                        data-index={index}
                        onClick={this.viewMore}
                        variant="outlined"
                      >
                        View More Info
                      </Button>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          className={this.state.detailedViewOn ? '' : classes.displayNone}
        >
          <Grid container>
            <Tooltip title="Close">
              <IconButton onClick={this.closeDetailedView}>
                <Close />
              </IconButton>
            </Tooltip>
          </Grid>
          <AddPropertyModal
            open={this.state.addPropertyModalOpen}
            onClose={this.toggleAddProperty}
            addPropertyHandler={this.addPropertyHandler}
            snackbarErrorHandler={this.toggleSnackbarError}
          />
          <Modal
            open={this.state.editModalOpen}
            onClose={this.toggleEditProperty}
          >
            <Paper className={classes.paper}>
              <Typography variant="h5" component="p">
                Edit
              </Typography>
            </Paper>
          </Modal>
          <Modal
            open={this.state.trashModalOpen}
            onClose={this.toggleRemoveProperty}
          >
            <Dialog
              open={this.state.trashModalOpen}
              onClose={this.toggleRemoveProperty}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you would like to delete this property?
                </DialogContentText>
              </DialogContent>
              <DialogActions className={classes.dialog}>
                <Button onClick={this.removeProperty} color="primary">
                  Delete
                </Button>
                <Button
                  onClick={this.closeRemovePropertyModal}
                  color="primary"
                  autoFocus
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </Modal>
        </Grid>
        <CustomSnackbar
          open={this.state.openSnackbar}
          variant={this.state.snackbarVariant}
          message={this.state.snackbarMessage}
          onClose={this.snackbarClose}
          onClick={this.snackbarClose}
        />
      </Grid>
    );
  }
}

const PropertiesPage = compose(
  withAuthUser,
  withStyles(styles)
)(Properties);

Properties.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default PropertiesPage;
