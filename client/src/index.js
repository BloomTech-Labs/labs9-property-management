import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
