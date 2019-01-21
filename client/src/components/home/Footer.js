import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.div`
  width: 100%;
  padding: 50px 0;
  height: 200px;
  z-index: 100;
  background: #1d2229;
  bottom: 0;
`;
// const WaveBottom = styled.div`
//   width: 100%;
//   bottom: 0;
// `;

const WaveTop = styled.div`
  width: 100%;
  top: 0;
  height: 100px;
  transform: rotate(180deg);
`;
const FooterGroup = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 1fr) repeat(3, 10rem) 1fr;
  align-items: center;
  grid-template-rows: 100px 1fr;
  margin: 0 auto;
  max-width: 800px;
  font-weight: 500;
  padding: 0 2rem;
  @media (max-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.6rem;
  display: grid;
  justify-items: ${props => (props.justifystart ? 'start' : 'end')};
  @media (max-width: 600px) {
    display: ${props => props.mobiledisplaynone && 'none'};
    justify-items: center;
  }
  &.justifyCenter {
    justify-items: center;
  }
`;
const SocialLink = styled(Link)`
  justify-self: end;
  font-weight: 500;
  font-size: 1.6rem;
  text-decoration: none;
  color: white;
  @media (max-width: 600px) {
    justify-self: center;
  }
`;

const Footer = () => (
  <>
    <FooterContainer>
      <WaveTop>
        <svg
          width="100%"
          height="172"
          viewBox="0 0 100% 172"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="#FFFFFF">
            <animate
              repeatCount="indefinite"
              fill="freeze"
              attributeName="d"
              dur="20s"
              values="M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z; 

              M0 87.1596C316 87.1597 444 160 884 52.0001C1324 -55.9999 1320.29 34.966 1538 71.251C1814 117.251 2156 189.252 2560 87.1597V233.161L0 233.161V87.1596Z;

              M0 53.6584C158 11.0001 213 0 363 0C513 0 855.555 115.001 1154 115.001C1440 115.001 1626 -38.0004 2560 53.6585V199.66L0 199.66V53.6584Z;

              M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z
              "
            />
          </path>
        </svg>
      </WaveTop>
      <FooterGroup>
        <FooterLink justifystart="true" mobiledisplaynone="true" to="/">
          Home
        </FooterLink>
        <FooterLink className="justifyCenter" to="/">
          Terms
        </FooterLink>
        <FooterLink className="justifyCenter" to="/">
          Privacy
        </FooterLink>
        <FooterLink className="justifyCenter" to="/">
          Contact
        </FooterLink>
        <SocialLink to="/">Social</SocialLink>
      </FooterGroup>
    </FooterContainer>
  </>
);

export default Footer;
