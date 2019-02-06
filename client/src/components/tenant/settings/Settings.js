import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
import InviteTable from './InviteTable';
import axios from 'axios';

const styles = theme => ({
  container: {
    marginTop: 75,
    marginLeft: -8,
  },
  root: {
    padding: theme.spacing.unit,
  },
});

class Settings extends React.Component {
  state = {
    invites: [],
  };

  componentDidMount() {
    if (this.props.authTokenRecieved) {
      axios
        .get('/api/invitations/tenant')
        .then(response => {
          this.setState({ invites: response.data });
        })
        .catch(error => console.log(error));
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.authTokenRecieved &&
      this.props.authTokenRecieved !== prevProps.authTokenRecieved
    ) {
      axios
        .get('/api/invitations/tenant')
        .then(response => {
          this.setState({ invites: response.data });
        })
        .catch(error => console.log(error));
    }
  }

  acceptInvite = event => {
    const id = event.currentTarget.getAttribute('data-id');
    axios
      .post('/api/invitations/accept', { id: id })
      .then(response => {
        this.setState({ invites: [] });
      })
      .catch(error => console.log(error));
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={16}>
            <InviteTable
              invites={this.state.invites}
              acceptInvite={this.acceptInvite}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SettingsPage = compose(
  withAuthUser,
  withStyles(styles)
)(Settings);

export default SettingsPage;
