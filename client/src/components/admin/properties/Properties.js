import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import {
  Edit,
  Delete,
  Home,
  Person,
  DateRange,
  CheckCircleOutline,
  Close
} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import AddPropertyCard from "./AddPropertyCard";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  container: {
    marginTop: 100,
    marginLeft: 0
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
  displayNone: {
    display: "none"
  },
  paper: {
    width: "80%",
    height: "80vh",
    margin: "auto",
    marginTop: 50
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  }
});

class Properties extends React.Component {
  state = {
    detailedViewOn: false,
    selectedProperty: {},
    editModalOpen: false,
    trashModalOpen: false,
    properties: [
      {
        id: 1,
        address: "171 N 600 E Provo, UT 84606",
        tenants: ["Laura Carver", "Tyler Carver"],
        leaseDate: "6/13/17-6/23/18",
        contract: true
      },
      {
        id: 2,
        address: "171 N 600 E Provo, UT 84606",
        tenants: ["Laura Carver", "Tyler Carver"],
        leaseDate: "6/13/17-6/23/18",
        contract: true
      },
      {
        id: 3,
        address: "171 N 600 E Provo, UT 84606",
        tenants: ["Laura Carver", "Tyler Carver"],
        leaseDate: "6/13/17-6/23/18",
        contract: true
      },
      {
        id: 4,
        address: "171 N 600 E Provo, UT 84606",
        tenants: ["Laura Carver", "Tyler Carver"],
        leaseDate: "6/13/17-6/23/18",
        contract: true
      },
      {
        id: 5,
        address: "171 N 600 E Provo, UT 84606",
        tenants: ["Laura Carver", "Tyler Carver"],
        leaseDate: "6/13/17-6/23/18",
        contract: true
      }
    ]
  };

  viewMore = event => {
    console.log(event.currentTarget.getAttribute("data-id"));

    if (
      this.state.detailedViewOn !== true &&
      this.state.selectedProperty.id !==
        this.state.properties[event.currentTarget.getAttribute("data-id")]
    ) {
      this.setState({ detailedViewOn: true });
    }
  };

  closeDetailedView = () => {
    this.setState({ detailedViewOn: false });
  };

  toggleEditProperty = () => {
    this.setState({ editModalOpen: !this.state.editModalOpen });
  };

  toggleRemoveProperty = () => {
    this.setState({ trashModalOpen: !this.state.trashModalOpen });
  };

  render() {
    console.log(this.props);
    const { classes } = this.props;

    return (
      <main>
        <Grid container className={classes.container} spacing={16}>
          <Grid item xs={12} lg={this.state.detailedViewOn ? 8 : 12}>
            <Grid container justify="center" spacing={16}>
              {this.state.properties.map((entry, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={this.state.detailedViewOn ? 6 : 4}
                >
                  <Card className={classes.card}>
                    <CardActions
                      className={classes.actions}
                      disableActionSpacing
                    >
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="Edit Property"
                          onClick={this.toggleEditProperty}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="Delete Property"
                          onClick={this.toggleRemoveProperty}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
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
                            secondary={entry.tenants.join(", ")}
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
                      <Grid container justify="center">
                        <Button
                          data-id={index}
                          onClick={this.viewMore}
                          variant="outlined"
                        >
                          View More Info
                        </Button>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <AddPropertyCard detailedViewOn={this.state.detailedViewOn} />
            </Grid>
          </Grid>
          <Grid
            item
            xs={4}
            className={this.state.detailedViewOn ? "" : classes.displayNone}
          >
            <Grid container>
              <Tooltip title="Close">
                <IconButton onClick={this.closeDetailedView}>
                  <Close />
                </IconButton>
              </Tooltip>
            </Grid>
            <Modal
              open={this.state.editModalOpen}
              onClose={this.toggleEditProperty}
            >
              <Paper className={classes.paper}>
                <Typography variant="h5" component="p">
                  Edit
                </Typography>
              </Paper>
            </Modal>
            <Modal
              open={this.state.trashModalOpen}
              onClose={this.toggleRemoveProperty}
            >
              <Paper className={classes.paper}>
                <Typography variant="h5" component="p">
                  Remove
                </Typography>
              </Paper>
            </Modal>
          </Grid>
        </Grid>
      </main>
    );
  }
}

Properties.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Properties);
