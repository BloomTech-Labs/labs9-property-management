import React from 'react';
import { Link } from 'react-router-dom';
import testlogo from '../../images/test-logo.svg';
// import leasefrontblack from '../../images/leasefront-black.svg';
// import leasefrontcap from '../../images/leasefront-capital.svg';
// import logoplaceholder from '../../images/name.svg';
import styled from 'styled-components';
import MobileNav from './MobileNav';
import { KeyboardBackspace } from '@material-ui/icons';

const SignUpArrow = styled(KeyboardBackspace)`
  color: #5f29ff;
  transform: rotate(180deg);
  margin-left: 4px;
  font-size: 20px !important;
`;
export const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  padding: ${props => (props.scrolled ? `20px 0` : `40px 0`)};
  z-index: 10000;
  background: ${props => (props.scrolled ? `white` : null)};
  box-shadow: ${props =>
    props.scrolled ? `rgba(72, 76, 87, 0.1) 0px 1px 3px` : null};
  transition: 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
`;
export const Logo = styled.img`
  justify-self: start;
  @media (max-width: 500px) {
    margin-left: ${props => props.marketingpages && '2rem'};
  }
`;
const MobileMenuLink = styled.span`
  justify-self: end;
  color: #874ef4;
  font-weight: 500;
  font-size: 1.6rem;
  text-decoration: none;
  display: none;
  cursor: pointer;
  @media (max-width: 500px) {
    display: ${props => (props.mobile ? 'flex' : 'none')};
    margin-right: 2rem;
  }
`;
const SignUpLink = styled(Link)`
  justify-self: center;
  color: #5f29ff;
  font-weight: 500;
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  text-decoration: none;
  @media (max-width: 500px) {
    display: ${props => (props.desktop ? 'none' : 'relative')};
    padding: 0 2rem;
  }
`;
export const HeaderGroup = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 1fr) repeat(4, 10rem);
  align-items: center;
  margin: 0 auto;
  max-width: 800px;
  font-weight: 500;
  @media (max-width: 860px) {
    padding: 0 2rem;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
    padding: 0;
  }
`;
export const HeaderLink = styled(Link)`
  color: rgba(73, 76, 87, 1);
  text-decoration: none;
  font-weight: 500;
  display: grid;
  justify-items: center;
  font-size: 1.6rem;
  @media (max-width: 500px) {
    display: ${props => (props.desktop ? 'none' : 'relative')};
  }
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasScrolled: false,
      menuIsOpen: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = event => {
    const scrollTop = window.pageYOffset;

    if (scrollTop > 32) {
      this.setState({ hasScrolled: true });
    } else {
      this.setState({ hasScrolled: false });
    }
  };

  handleMenuToggle = event => {
    this.setState(prevState => ({ menuIsOpen: !prevState.menuIsOpen }));
  };

  // Removed onClick={this.handleMenuToggle} from menu until polished
  render() {
    return (
      <>
        <HeaderContainer scrolled={this.state.hasScrolled}>
          <HeaderGroup>
            {!this.state.menuIsOpen && (
              <HeaderLink to="/">
                <Logo marketingpages src={testlogo} alt="logo" width="32" />
              </HeaderLink>
            )}
            {this.state.menuIsOpen ? (
              <MobileNav handleMenuToggle={this.handleMenuToggle} />
            ) : (
              <>
                <HeaderLink desktop="true" to="/">
                  Product
                </HeaderLink>
                <HeaderLink desktop="true" to="/pricing">
                  Pricing
                </HeaderLink>
                <HeaderLink desktop="true" to="/login">
                  Login
                </HeaderLink>
                <SignUpLink desktop="true" to="/signup">
                  Sign Up
                  <SignUpArrow />
                </SignUpLink>
                {/* <MobileMenuLink onClick={""} mobile>
                  Menu
                </MobileMenuLink> */}
                <MobileMenuLink onClick={this.handleMenuToggle} mobile>
                  Menu
                </MobileMenuLink>
              </>
            )}
          </HeaderGroup>
        </HeaderContainer>
      </>
    );
  }
}

export default Header;
