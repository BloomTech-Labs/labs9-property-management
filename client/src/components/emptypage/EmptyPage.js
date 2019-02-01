import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    height: '70vh',
    padding: theme.spacing.unit * 3,
  },
});

const EmptyPage = props => {
  const { classes } = props;

  return (
    <Grid
      className={classes.container}
      alignItems="center"
      container
      spacing={0}
    >
      <Grid item xs={12}>
        <Typography
          align="center"
          component="h2"
          variant="h3"
          color="secondary"
        >
          {props.message}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(EmptyPage);
