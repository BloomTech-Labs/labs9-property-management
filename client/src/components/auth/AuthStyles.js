import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Logo } from '../home/Nav';
import { KeyboardBackspace } from '@material-ui/icons';
// put arrow and logo inside link that is inside a BacktoHomeGroup
// then add a max-width on the container of 800px to match nav

export const BackToHomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 0;
  @media (max-width: 800px) {
    padding: 32px 20px;
  }
`;

export const BackArrow = styled(KeyboardBackspace)`
  font-size: 20px !important;
`;

export const BackToHomeLink = styled(Link)`
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: rgba(73, 76, 87, 1);
  padding: 10px 10px 10px 0px;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const LoginOrSignupFormLink = styled.span`
  color: #5f29ff;
  margin-left: 5px;
`;

export const AuthLogo = styled(Logo)`
  width: 32px;
  margin-left: 8px;
`;

export const StyledH1 = styled.h1`
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #222;
  font-size: 1.6rem;
`;

export const GoogleContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const GoogleLogo = styled.img`
  padding-right: 8px;
`;
