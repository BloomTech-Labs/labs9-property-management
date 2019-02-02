import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  detailedViewModal: {
    width: '90%',
    marginTop: 50,
    height: '80vh',
    marginLeft: '50%',
    transform: 'translateX(-50%)',
    padding: theme.spacing.unit * 3,
    overflowY: 'scroll',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.up('md')]: {
      width: '40%',
    },
  },
  title: {
    padding: theme.spacing.unit * 2,
  },
});

const PropertyModal = props => {
  const { classes, property } = props;

  if (property === null) {
    return <></>;
  }

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Paper className={classes.detailedViewModal}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Tooltip title="Close">
              <IconButton onClick={props.onClose}>
                <Close />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Typography
              className={classes.title}
              component="h6"
              align="center"
              variant="h4"
            >
              {property.property_name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Address"
                  secondary={`${property.address}
                 ${property.city}, ${property.state} ${property.zip_code}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Bedrooms"
                  secondary={property.bedrooms}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Bathrooms"
                  secondary={property.bathrooms}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Square Footage"
                  secondary={property.square_footage}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Year Built"
                  secondary={property.year_built}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Office Phone:"
                  secondary={property.offic_ph}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Maintanence Phone:"
                  secondary={property.maintanence_ph}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid />
          <Grid item xs={12} sm={6}>
            <List>
              {property.tenants.length > 0
                ? property.tenants.map((tenant, index) => (
                    <div key={index}>
                      <ListItem>
                        <ListItemText
                          primary="Tenant"
                          secondary={tenant.display_name}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Lease"
                          secondary={`${tenant.lease_start_date} - ${
                            tenant.lease_end_date
                          }`}
                        />
                      </ListItem>
                    </div>
                  ))
                : null}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default withStyles(styles)(PropertyModal);
