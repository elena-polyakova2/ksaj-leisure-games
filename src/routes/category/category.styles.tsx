import styled from 'styled-components';

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
  justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 800px) {
    align-items: center;
    justify-content: center;
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
    row-gap: 25px;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;
    row-gap: 25px;
  }
`;

export const Title = styled.h2`
  font-size: 38px;
  margin-bottom: 25px;
  text-align: center;

  @media screen and (max-width: 800px) {
    font-size: 25px;
  }
`;