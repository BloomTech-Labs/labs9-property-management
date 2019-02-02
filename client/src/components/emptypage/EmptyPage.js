import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const EmptyPage = props => {
  const { className } = props;

  return (
    <Grid className={className} alignItems="center" container spacing={0}>
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

export default EmptyPage;
