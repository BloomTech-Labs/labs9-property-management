import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Logo } from '../home/Nav';

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

export const BackToHomeLink = styled(Link)`
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: rgba(73, 76, 87, 1);
  padding: 10px;
  text-decoration: none;
`;

export const LoginOrSignupFormLink = styled.span`
  color: #5f29ff;
`;

export const AuthLogo = styled(Logo)`
  width: 32px;
  margin-left: 12px;
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
