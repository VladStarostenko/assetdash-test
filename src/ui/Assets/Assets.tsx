import React from 'react';
import styled from 'styled-components';
import { Table, Th } from '../common/Table/Table';
import { AssetItem } from './AssetItem';
import { ButtonTertiary } from '../common/Button/ButtonTertiary';
import bitcoinIcon from '../../assets/icons/crypto/bitcoin.svg';
import ethereumIcon from '../../assets/icons/crypto/ethereum.svg';
import chainlinkIcon from '../../assets/icons/crypto/chainlink.svg';
import rippleIcon from '../../assets/icons/crypto/ripple.svg';
import { Tabs, TabsProps } from '../common/Tabs';
import { Container } from '../common/Container';
import { ButtonArrow } from '../common/Button/ButtonArrow';
import { ButtonsRow } from '../common/Button/ButtonsRow';

export const Assets = (props: TabsProps) => {
  return (
    <>
      <Container>
        <ButtonsRow>
          <Tabs {...props}/>
          <TableButtons>
            <ButtonArrow direction="right">
              Next 100
            </ButtonArrow>
            <ButtonTertiary>View all</ButtonTertiary>
          </TableButtons>
        </ButtonsRow>
      </Container>
      <AssetsView>
        <Table>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>Daily Dash</Th>
              <Th>Asset Name</Th>
              <Th>Symbol</Th>
              <Th>Market Cap</Th>
              <Th>Price</Th>
              <Th>Today</Th>
              <Th>Weekly Dash</Th>
              <Th>Monthly Dash</Th>
              <Th>Quarterly Dash</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {placeholderData.map((asset, index) => <AssetItem key={index} asset={asset}/>)}
          </tbody>
        </Table>
      </AssetsView>
    </>
  );
};

const placeholderData = [
  {
    position: 1,
    icon: bitcoinIcon,
    dailyDash: 2,
    name: 'Bitcoin',
    symbol: 'BTC',
    marketCap: 186056893398,
    price: 10117.97,
    change: '4.35%',
    weeklyDash: 2,
    monthlyDash: 2,
    quarterlyDash: 2,
  },
  {
    position: 1,
    icon: ethereumIcon,
    dailyDash: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    marketCap: 27973830821,
    price: 251.55,
    change: '5.65%',
    weeklyDash: 2,
    monthlyDash: 2,
    quarterlyDash: 2,
  },
  {
    position: 1,
    icon: chainlinkIcon,
    dailyDash: 2,
    name: 'Chainlink',
    symbol: 'LINK',
    marketCap: 1609280925,
    price: 4.60,
    change: '1.53%',
    weeklyDash: 2,
    monthlyDash: 2,
    quarterlyDash: 2,
  },
  {
    position: 1,
    icon: rippleIcon,
    dailyDash: 2,
    name: 'Ripple',
    symbol: 'XRP',
    marketCap: 8774735321,
    price: 0.997348,
    change: '0.39%',
    weeklyDash: 2,
    monthlyDash: 2,
    quarterlyDash: 2,
  },
];

const AssetsView = styled.div`
  max-width: 1210px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
  overflow-x: scroll;
`;

const TableButtons = styled.div`
  display: flex;
  align-items: center;

  @media(max-width: 600px) {
    display: none;
  }
`;
