import React from 'react';
import axios from 'axios';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Call from '@material-ui/icons/Call';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FileUploader from '../../admin/workorders/FileUploader';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import CustomSnackbar from '../../snackbar/CustomSnackbar';

const styles = theme => ({
  container: {
    padding: 20,
    marginTop: 70,
  },
  root: {
    width: '100%',
  },
  imgpaper: {
    marginTop: 25,
    padding: 20,
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  imgpaper2: {
    width: '100%',
    padding: 20,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    marginTop: 25,
    position: 'relative',
    overflow: 'visible',
    minWidth: '40%',
    minHeight: 350,
    zIndex: 0,
  },
  typography: {
    marginLeft: 10,
    marginTop: 6,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  displayNone: {
    display: 'none',
  },
  paper: {
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '96%',
  },
  dense: {
    marginTop: 40,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    marginTop: 20,
  },
  customPaper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 11,
  },
  marginTop: {
    marginTop: 10,
  },
  marginTop2: {
    marginTop: 20,
  },
});

class Maintenance extends React.Component {
  state = {
    address: '',
    city: '',
    state: '',
    zipcode: '',
    description: '',
    phoneNumber: '',
    permission: true,
    photo: '',
    maintenanceNum: '',
    houseID: '',
    tenantID: '',
    loading: true,
    openSnackbar: false,
    snackbarMessage: '',
    snackbarVariant: '',
  };

  componentDidMount() {
    const endpoint = 'api/tenants/dashboard/';
    axios
      .get(endpoint)
      .then(response => {
        if (response.data.length > 0) {
          this.setState(() => ({
            address: response.data[0].address,
            city: response.data[0].city,
            state: response.data[0].state,
            zipcode: response.data[0].zip_code,
            phoneNumber: response.data[0].mobile,
            maintenanceNum: response.data[0].maintenance_ph,
            houseID: response.data[0].house_id,
            tenantID: response.data[0].tenant_id,
            loading: false,
          }));
        }
      })
      .catch(error => {
        console.error('Server Error: ', error);
      });
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
            this.setState(() => ({
              address: response.data[0].address,
              city: response.data[0].city,
              state: response.data[0].state,
              zipcode: response.data[0].zip_code,
              phoneNumber: response.data[0].mobile,
              maintenanceNum: response.data[0].maintenance_ph,
              houseID: response.data[0].house_id,
              tenantID: response.data[0].tenant_id,
              loading: false,
            }));
          }
        })
        .catch(err => console.log('ERROR CHECKING USER STRIPE ID', err));
    }
  }

  GetURL = photo => this.setState({ photo: photo });

  submitWorkOrder = event => {
    event.preventDefault();

    console.log('this.state.photo.original', this.state.photo.original);
    axios
      .post('/api/work-orders/', {
        description: this.state.description,
        property_access: this.state.permission,
        work_order_image: this.state.photo.original,
        tenant_id: this.state.tenantID,
        house_id: this.state.houseID,
        work_order_status: 'submitted',
      })
      .then(res => {
        console.log('register response: ', res);
        this.setState({
          openSnackbar: true,
          snackbarMessage: 'Work Order Submitted!',
          snackbarVariant: 'success',
        });
      })
      .catch(error => {
        console.error('Axios response: ', error);
        this.setState({
          openSnackbar: true,
          snackbarMessage: 'Error submitting. Please try again.',
          snackbarVariant: 'error',
        });
      });
  };

  handleCheckedBox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = event => {
    event.preventDefault();
    console.log('state', this.state);
  };

  phoneConverter = int => {
    if (int) {
      let arr = Array.from(int.toString());
      arr.splice(6, 0, '-');
      arr.splice(3, 0, '-');
      return arr.join('');
    } else return '800-888-8888';
  };

  snackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };

  render() {
    const { classes } = this.props;

    if (this.state.address && this.state.loading === false) {
      return (
        <Grid container className={classes.container} spacing={16}>
          <Grid item xs={12} className={classes.title}>
            <form onSubmit={this.submitWorkOrder} autoComplete="off">
              <Grid container justify="space-around" spacing={16}>
                <Paper className={classes.imgpaper}>
                  {/* <Grid item xs={12} md={5}> */}
                  <CardHeader
                    title="Submit a Work Order"
                    subheader="Fill out the form"
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
                  <ListItem className={classNames(classes.blockElement)}>
                    <Avatar>
                      <Call />
                    </Avatar>
                    <ListItemText
                      primary="24/7 Maintenance"
                      secondary={this.phoneConverter(this.state.maintenanceNum)}
                    />
                  </ListItem>
                  <ListItemText
                    className={classes.marginTop}
                    color="background"
                    primary="Address:"
                  />
                  <ListItemText
                    color="background"
                    secondary={
                      this.state.address +
                      ', ' +
                      this.state.city +
                      ', ' +
                      this.state.state +
                      ' ' +
                      this.state.zipcode
                    }
                  />
                  <TextField
                    id="outlined-multiline-static"
                    label="Description of Issue"
                    className={classNames(
                      classes.textField,
                      classes.marginTop2
                    )}
                    rows="6"
                    multiline
                    margin="dense"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.description}
                    type="text"
                    name="description"
                  />
                </Paper>
                <Paper className={classNames(classes.imgpaper, classes.center)}>
                  <FileUploader GetURL={this.GetURL} />
                </Paper>
                <Grid item xs={12} md={11}>
                  <div
                    className={classNames(classes.center, classes.marginTop2)}
                  >
                    <FormControlLabel
                      label="Permission to enter premises without tenant home"
                      control={
                        <Checkbox
                          checked={this.state.permission}
                          onChange={this.handleCheckedBox('permission')}
                          value="permission"
                          color="primary"
                        />
                      }
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={11}>
                  <div className={classes.center}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      color="primary"
                      className={classes.button}
                    >
                      Submit
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
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
    } else {
      return (
        <Grid container className={classes.container} spacing={16}>
          <Grid item xs={12} className={classes.title}>
            <List className={classes.root}>
              <Paper className={classes.imgpaper2}>
                <CardHeader
                  title="Submit a Work Order"
                  subheader="Account has no property assigned"
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
              </Paper>
            </List>
          </Grid>
        </Grid>
      );
    }
  }
}

Maintenance.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MaintenancePage = compose(
  withAuthUser,
  withStyles(styles)
)(Maintenance);

export default MaintenancePage;
