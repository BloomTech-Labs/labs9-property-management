import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MobileNavContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: white;
  z-index: 1000;
  margin: 0 auto;
  padding: 0 4rem;
  overflow: auto;
`;
const MobileNavGroup = styled.div`
  display: flex;
  justify-content: center;
  justify-self: ${props => (props.close ? 'flex-start' : 'center')};
  flex-direction: column;
  align-items: center;
  font-weight: 500;
`;

const PageLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 80vh;
  flex-direction: column;
`;

const MobileLink = styled(Link)`
  color: rgba(73, 76, 87, 1);
  text-decoration: none;
  padding: ${props => (props.close ? '1rem' : '2rem')};
  font-weight: ${props => (props.close ? '500' : '700')};
  text-align: left;
  cursor: pointer;
  font-size: ${props => (props.close ? '2.4rem' : '3.6rem')};
  color: rgba(22, 23, 26, 1);
`;
const CloseNav = styled.span`
  background: none;
  border: none;
  cursor: pointer;
  color: #874ef4;
  font-weight: 500;
  font-size: 1.6rem;
  text-decoration: none;
`;

class MobileNav extends React.Component {
  render() {
    return (
      <MobileNavContainer>
        <MobileNavGroup close>
          <CloseNav close onClick={() => this.props.handleMenuToggle()}>
            Close
          </CloseNav>
        </MobileNavGroup>
        <PageLinkContainer>
          <MobileNavGroup>
            <MobileLink onClick={() => this.props.handleMenuToggle()} to="/">
              Home
            </MobileLink>
            <MobileLink
              onClick={() => this.props.handleMenuToggle()}
              to="/pricing"
            >
              Pricing
            </MobileLink>
            <MobileLink
              onClick={() => this.props.handleMenuToggle()}
              to="/login"
            >
              Login
            </MobileLink>
            <MobileLink
              onClick={() => this.props.handleMenuToggle()}
              to="/signup"
            >
              Signup
            </MobileLink>
          </MobileNavGroup>
        </PageLinkContainer>
      </MobileNavContainer>
    );
  }
}

export default MobileNav;
