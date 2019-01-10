import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 50,
    minHeight: "400px"
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
    marginTop: 66
  },
  button: {
    width: 200,
    marginTop: 38
  }
});

class Billing extends Component {
  state = {
    anchorEl: null,
    property: [
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
        <Grid item xs={12}>
          <Grid container justify="center" spacing={16}>
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
                {this.state.property[0].address}
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                {" "}
                {this.state.property[1].address}
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                {this.state.property[2].address}
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Billing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Billing);
