import React from "react";
import { Link } from "react-router-dom";
import testlogo from "../../images/test-logo.svg";
import styled from "styled-components";
import MobileNav from "./MobileNav";

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
`;
const MobileMenuLink = styled.span`
  justify-self: end;
  color: #874ef4;
  font-weight: 500;
  font-size: 1.6rem;
  text-decoration: none;
  display: none;
  @media (max-width: 500px) {
    display: ${props => (props.mobile ? "flex" : "none")};
  }
`;
const SignUpLink = styled(Link)`
  justify-self: center;
  color: #5f29ff;
  font-weight: 500;
  font-size: 1.6rem;
  text-decoration: none;
  @media (max-width: 500px) {
    display: ${props => (props.desktop ? "none" : "relative")};
  }
`;
export const HeaderGroup = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 1fr) repeat(4, 10rem);
  align-items: center;
  margin: 0 auto;
  padding: 0 2rem;
  max-width: 800px;
  font-weight: 500;
  @media (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
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
    display: ${props => (props.desktop ? "none" : "relative")};
  }
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasScrolled: false,
      menuIsOpen: false
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
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
            <HeaderLink to="/">
              <Logo src={testlogo} alt="logo" width="32" />
            </HeaderLink>
            {this.state.menuIsOpen ? (
              <MobileNav handleMenuToggle={this.handleMenuToggle} />
            ) : (
              <>
                <HeaderLink desktop to="/product">
                  Product
                </HeaderLink>
                <HeaderLink desktop to="/pricing">
                  Pricing
                </HeaderLink>
                <HeaderLink desktop to="/login">
                  Login
                </HeaderLink>
                <SignUpLink desktop to="/signup">
                  Sign Up
                </SignUpLink>
                <MobileMenuLink onClick={""} mobile>
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
