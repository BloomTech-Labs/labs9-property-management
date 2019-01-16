import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import {
  Home,
  Build,
  Call,
  InsertPhoto,
  CheckCircleOutline
} from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  container: {
    marginTop: 100
  },
  root: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper
  },
  card: {
    maxWidth: 400,
    minHeight: 384
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  description: {
    marginRight: "25%",
    transform: "translateX(25%)"
  }
});

class WorkOrders extends Component {
  state = {
    workOrders: [
      {
        id: 1,
        address: "171 N 600 E",
        description: "Clogged Drain",
        permission: true,
        phone: "801-432-5674",
        status: "submitted"
      },
      {
        id: 2,
        address: "171 N 600 E",
        description: "Clogged Drain",
        permission: true,
        phone: "801-432-5674",
        status: "submitted"
      },
      {
        id: 3,
        address: "171 N 600 E",
        description: "Clogged Drain",
        permission: true,
        phone: "801-432-5674",
        status: "submitted"
      },
      {
        id: 4,
        address: "171 N 600 E",
        description: "Clogged Drain",
        permission: true,
        phone: "801-432-5674",
        status: "submitted"
      }
    ]
  };
	sendAlert = _ => {
		fetch(
			(`http://localhost:4000/text`)
          )
    .catch(err => console.error(err));
  };
  
  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="flex-start" spacing={16}>
            {this.state.workOrders.map((entry, index) => (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <Card className={classes.card}>
                  <CardActions className={classes.actions} disableActionSpacing>
                    <Typography
                      className={classes.description}
                      variant="h5"
                      component="p"
                    >
                      {`Work order #${entry.id}`}
                    </Typography>
                    <IconButton aria-label="View Image">
                      <InsertPhoto />
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
                          <Build />
                        </Avatar>
                        <ListItemText
                          primary="Issue"
                          secondary={entry.description}
                        />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <CheckCircleOutline />
                        </Avatar>
                        <ListItemText
                          primary="Permission to Enter Property"
                          secondary={entry.permission ? "YES" : "NO"}
                        />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <Call />
                        </Avatar>
                        <ListItemText primary="Phone" secondary={entry.phone} />
                      </ListItem>
                    </List>
                    <FormControl component="fieldset" fullWidth={true}>
                      <RadioGroup
                        aria-label="status"
                        name="status"
                        value={entry.status}
                        row
                      >
                        <FormControlLabel
                          value="submitted"
                          control={
                            <Radio
                              checked={entry.status === "submitted"}
                              name="work-order-status"
                              aria-label="submitted"
                            />
                          }
                          label="Submitted"
                          labelPlacement="top"
                        />
                        <FormControlLabel
                          value="in-progress"
                          control={
                            <Radio
                              checked={entry.status === "in-progress"}
                              name="work-order-status"
                              aria-label="In Progress"
                            />
                          }
                          label="In Progress"
                          labelPlacement="top"
                        />
                        <FormControlLabel
                          value="completed"
                          control={
                            <Radio
                              checked={entry.status === "completed"}
                              name="work-order-status"
                              aria-label="Completed"
                            />
                          }
                          label="Completed"
                          labelPlacement="top"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Button color="inherit" onClick={this.sendAlert}>
                      Submit
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

WorkOrders.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WorkOrders);
