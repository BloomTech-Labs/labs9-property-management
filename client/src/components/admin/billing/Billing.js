import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 50,
    minHeight: "400px"
    // border: "1px solid orange"
  },
  leftColumn: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    // border: "1px solid black",
    flexDirection: "column"
  },
  rightColumn: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200,
    marginTop: 66,
    marginBottom: 30
  },
  button: {
    width: 200,
    marginTop: 38
  },
  card: {
    maxWidth: 300,
    marginTop: 50,
    paddingLeft: 30
  }
});

class Billing extends Component {
  state = {
    anchorEl: null,
    selectedProperty: "171 N 600 E",
    properties: [
      {
        id: 1,
        address: "171 N 600 E",
        cc: "1234567812345678",
        exp: "09/19",
        cvv: "***",
        history: {
          Jan: "$350.00",
          Feb: "$350.00",
          Mar: "$350.00",
          Apr: "$350.00"
        }
      },
      {
        id: 2,
        address: "990 Smith Ave",
        cc: "1123445677650989",
        exp: "07/19",
        cvv: "***",
        history: {
          Jan: "$350.00",
          Feb: "$350.00",
          Mar: "$350.00",
          Apr: "$350.00"
        }
      },
      {
        id: 3,
        address: "124 Elm Ave",
        cc: "1455445677650989",
        exp: "08/19",
        cvv: "***",
        history: {
          Jan: "$350.00",
          Feb: "$350.00",
          Mar: "$350.00",
          Apr: "$350.00"
        }
      }
    ]
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid className={classes.leftColumn} spacing={16}>
          <Button
            className={classes.menu}
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            Property
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>
              {this.state.properties[0].address}
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              {this.state.properties[1].address}
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              {this.state.properties[2].address}
            </MenuItem>
          </Menu>
          <Card className={classes.card}>
            <CardContent>
              <List className={classes.root}>
                <ListItem>
                  <ListItemText
                    primary="CC#"
                    secondary={this.state.properties[0].cc}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="EXP"
                    secondary={this.state.properties[0].exp}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="CVV"
                    secondary={this.state.properties[0].cvv}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid className={classes.rightColumn} spacing={16}>
          <Card className={classes.card}>
            <Typography component="h1" variant="h6">
              Date
            </Typography>
            <CardContent>
              <List className={classes.root}>
                <ListItem>
                  <ListItemText primary="1/2/2018" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2/2/2018" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3/2/2018" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4/2/2018" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <Typography component="h1" variant="h6">
              Amount Paid
            </Typography>
            <CardContent>
              <List className={classes.root}>
                <ListItem>
                  <ListItemText primary="$350.00" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="$350.00" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="$350.00" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="$350.00" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

Billing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Billing);
