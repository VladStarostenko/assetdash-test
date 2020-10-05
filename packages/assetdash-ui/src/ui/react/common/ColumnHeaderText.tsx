import styled from 'styled-components';

export const ColumnHeaderText = styled.p`
 &.asc,
 &.desc {
    position: relative;
    color: ${({theme}) => theme.colors.colorPrimary};
  }
`;
