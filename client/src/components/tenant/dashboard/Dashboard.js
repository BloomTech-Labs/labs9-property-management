import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Home, Call, Email } from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  container: {
    padding: 20,
    marginTop: 70,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  textFieldHeight: {
    height: 200,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  box: {
    display: 'flex',
    padding: 10,
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 50,
  },
  root: {
    width: '100%',
  },
  dividerFullWidth: {
    margin: `2px 0 0 ${theme.spacing.unit * 2}px`,
  },
  dividerInset: {
    margin: `2px 0 0 ${theme.spacing.unit * 9}px`,
  },
  submit: {
    height: 40,
    width: 70,
    fontSize: 15,
    marginTop: 10,
  },
  center: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  blockElement: {
    display: 'block',
  },
  noPadding: {
    padding: 0,
  },
  button: {
    width: '100%',
    padding: 40,
  },
  marginTop: {
    marginTop: 40,
  },
  biggerText: {
    fontSize: 20,
  },
  card: {
    // minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class Dashboard extends React.Component {
  makePayment = event => {
    this.props.history.push('/tenant/payments');
  };

  submitWorkorder = event => {
    this.props.history.push('/tenant/maintenance');
  };

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <List className={classes.root}>
            <Typography component="h1" variant="h5">
              Outsanding Balance
            </Typography>
            <Divider component="li" />
          </List>
          <List className={classes.box}>
            <ListItem className={classes.blockElement}>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="secondary"
                  className={classNames(classes.button, classes.biggerText)}
                  onClick={this.makePayment}
                >
                  Make a Payment
                </Button>
              </div>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="secondary"
                  className={classNames(
                    classes.button,
                    classes.marginTop,
                    classes.biggerText
                  )}
                  onClick={this.submitWorkorder}
                >
                  Submit a Work Order
                </Button>
              </div>
              <Card className={classNames(classes.card, classes.marginTop)}>
                <CardContent>
                  <ListItemText
                    className={classes.title}
                    color="primary"
                    primary="Alerts"
                    gutterBottom
                  />
                  <Divider component="li" />
                  <Typography component="p">
                    Work order #123 completed
                  </Typography>
                  <Typography component="p">Rent due 7/5/18</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </ListItem>
            <ListItem className={classes.blockElement}>
              <ListItem>
                <Avatar>
                  <Home />
                </Avatar>
                <ListItemText primary="Address" />
              </ListItem>
              <ListItem>
                <Avatar>
                  <Call />
                </Avatar>
                <ListItemText primary="Office" />
              </ListItem>
              <ListItem>
                <Avatar>
                  <Email />
                </Avatar>
                <ListItemText primary="Email" />
              </ListItem>
              <ListItem>
                <Avatar>
                  <Call />
                </Avatar>
                <ListItemText primary="24/7 Maintenance" />
              </ListItem>
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
