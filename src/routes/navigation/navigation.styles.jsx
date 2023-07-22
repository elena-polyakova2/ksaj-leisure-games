import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 800px) {
    height: 50px;
    padding: 10px 10px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 400px) {
    height: 40px;
    padding: 5px 5px; 
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;

  @media screen and (max-width: 800px) {
    padding: 5px;

    .logo {
      width: 10vw;
      height: auto;
    }
  } 
  
  @media screen and (max-width: 800px) {
    padding-left: unset;
  }
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 800px) {
    width: 90%;
  }

  @media (max-width: 300px) {
    width: 100%;  
    font-size: 12px;  
  }
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;

  @media (max-width: 300px) {
    padding: 5px; 
  }
`;

