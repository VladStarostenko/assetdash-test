import styled from 'styled-components';

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;

  @media(max-width: 600px) {
    display: none;
  }
`;
