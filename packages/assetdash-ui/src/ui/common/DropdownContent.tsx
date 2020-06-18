import styled from 'styled-components';

export const DropdownContent = styled.ul`
  position: absolute;
  right: 0;
  bottom: -15px;
  transform: translateY(100%);
  width: 254px;
  max-height: 544px;
  padding: 8px;
  background: ${({theme}) => theme.colors.sortCheckboxBackground};
  border: 1px solid;
  border-color: ${({theme}) => theme.colors.borderSecondary};
  box-shadow: ${({theme}) => theme.colors.boxShadowSecondary};
  border-radius: 2px;
  overflow-y: auto;
  z-index: 1;
`;
