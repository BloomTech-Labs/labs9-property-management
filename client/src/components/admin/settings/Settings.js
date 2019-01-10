import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 50
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    width: 200,
    marginTop: 36
  }
});

class Settings extends React.Component {
  state = {
    email: "",
    phone: "",
    displayname: "",
    oldpassword: "",
    newpassword: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={16}>
            <form className={classes.container} noValidate autoComplete="off">
              <Grid container justify="center">
                <Typography component="h1" variant="h5">
                  Admin settings
                </Typography>
              </Grid>
              <Grid container justify="center">
                <TextField
                  id="standard-name"
                  label="Email"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.email}
                  onChange={this.handleChange("email")}
                />
              </Grid>
              <Grid container justify="center">
                <TextField
                  id="standard-name"
                  label="Phone"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.phone}
                  onChange={this.handleChange("phone")}
                />
              </Grid>
              <Grid container justify="center">
                <TextField
                  id="standard-name"
                  label="Display Name"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.displayname}
                  onChange={this.handleChange("displayname")}
                />
              </Grid>
              <Grid container justify="center">
                <TextField
                  id="standard-name"
                  label="Old Password"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.oldpassword}
                  onChange={this.handleChange("oldpassword")}
                />
              </Grid>
              <Grid container justify="center">
                <TextField
                  id="standard-name"
                  label="New Password"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.newpassword}
                  onChange={this.handleChange("newpassword")}
                />
              </Grid>
              <Grid container justify="center">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Save
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
