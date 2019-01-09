import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: 400,
    minHeight: 384
  },
  actions: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: theme.spacing.unit,
    padding: 0
  }
});

class Properties extends React.Component {
  render() {
    console.log(this.props);
    const { classes } = this.props;

    return (
      <Grid item xs={12} md={4}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Add New Property
            </Typography>
            <CardActions className={classes.actions}>
              <IconButton
                color="primary"
                classeName={classes.button}
                aria-label="Add a new property"
              >
                <AddCircleIcon />
              </IconButton>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

Properties.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Properties);
