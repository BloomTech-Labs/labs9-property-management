import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from "@material-ui/core/Button";

const styles = {
    root: {
      flexGrow: 1,
    },
  };


class FirebaseStorage extends Component{
  constructor() {
    

    const storage = app.storage();
    const storageRef = storage.ref();
    this.uploadTask = storageRef.child('images/mountains.jpg' + file.name).put(file);
  }
  state = {
    completed: 0,
    buffer: 10,
  };

  //============Storage API============

//Begin upload
startUpload = () => this.uploadTask();

// Pause the upload
pauseUpload = () => this.uploadTask.pause();

// Resume the upload
resumeUpload = () => this.uploadTask.resume();

// Cancel the upload
cancelUpload = () => this.uploadTask.cancel();

componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed > 100) {
      this.setState({ completed: 0, buffer: 10 });
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
    }
  };

  render() {
    const { classes } = this.props;
    const { completed, buffer } = this.state;
    return (
        <>
      <div className={classes.root}>
        <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
        <br />
        <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer} />
      </div>    
      <Button
        variant="contained"
        component="label"
      >
         Upload File
      <input
        type="file"
        style={{ display: "none" }}
        multiple onchange={"processSelectedFiles(this)"}
      />
     </Button>
      </>
    );
  }

}

FirebaseStorage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles) (FirebaseStorage);