import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft: 20,
    marginRight: 20,
  },
  customWidth: {
    margin: 0,
    padding: 0,
  },
});

const InviteTable = props => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography variant="h6">Invitations</Typography>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.customWidth} align="center">
              Owner
            </TableCell>
            <TableCell className={classes.customWidth} align="center">
              Property
            </TableCell>
            <TableCell className={classes.customWidth} align="center">
              Lease Start
            </TableCell>
            <TableCell className={classes.customWidth} align="center">
              Lease End
            </TableCell>
            <TableCell className={classes.customWidth} align="center">
              Action
            </TableCell>
            <TableCell className={classes.customWidth} align="center">
              Contract
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.invites.map(invite => (
            <TableRow key={invite.id}>
              <TableCell component="th" scope="row" align="center">
                {invite.display_name}
              </TableCell>
              <TableCell align="right">{invite.property_name}</TableCell>
              <TableCell align="right">{invite.lease_start_date}</TableCell>
              <TableCell align="right">{invite.lease_end_date}</TableCell>
              <TableCell align="right">
                <Button
                  color="primary"
                  data-id={invite.id}
                  onClick={props.acceptInvite}
                >
                  Accept
                </Button>
                <Button>Decline</Button>
              </TableCell>
              <TableCell align="left">
                <Typography variant="inherit">
                  <a
                    href={invite.lease_contract}
                    style={{ textDecoration: 'none' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

InviteTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InviteTable);
