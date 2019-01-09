import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Business from '@material-ui/icons/Business';
import Assignment from '@material-ui/icons/Assignment';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Settings from '@material-ui/icons/Settings';
import CreditCard from '@material-ui/icons/CreditCard';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class SidebarAdmin extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              PropertEAZY
            </Typography>
            <Button color="inherit">Sign Out</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <Link style={{ textDecoration: 'none' }} to="/Properties">
              <ListItem button key={'Properties'}>
                <ListItemIcon>
                  <Business />
                </ListItemIcon>
                <ListItemText primary={'Properties'} />
              </ListItem>
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/Work Orders">
              <ListItem button key={'Work Orders'}>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary={'Work Orders'} />
              </ListItem>
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/Tenants">
              <ListItem button key={'Tenants'}>
                <ListItemIcon>
                  <SupervisorAccount />
                </ListItemIcon>
                <ListItemText primary={'Tenants'} />
              </ListItem>
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/Billing">
              <ListItem button key={'Billing'}>
                <ListItemIcon>
                  <CreditCard />
                </ListItemIcon>
                <ListItemText primary={'Billing'} />
              </ListItem>
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/Settings">
              <ListItem button key={'Settings'}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary={'Settings'} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </div>
    );
  }
}

SidebarAdmin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SidebarAdmin);
