import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Authenticate from "./components/auth/Authenticate";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

const Auth = Authenticate(App);

ReactDOM.render(
  <Router>
    <Auth />
  </Router>,
  document.getElementById("root")
);
