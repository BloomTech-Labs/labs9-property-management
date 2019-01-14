import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appName: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "inline-block"
    }
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
  appToolbar: {
    justifyContent: "space-between"
  },
  divider: {
    marginTop: 10
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  }
});

class SidebarAdmin extends Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, links } = this.props;

    const drawer = (
      <>
        <List>
          <Hidden mdDown implementation="css">
            <div className={classes.toolbar} />
          </Hidden>
          <ListItem>
            <Avatar>PE</Avatar>
            <ListItemText>Name Here</ListItemText>
          </ListItem>
          <Divider className={classes.divider} />
          {links.map((link, index) => (
            <Link
              key={index}
              style={{ textDecoration: "none" }}
              to={`/admin/${link.url}`}
            >
              <ListItem button>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={`${link.name}`} />
              </ListItem>
            </Link>
          ))}
        </List>
      </>
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
              Page Name
            </Typography>
            <Button color="inherit">Sign Out</Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden mdDown implementation="css">
            <Drawer
              variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
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

SidebarAdmin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SidebarAdmin);
