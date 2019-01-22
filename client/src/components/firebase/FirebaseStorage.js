import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import React, { Component } from "react";
import PropTypes from 'prop-types';

  // class FirebaseStorage extends Component{
  //   constructor() {
      

  //     const storage = app.storage();
  //     const storageRef = storage.ref();
  //     this.uploadTask = storageRef.child('images/mountains.jpg' + file.name).put(file);
  //   }

  //   //============Storage API============

  // //Begin upload
  // startUpload = () => this.uploadTask();

  // // Pause the upload
  // pauseUpload = () => this.uploadTask.pause();

  // // Resume the upload
  // resumeUpload = () => this.uploadTask.resume();

  // // Cancel the upload
  // cancelUpload = () => this.uploadTask.cancel();

  //   render() {

  //     return (

  //     );
  //   }

  // }

  // export default FirebaseStorage;