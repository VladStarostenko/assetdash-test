import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
`;

export const Th = styled.th`
  padding: 0 18px;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
  color: ${({ theme }) => theme.colors.colorSecondary};
  white-space: nowrap;

  &:first-child {
    padding-left: 24px;
  }
  &:last-child {
    padding-right: 24px;
  }
`;

export const Td = styled.td`
  padding: 18px;
  vertical-align: middle;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: ${({ theme }) => theme.colors.colorPrimary};
  background: ${({ theme }) => theme.colors.backgroundPrimary};

  &:first-child {
    padding-left: 24px;
  }
  &:last-child {
    padding-right: 24px;
  }
`;

export const Tr = styled.tr`
  & ${Td}:first-child {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  & ${Td}:last-child {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  & ${Th}:nth-child(3) {
    text-align: left;
  }

  & ${Td}:nth-child(3) {
    text-align: left;
  }
`;
