import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  height: 48px;
  margin-top: 8px;
  padding: 14px 16px 15px;
  font-size: 16px;
  line-height: 19px;
  color: ${({theme}) => theme.colors.colorPrimary};
  background: ${({theme}) => theme.colors.backgroundPrimary};
  border: 1px solid;
  border-color: ${({theme}) => theme.colors.borderPrimary};
  border-radius: 2px;

  &:focus {
    border: 1px solid #21CE99;
  }

  &:active {
    border: 1px solid #21CE99;
  }
`;
