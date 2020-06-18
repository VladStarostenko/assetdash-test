import styled from 'styled-components';

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${({theme}) => theme.colors.backgroundPrimary};
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid;
  border-color: ${({theme}) => theme.colors.borderPrimary};
  border-radius: 2px;
  cursor: pointer;

  @media(max-width: 600px) {
    width: 36px;
    height: 36px;
  }
`;
