import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 3,
  },
});

const Loading = props => {
  const { classes, size, className } = props;
  const progressWrapper = {
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <Grid className={className} container spacing={0}>
      <Grid item xs={12}>
        <div style={progressWrapper}>
          <CircularProgress
            className={classes.progress}
            color="primary"
            size={size}
          />
        </div>
      </Grid>
    </Grid>
  );
};

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
