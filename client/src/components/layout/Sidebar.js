import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthUserContext } from '../session';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SignOutButton from './SignOutButton';
import property from '../../images/property.jpg';

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appName: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'inline-block',
    },
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(25,25,25,0.7)), url(${property})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  appToolbar: {
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: 10,
    backgroundColor: '#D4D4D4',
    width: '80%',
    marginLeft: '10%',
    marginBottom: '10%',
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  avatar: {
    width: 60,
    height: 60,
  },
  displayName: {
    textAlign: 'center',
    color: '#D4D4D4',
  },
});

class Sidebar extends Component {
  state = {
    mobileOpen: false,
    link: 'Dashboard',
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, links } = this.props;
    const drawer = (
      <AuthUserContext.Consumer>
        {({ authUser }) => (
          <List>
            <Hidden mdDown implementation="css">
              <div className={classes.toolbar} />
            </Hidden>
            <ListItem>
              <Avatar
                alt="Profile Photo"
                src={authUser.photoURL}
                className={classes.avatar}
              />
              <ListItemText className={classes.displayName} disableTypography>
                <Typography color="inherit">{authUser.displayName}</Typography>
              </ListItemText>
            </ListItem>
            <Divider className={classes.divider} />
            {links.map((link, index) => (
              <NavLink
                key={index}
                style={{
                  textDecoration: 'none',
                  color: '#D4D4D4',
                }}
                to={`/admin/${link.url}`}
                onClick={() =>
                  this.setState({
                    link: `${link.name === '' ? 'Dashboard' : link.name}`,
                  })
                }
              >
                <ListItem button>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText disableTypography>
                    <Typography color="inherit">{link.name}</Typography>
                  </ListItemText>
                </ListItem>
              </NavLink>
            ))}
          </List>
        )}
      </AuthUserContext.Consumer>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.appToolbar}>
            <Typography
              className={classes.appName}
              variant="h5"
              color="inherit"
              noWrap
            >
              PropertEAZY
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="p">
              {this.state.link}
            </Typography>
            <SignOutButton />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden mdDown implementation="css">
            <Drawer
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Sidebar);
