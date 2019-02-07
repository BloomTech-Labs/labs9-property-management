import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Loading from '../../loading/Loading';
import EmptyPage from '../../emptypage/EmptyPage';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    marginTop: 5,
    marginBottom: 25,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    overflowX: 'auto',
  },
  customWidth: {
    width: '15%',
    margin: 0,
    padding: 0,
  },
  descriptionWidth: {
    width: '55%',
    margin: 0,
    padding: 0,
  },
  emptyPage: {
    padding: theme.spacing.unit * 3,
  },
});

const MaintenanceTable = props => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography variant="h6">Request History</Typography>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.customWidth} align="center">
              Request ID
            </TableCell>
            <TableCell className={classes.customWidth} align="center">
              Property Name
            </TableCell>
            <TableCell className={classes.descriptionWidth} align="center">
              Description
            </TableCell>
            <TableCell className={classes.customWidth} align="center">
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!props.orderLoading && props.orders.length > 0
            ? props.orders.map(order => (
                <TableRow key={order.work_order_id}>
                  <TableCell component="th" scope="row" align="center">
                    {order.work_order_id}
                  </TableCell>
                  <TableCell align="center">{order.property_name}</TableCell>
                  <TableCell align="center">{order.description}</TableCell>
                  <TableCell align="center">
                    {order.work_order_status}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      {props.orderLoading ? (
        <Loading className={classes.loader} size={40} />
      ) : props.orders.length === 0 ? (
        <EmptyPage
          className={classes.emptyPage}
          variant="h4"
          message="No Requests"
        />
      ) : null}
    </Paper>
  );
};

MaintenanceTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaintenanceTable);
