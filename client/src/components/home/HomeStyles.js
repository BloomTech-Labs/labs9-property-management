import styled, { keyframes } from 'styled-components';

const HeroAnimation = keyframes`
0% {
  opacity: 0;
  transform: translateY(5px);
}
100% {
  opacity: 1;
  transform: translateY(0px);
}
`;
export const LogoAnimation = keyframes`
 0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
`;
// Hero
export const Hero = styled.div`
  background: white;
`;
export const HeroGroup = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding: ${props =>
    props.pricing ? '175px 50px 0px 50px' : '175px 50px 75px'};
  text-align: center;
  @media (max-width: 600px) {
    margin: 0 auto;
    padding: ${props =>
      props.pricing ? '150px 24px 24px 24px' : '150px 24px 48px 24px'};
    text-align: center;
  }
`;
export const HeroSplit = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  justify-items: center;
`;
export const HeroGroupH1 = styled.h1`
  margin: 0;
  color: rgba(22, 23, 26, 1);
  font-size: 4.8rem;
  line-height: 1.2;
  opacity: 0;
  animation: ${HeroAnimation};
  animation-duration: 2s;
  animation-delay: 0.01s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  @media (max-width: 600px) {
    font-size: 3.6rem;
  }
`;
export const HeroP = styled.p`
  color: rgba(73, 76, 87, 1);
  line-height: 1.4;
  font-weight: 400;
  font-size: 2rem;
  padding: 0 0 16px 0;
  animation: ${HeroAnimation} 2s 0.2s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
  opacity: 0;
`;
export const HeroA = styled.button`
  font-size: 1.6rem;
  font-weight: 600;
  color: white;
  text-transform: none;
  background: #5f29ff;
  box-shadow: 0 2px 0 0 #6416d0;
  padding: 1.6rem 2.4rem 1.4rem;
  text-decoration: none;
  border-radius: 4px;
  outline: none;
  border: none;
  opacity: 0;
  cursor: pointer;
  animation: ${HeroAnimation};
  animation-duration: 2s;
  animation-delay: 0.04s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  transition: 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  &:hover {
    transform: translateY(-1px);
    background: #4d1fd6;
  }
`;

export const AppImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const AppImage = styled.img`
  max-width: 100%;
  width: 704px;
  padding: 0 24px 76px 24px;
  @media (max-width: 600px) {
    padding: 0px 24px 100px 24px;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0 48px 0;
`;

export const IconContainer = styled.div`
  font-size: 60px;
  padding: 0 30px 30px 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 300px;
  color: #5f29ff;
  flex-wrap: wrap;
  text-align: left;
  max-width: 960px;
  @media (max-width: 900px) {
    margin-bottom: 40px;
  }
`;

export const IconGroup = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: top;
  @media (max-width: 900px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const HeroGroupH3 = styled.h3`
  margin: 30px 0;
  color: rgba(22, 23, 26, 1);
  font-size: 2rem;
  line-height: 1.2;
  opacity: 0;
  padding-bottom: 0;
  animation: ${HeroAnimation};
  animation-duration: 2s;
  animation-delay: 0.01s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  @media (max-width: 900px) {
    font-size: 1.8rem;
  }
`;

export const HeroP2 = styled.p`
  color: rgba(73, 76, 87, 1);
  line-height: 1.4;
  font-weight: 400;
  font-size: 1.6rem;
  padding: 0 5px;
  margin: 0;
  animation: ${HeroAnimation} 2s 0.2s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
  opacity: 0;
  line-height: 30px;
`;
// End Hero
