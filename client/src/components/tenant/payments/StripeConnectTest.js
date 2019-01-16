import React from "react";
import connectwstripe from "../../../images/connect-with-stripe@2x.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StripeButton = styled.img`
  width: 144px;
`;

const StripeConnectTest = () => (
  <Link
    target="_blank"
    to={"//connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_ELLhp2vnlFHBpk0AVDL7PVxBzrsk2NXz&scope=read_write"}
  >
    <StripeButton src={connectwstripe} />
  </Link>
);

export default StripeConnectTest;
