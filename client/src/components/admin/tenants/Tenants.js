import React, { Component } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  container: {
    marginTop: 100,
    marginLeft: 0,
  },
  header: {
    marginBottom: theme.spacing.unit * 5,
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
  cardTop: {
    padding: '15px',
    width: '90%',
    backgroundColor: '#5f29ff',
    zIndex: '2000',
    top: '-6%',
    left: '50%',
    transform: 'translateX(-50%)',
    position: 'absolute',
    boxShadow:
      '0px 5px 5px -3px rgba(81,71,255,0.2), 0px 8px 10px 1px rgba(81,71,255,0.2), 0px 3px 14px 2px rgba(81,71,255,0.2)',
    borderRadius: '4px',
    color: 'white',
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

class Tenants extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="space-around" spacing={16}>
            <Grid item xs={12} md={5}>
              <Card className={classes.card}>
                <CardHeader
                  title="Pending Invites"
                  subheader="Invites you have sent"
                  className={classes.cardTop}
                  titleTypographyProps={{
                    component: 'h4',
                    variant: 'body1',
                    color: 'inherit',
                  }}
                  subheaderTypographyProps={{
                    variant: 'overline',
                    color: 'secondary',
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card className={classes.card}>
                <CardHeader
                  title="Tenants"
                  subheader="Your Current Tenants"
                  className={classes.cardTop}
                  titleTypographyProps={{
                    component: 'h4',
                    variant: 'body1',
                    color: 'inherit',
                  }}
                  subheaderTypographyProps={{
                    variant: 'overline',
                    color: 'secondary',
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={11}>
              <Card className={classes.longCard}>
                <CardHeader
                  title="Add a Tenant"
                  subheader="Invite a tenant to connect with you"
                  className={classes.cardTop}
                  titleTypographyProps={{
                    component: 'h4',
                    variant: 'body1',
                    color: 'inherit',
                  }}
                  subheaderTypographyProps={{
                    variant: 'overline',
                    color: 'secondary',
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

export default withStyles(styles)(Tenants);
