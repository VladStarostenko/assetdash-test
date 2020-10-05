import React, {useState} from 'react';
import styled from 'styled-components';
import {Td, TdId, Tr} from '../common/Table/Table';
import {ButtonFavorite} from '../common/Button/ButtonFavorite';
import {Asset} from '../../../core/models/asset';
import {formatChange, formatMarketcap, formatPrice} from '../../../core/formatters';
import {useServices} from '../hooks/useServices';
import {getQueryParam} from '../helpers/queryString';
import {Dash} from '../common/Dash';
import {DashViewCells} from '../common/AssetItemCells/DashView/DashViewCells';
import {EarningsViewCells} from '../common/AssetItemCells/EarningsView/EarningsViewCells';
import {AssetNameCell} from '../common/AssetItemCells/AssetNameCell';

interface AssetItemProps {
  asset: Asset;
  id?: number;
}

export const AssetItem = ({asset, id}: AssetItemProps) => {
  const {
    rank,
    ticker,
    name,
    currentPrice,
    currentMarketcap,
    currentChange,
    type,
    dashDaily,
    dashWeekly,
    dashMonthly,
    earningsDate,
    eps
  } = asset;

  const {watchlist} = useServices();

  const [isFavorite, setIsFavorite] = useState<boolean>(watchlist.isInWatchList(ticker));

  const onFavoriteButtonClick = () => {
    isFavorite ? watchlist.removeElementFromWatchList(ticker) : watchlist.addElementToWatchList(ticker);
    setIsFavorite(!isFavorite);
  };

  const metric = getQueryParam('m', location);

  return (
    <Tr>
      { id !== undefined && <TdId data-testid={'asset-row-id'}>{id}</TdId> }
      <Td>{rank}</Td>
      <Td>
        <Dash direction={dashDaily >= 0 ? 'up' : 'down'}>{dashDaily}</Dash>
      </Td>
      <Td>
        <AssetNameCell type={type} ticker={ticker} name={name}/>
      </Td>
      <Td>{ticker}</Td>
      <Td>${formatMarketcap(currentMarketcap)}</Td>
      <Td>${formatPrice(currentPrice)}</Td>
      <Td>
        <Change {...{isPositive: currentChange > 0}}>{formatChange(currentChange)}%</Change>
      </Td>
      {!metric
        ? <DashViewCells dashWeekly={dashWeekly} dashMonthly={dashMonthly}/>
        : <EarningsViewCells earningsDate={earningsDate} eps={eps}/>
      }

      <Td>
        <ButtonFavorite
          checked={watchlist.isInWatchList(ticker)}
          onChange={onFavoriteButtonClick}/>
      </Td>
    </Tr>
  );
};

interface ChangeProps {
  isPositive: boolean;
}

const Change = styled.span<ChangeProps>`
  color: ${({isPositive}) => isPositive ? '#24BD8F' : '#BD4924'};
`;
