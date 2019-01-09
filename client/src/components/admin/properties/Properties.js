import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {
  Edit,
  Delete,
  Home,
  Person,
  DateRange,
  CheckCircleOutline
} from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddPropertyCard from './AddPropertyCard';

const styles = theme => ({
  container: {
    marginTop: 100
  },
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper
  },
  card: {
    maxWidth: 400,
    minHeight: 384
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  addPropertyCard: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: 400,
    minHeight: 384
  }
});

class Properties extends React.Component {
  state = {
    expanded: false,
    properties: [
      {
        address: '171 N 600 E Provo, UT 84606',
        tenants: ['Laura Carver', 'Tyler Carver'],
        leaseDate: '6/13/17-6/23/18',
        contract: true
      },
      {
        address: '171 N 600 E Provo, UT 84606',
        tenants: ['Laura Carver', 'Tyler Carver'],
        leaseDate: '6/13/17-6/23/18',
        contract: true
      },
      {
        address: '171 N 600 E Provo, UT 84606',
        tenants: ['Laura Carver', 'Tyler Carver'],
        leaseDate: '6/13/17-6/23/18',
        contract: true
      },
      {
        address: '171 N 600 E Provo, UT 84606',
        tenants: ['Laura Carver', 'Tyler Carver'],
        leaseDate: '6/13/17-6/23/18',
        contract: true
      },
      {
        address: '171 N 600 E Provo, UT 84606',
        tenants: ['Laura Carver', 'Tyler Carver'],
        leaseDate: '6/13/17-6/23/18',
        contract: true
      }
    ]
  };

  render() {
    console.log(this.props);
    const { classes } = this.props;

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={16}>
            {this.state.properties.map((entry, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Edit Property">
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="Delete Property">
                      <Delete />
                    </IconButton>
                  </CardActions>
                  <CardContent>
                    <List className={classes.root}>
                      <ListItem>
                        <Avatar>
                          <Home />
                        </Avatar>
                        <ListItemText
                          primary="Address"
                          secondary={entry.address}
                        />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <Person />
                        </Avatar>
                        <ListItemText
                          primary="Tenant"
                          secondary={entry.tenants.join(', ')}
                        />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <DateRange />
                        </Avatar>
                        <ListItemText
                          primary="Lease"
                          secondary={entry.leaseDate}
                        />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <CheckCircleOutline />
                        </Avatar>
                        <ListItemText
                          primary="Contract Signed"
                          secondary={entry.contract.toString().toUpperCase()}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <AddPropertyCard />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Properties.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Properties);
