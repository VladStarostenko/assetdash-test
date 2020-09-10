import styled from 'styled-components';
import angleIcon from '../../../assets/icons/angle.svg';

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
  color: ${({theme}) => theme.colors.colorSecondary};
  white-space: nowrap;
  cursor: pointer;

  &:first-child {
    padding-left: 24px;
  }
  &:last-child {
    padding-right: 24px;
  }

  &:nth-child(3) {
    text-align: left;
  }
  &:nth-child(4) {
    text-align: left;
  }

  &.asc,
  &.desc {
    position: relative;
    color: ${({theme}) => theme.colors.colorPrimary};
  }

  &.asc::after,
  &.desc::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: 8px;
    height: 5px;
    transform: translate(0, -50%);
    background: url(${angleIcon}) center no-repeat;
    background-size: contain;
  }
  &.asc::after {
    transform: translate(0, -50%) rotate(180deg);
  }
`;

export const Td = styled.td`
  padding: 18px;
  vertical-align: middle;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: ${({theme}) => theme.colors.colorPrimary};
  background: ${({theme}) => theme.colors.backgroundPrimary};

  &:first-child {
    padding-left: 24px;
  }
  &:last-child {
    padding-right: 24px;
  }

  &:nth-child(3) {
    text-align: left;
  }
  &:nth-child(4) {
    text-align: left;
  }

  @media(max-width: 990px) {
    font-size: 14px;
    line-height: 17px;
  }
`;

export const TdRank = styled(Td)`
  background: ${({theme}) => theme.colors.backgroundSecondary};
  padding: 8px;
  font-size: 10px;
  color: ${({theme}) => theme.colors.colorSecondary};

  @media(max-width: 990px) {
    font-size: 18px;
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
