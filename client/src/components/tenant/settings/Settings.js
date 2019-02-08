import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
import InviteTable from './InviteTable';
import axios from 'axios';
import { Description } from '@material-ui/icons';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';

const ContractUploadIcon = styled(Description)`
  color: #999;
  font-size: 200px !important;
  cursor: pointer;
  @media (max-width: 960px) {
    font-size: 64px;
  }
`;

const styles = theme => ({
  container: {
    marginTop: 75,
    marginLeft: -8,
  },
  root: {
    padding: theme.spacing.unit,
  },
  imgpaper: {
    marginTop: 25,
    padding: 20,
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
          <Paper className={classNames(classes.imgpaper, classes.center)}>
          <a
            href={this.props.lease_contract}
            style={{ textDecoration: 'none' }}
            target="_blank"
            rel="noopener noreferrer"
          >
          <ContractUploadIcon />
          </a>
          <Typography component="h1" variant="h5">
            View Contract
          </Typography>
          </Paper>
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
