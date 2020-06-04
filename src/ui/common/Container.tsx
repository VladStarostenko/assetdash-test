import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  max-width: 1210px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  @media(max-width: 600px) {
    padding: 0 12px;
  }
`;
