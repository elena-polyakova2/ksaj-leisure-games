import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 10px 10px;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 400px) {
    height: 40px;
    padding: 5px 5px;
    margin-bottom: 20px;
    display: inline-flex;
  }
`;

export const LogoContainer = styled(Link)`
height: 100%;
width: 70px;
padding: 25px;

@media screen and (max-width: 800px) {
  width: 20px;
  height: 20%;
  padding: 0px;
}

@media screen and (max-width: 400px) {
  display: inline-flex;
  
  .logo {
    width: 25vw;
    float: initial;
  }
}
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    width: 80%;
  }

  @media (max-width: 400px) {
    display: inline-flex;
  }
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;

  @media (max-width: 400px) {
    padding: 10px 5px;
    display: inline-flex;
  }
`;
