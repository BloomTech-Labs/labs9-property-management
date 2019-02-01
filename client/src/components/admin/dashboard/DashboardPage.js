import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

const styles = theme => ({
  container: {
    marginTop: 75,
    marginLeft: 0,
  },
  root: {
    width: '100%',
    maxWidth: 400,
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
  longCard: {
    position: 'relative',
    overflow: 'visible',
    minWidth: '80%',
    minHeight: 350,
    zIndex: 0,
    marginTop: 50,
  },
  cardHeader: {
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
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
});

class DashBoard extends Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="space-around" spacing={16}>
            <Grid item xs={12} md={5}>
              <Card className={classes.card}>
                <CardHeader
                  title="Notifications"
                  subheader="Recent Activity"
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
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card className={classes.card}>
                <CardHeader
                  title="Work Order Summary"
                  subheader="Most Recent Work Order"
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
              </Card>
            </Grid>
            <Grid item xs={12} md={11}>
              <Card className={classes.longCard}>
                <CardHeader
                  title="Rent Summary"
                  subheader="Current Month's Rent Details"
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
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DashBoard);
