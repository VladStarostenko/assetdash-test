import React, {useState} from 'react';
import styled from 'styled-components';
import {Td, Tr} from '../common/Table/Table';
import angleIcon from '../../assets/icons/angle-down-bright.svg';
import {ButtonFavorite} from '../common/Button/ButtonFavorite';
import {Asset} from '../../../core/models/asset';
import {formatChange, formatMarketcap, formatPrice} from '../../../core/utils';

interface AssetItemProps {
  asset: Asset;
}

export const AssetItem = (props: AssetItemProps) => {
  const {
    id,
    ticker,
    name,
    imageUrl,
    currentPrice,
    currentMarketcap,
    currentChange,
    type,
    dashDaily,
    dashWeekly,
    dashMonthly
  } = props.asset;

  const [isFavorite, setIsFavorite] = useState(false);

  const onFavoriteButtonClick = () => {
    setIsFavorite(!isFavorite);
  };

  const missingImages = ['VWAGY', 'TTNDY', 'BMWYY'];
  const getImageUrl = () => {
    if (missingImages.includes(ticker)) {
      return 'https://storage.googleapis.com/iex/api/logos/NFLX.png';
    } else {
      return imageUrl;
    }
  };

  return (
    <Tr>
      <Td>{id}</Td>
      <Td>
        <Dash direction="down">{dashDaily}</Dash>
      </Td>
      <Td>
        <AssetName>
          <img
            src={
              (type === 'Cryptocurrency'
                ? require(`../../assets/crypto-icons/${ticker.toLowerCase()}.svg`)
                : getImageUrl())
            }
            width="32"
            alt={`${name} logo`}
          />
          {name}
        </AssetName>
      </Td>
      <Td>{ticker}</Td>
      <Td>${formatMarketcap(currentMarketcap)}</Td>
      <Td>${formatPrice(currentPrice)}</Td>
      <Td>
        <Change isPositive>{formatChange(currentChange)}</Change>
      </Td>
      <Td>
        <Dash direction="down">{dashWeekly}</Dash>
      </Td>
      <Td>
        <Dash direction="down">{dashMonthly}</Dash>
      </Td>
      <Td>
        <ButtonFavorite
          checked={isFavorite}
          onChange={onFavoriteButtonClick}/>
      </Td>
    </Tr>
  );
};

interface DashProps {
  direction: 'up' | 'down';
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
  font-size: inherit;
  line-height: inherit;
  color: inherit;

  img {
    margin-right: 8px;
  }
`;

interface ChangeProps {
  isPositive: boolean;
}

const Change = styled.span<ChangeProps>`
  color: ${({isPositive}) => isPositive ? '#24BD8F' : '#BD4924'};
`;
