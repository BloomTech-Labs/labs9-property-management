import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase, { FirebaseContext } from './components/firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://property-management-dev.herokuapp.com/'
    : 'http://localhost:4000';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <App />
    </Router>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
