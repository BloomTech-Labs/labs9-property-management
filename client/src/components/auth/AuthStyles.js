import styled from "styled-components";
import { Link } from "react-router-dom";

// put arrow and logo inside link that is inside a BacktoHomeGroup
// then add a max-width on the container of 800px to match nav 

export const BackToHomeContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  justify-content: start;
  padding: 32px;
`;

export const BackToHomeLink = styled(Link)`
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: rgba(73, 76, 87, 1);
  padding: 10px;
  text-decoration: none;
`;
