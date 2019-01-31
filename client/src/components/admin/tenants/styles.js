const styles = theme => ({
  container: {
    marginTop: 75,
    marginLeft: 0,
  },
  header: {
    marginBottom: theme.spacing.unit * 5,
  },
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    marginTop: 25,
    position: 'relative',
    overflow: 'visible',
    minWidth: '40%',
    minHeight: 350,
    zIndex: 0,
  },
  textField: {
    marginTop: '25px',
    width: '90%',
  },
  longCard: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    minWidth: '80%',
    minHeight: 350,
    zIndex: 0,
    marginTop: 50,
  },
  cardTop: {
    padding: '15px',
    width: '90%',
    backgroundColor: '#5f29ff',
    zIndex: '2000',
    top: '-6%',
    left: '50%',
    transform: 'translateX(-50%)',
    position: 'absolute',
    boxShadow:
      '0px 5px 5px -3px rgba(81,71,255,0.2), 0px 8px 10px 1px rgba(81,71,255,0.2), 0px 3px 14px 2px rgba(81,71,255,0.2)',
    borderRadius: '4px',
    color: 'white',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  displayNone: {
    display: 'none',
  },
  paper: {
    width: '80%',
    height: '80vh',
    margin: 'auto',
    marginTop: 50,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

export default styles;
