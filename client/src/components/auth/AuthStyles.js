import styled from "styled-components";
import { Link } from "react-router-dom";

export const BackToHomeContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  justify-content: start;
`;

export const BackToHomeLink = styled(Link)`
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: rgba(73, 76, 87, 1);
  padding: 10px;
  text-decoration: none;
`;
