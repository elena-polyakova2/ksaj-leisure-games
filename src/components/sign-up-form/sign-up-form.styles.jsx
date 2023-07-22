import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  justify-content: center;

  h2 {
    margin: 10px 0;
  }

  @media screen and (max-width: 800px) {
    align-items: center;
    justify-content: center;
    width: 90vw;
  }
`;