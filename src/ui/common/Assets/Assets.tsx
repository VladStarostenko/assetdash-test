import React from 'react';
import { Table, Th } from '../Table/Table';
import bitcoinIcon from '../../../assets/icons/crypto/bitcoin.svg';
import ethereumIcon from '../../../assets/icons/crypto/ethereum.svg';
import chainlinkIcon from '../../../assets/icons/crypto/chainlink.svg';
import rippleIcon from '../../../assets/icons/crypto/ripple.svg';
import { AssetItem } from './AssetItem';

export const Assets = () => {
  return (
    <Table>
      <thead>
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
      </thead>
      <tbody>
        {placeholderData.map((asset, index) => <AssetItem key={index} asset={asset}/>)}
      </tbody>
    </Table>
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
