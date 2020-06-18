import styled from 'styled-components';

export const ButtonTertiary = styled.button`
  height: 48px;
  padding: 0 19px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 2px;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.colorPrimary};
  border: none;
`;
