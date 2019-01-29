import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Close from '@material-ui/icons/Close';
import Error from '@material-ui/icons/Error';
import green from '@material-ui/core/colors/green';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
});

const CustomSnackbar = props => {
  const { classes } = props;
  let icon = null;
  let snackbarClass = null;

  switch (props.variant) {
    case 'success':
      icon = <CheckCircle className={classes.icon} />;
      snackbarClass = classes.success;
      break;
    case 'error':
      icon = <Error className={classes.icon} />;
      snackbarClass = classes.error;
      break;
    default:
      icon = null;
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={props.open}
      autoHideDuration={6000}
      onClose={props.onClose}
    >
      <SnackbarContent
        className={snackbarClass}
        aria-describedby="snackbar"
        message={
          <span id="snackbar" className={classes.message}>
            {icon}
            {props.message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={props.onClick}
          >
            <Close />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default withStyles(styles)(CustomSnackbar);
