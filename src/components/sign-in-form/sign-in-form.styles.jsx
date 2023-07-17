import styled from 'styled-components';

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }
  
  @media screen and (max-width: 800px) {
  width: 80vw;
  align-items: center;
  justify-content: center;
}
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  
  @media screen and (max-width: 800px) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 15px; 
}
`;


