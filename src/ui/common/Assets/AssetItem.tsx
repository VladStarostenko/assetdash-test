import React from 'react';
import styled from 'styled-components';
import { Tr, Td } from '../Table/Table';
import angleIcon from '../../../assets/icons/angle-down-bright.svg';

interface AssetItemProps {
  asset: any
}

export const AssetItem = (props: AssetItemProps) => {
  const {
    position,
    dailyDash,
    icon,
    name,
    symbol,
    marketCap,
    price,
    change,
    weeklyDash,
    monthlyDash,
    quarterlyDash,
  } = props.asset;

  return (
    <Tr>
      <Td>{position}</Td>
      <Td>
        <Dash direction="down">{dailyDash}</Dash>
      </Td>
      <Td>
        <AssetName>
          <img src={icon} alt={`${name} logo`}/>
          {name}
        </AssetName>
      </Td>
      <Td>{symbol}</Td>
      <Td>${marketCap}</Td>
      <Td>${price}</Td>
      <Td>
        <Change isPositive>{change}</Change>
      </Td>
      <Td>
        <Dash direction="down">{weeklyDash}</Dash>
      </Td>
      <Td>
        <Dash direction="down">{monthlyDash}</Dash>
      </Td>
      <Td>
        <Dash direction="down">{quarterlyDash}</Dash>
      </Td>
    </Tr>
  );
};

interface DashProps {
  direction: 'up' | 'down'
}

const Dash = styled.p<DashProps>`
  position: relative;
  display: inline-block;
  padding-left: 22px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 10px;
    height: 6px;
    background: url(${angleIcon}) no-repeat center;
    background-size: contain;
  }
`;

const AssetName = styled.p`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #1F3840;

  img {
    margin-right: 8px;
  }
`;

interface ChangeProps {
  isPositive: boolean
}

const Change = styled.span<ChangeProps>`
  color: ${({ isPositive }) => isPositive ? '#24BD8F' : '#BD4924'};
`;
