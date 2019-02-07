import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import EmptyPage from '../../emptypage/EmptyPage';
import Loading from '../../loading/Loading';
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
} from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import AddPropertyModal from './AddPropertyModal';
import EditPropertyModal from './EditPropertyModal'; // edit property modal
import PropertyModal from './PropertyModal';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Hidden from '@material-ui/core/Hidden';
import CustomSnackbar from '../../snackbar/CustomSnackbar';
import axios from 'axios';

const styles = theme => ({
  container: {
    marginTop: 100,
    marginLeft: 0,
  },
  list: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    width: '90%',
    minHeight: 384,
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
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
  dialog: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing.unit,
  },
  searchbar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  detailedView: {
    width: '100%',
  },
  loading: {
    marginTop: '50%',
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      marginTop: '20%',
    },
  },
  emptyPage: {
    height: '70vh',
    padding: theme.spacing.unit * 3,
  },
});

class Properties extends React.Component {
  state = {
    loading: true,
    detailedViewOn: false,
    selectedPropertyId: 0,
    selectedPropertyIndex: null,
    addPropertyModalOpen: false,
    editModalOpen: false,
    trashModalOpen: false,
    properties: [],
    selectedProperty: null,
    openSnackbar: false,
    snackbarMessage: '',
    snackbarVariant: '',
  };

  componentDidMount() {
    if (this.props.authTokenRecieved) {
      axios.get('/api/properties/admin/alldata').then(properties => {
        this.setState({ properties: properties.data, loading: false });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.authTokenRecieved &&
      this.props.authTokenRecieved !== prevProps.authTokenRecieved
    ) {
      axios.get('/api/properties/admin/alldata').then(properties => {
        this.setState({ properties: properties.data, loading: false });
      });
    }
  }

  addPropertyHandler = property => {
    let properties = [];
    this.state.properties.forEach(property => {
      properties.push({ ...property });
    });
    properties.push(property);

    this.setState({
      properties: properties,
      openSnackbar: true,
      snackbarMessage: 'Successfully Added Property!',
      snackbarVariant: 'success',
      addPropertyModalOpen: !this.state.addPropertyModalOpen,
    });
  };

  editPropertyHandler = (updatedProp, houseIndex) => {
    let properties = [];
    console.log('prop: ', updatedProp, ' index: ', houseIndex);
    this.state.properties.forEach(property => {
      properties.push({ ...property });
    });

    properties[houseIndex] = { ...properties[houseIndex], ...updatedProp };

    this.setState({
      properties: properties,
      openSnackbar: true,
      snackbarMessage: 'Successfully Updated Property Info!',
      snackbarVariant: 'success',
      editModalOpen: false,
    });
  };

  viewMore = event => {
    const index = event.currentTarget.getAttribute('data-index');

    if (this.state.selectedPropertyIndex !== index) {
      this.setState({
        detailedViewOn: true,
        selectedProperty: { ...this.state.properties[index] },
      });
    }
  };

  closeDetailedView = () => {
    this.setState({ detailedViewOn: false });
  };

  toggleEditProperty = event => {
    const id = event.currentTarget.getAttribute('data-id');
    const index = event.currentTarget.getAttribute('data-index');
    this.setState({
      editModalOpen: !this.state.editModalOpen,
      selectedPropertyId: id,
      selectedPropertyIndex: index,
    });
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
    let selectedProperty = this.state.properties[
      this.state.selectedPropertyIndex
    ];
    let properties = [];

    if (selectedProperty.tenants && selectedProperty.tenants.length > 0) {
      this.toggleSnackbarError(
        'Error: Please remove tenants before deleting a property!'
      );
      return;
    }

    axios
      .delete(`/api/properties/${this.state.selectedPropertyId}`)
      .then(response => {
        this.state.properties.forEach((property, index) => {
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
      trashModalOpen: false,
    });
  };

  snackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { loading, properties } = this.state;
    let pageBody = null;

    const addBtnClass = {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
    };

    if (!loading && properties.length > 0) {
      pageBody = (
        <Grid item xs={12}>
          <Grid container justify="flex-start" spacing={16}>
            {this.state.properties.map((entry, index) => (
              <Grid key={entry.house_id} item xs={12} sm={6} md={4}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Card className={classes.card}>
                    <CardActions
                      className={classes.actions}
                      disableActionSpacing
                    >
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="Edit Property"
                          data-id={entry.house_id}
                          data-index={index}
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
                      <List className={classes.list}>
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
                                ? entry.tenants.map(
                                    tenant => tenant.display_name + '\n'
                                  )
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
                            secondary={
                              entry.tenants.length > 0
                                ? entry.tenants.map(
                                    tenant =>
                                      tenant.lease_start_date +
                                      ' - ' +
                                      tenant.lease_end_date +
                                      '\n'
                                  )
                                : 'No Data'
                            }
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
                          color="primary"
                          variant="text"
                        >
                          View More Info
                        </Button>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      );
    } else if (!loading && properties.length === 0) {
      pageBody = (
        <EmptyPage
          className={classes.emptyPage}
          variant="h3"
          message="Please add a property."
        />
      );
    } else {
      pageBody = <Loading className={classes.loading} size={80} />;
    }

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="space-between" spacing={0}>
            <Grid item xs={12} md={4}>
              <Paper className={classes.searchbar} elevation={1}>
                <InputBase
                  className={classes.input}
                  placeholder="Search by Name"
                />
                <IconButton className={classes.iconButton} aria-label="Search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Hidden mdDown>
              <Grid item xs={4} />
            </Hidden>
            <Grid item xs={12} md={2}>
              <div style={addBtnClass}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.toggleAddProperty}
                >
                  Add Property
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
        {pageBody}
        <AddPropertyModal
          open={this.state.addPropertyModalOpen}
          onClose={this.toggleAddProperty}
          addPropertyHandler={this.addPropertyHandler}
          snackbarErrorHandler={this.toggleSnackbarError}
        />
        <EditPropertyModal
          open={this.state.editModalOpen}
          onClose={this.toggleEditProperty}
          editPropertyHandler={this.editPropertyHandler}
          snackbarErrorHandler={this.toggleSnackbarError}
          houseID={this.state.selectedPropertyId}
          houseIndex={this.state.selectedPropertyIndex}
        />
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
        <PropertyModal
          open={this.state.detailedViewOn}
          onClose={this.closeDetailedView}
          property={this.state.selectedProperty}
        />
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
