import React from 'react';
import {EmptyWatchList} from '../../WatchList/EmptyWatchList';
import {Table, Th} from '../Table/Table';
import {Tooltip} from '../Tooltip';
import {AssetItem} from '../../Assets/AssetItem';
import styled from 'styled-components';
import {AssetsSort, Column} from '../../../../core/models/assetsSort';
import {WatchListService} from '../../services/WatchListService';
import {Asset} from '../../../../core/models/asset';

export interface AssetListProps {
  watchlist: WatchListService;
  assetsSort: AssetsSort;
  setAssetsSort: (arg: AssetsSort) => void;
  tab: string;
  pageData: Asset[];
}

export const AssetsList = ({watchlist, assetsSort, setAssetsSort, tab, pageData}: AssetListProps) => {
  const setAssetsSortForColumn = (column: Column) => {
    if (assetsSort.column === column && assetsSort.order === 'asc') {
      setAssetsSort({column: column, order: 'desc'});
    } else {
      setAssetsSort({column: column, order: 'asc'});
    }
  };

  const getIconClassName = (column: Column) => assetsSort.column !== column ? '' : assetsSort.order;

  return (
    <>
      { !watchlist.get('watchlist') && tab === 'Watchlist'
        ? <EmptyWatchList/>
        : <AssetsView>
          <Table>
            <thead>
              <tr>
                <Th
                  data-testid='rank-column-header'
                  className={getIconClassName('rank')}
                  onClick={() => setAssetsSortForColumn('rank')}
                >
            Rank
                </Th>
                <Th
                  className={getIconClassName('dashDaily')}
                  onClick={() => setAssetsSortForColumn('dashDaily')}
                >
                  <Tooltip
                    text="Our leaderboard ranks assets by market capitalization. The Daily Dash tracks how many places
                    an asset has moved up or down in the leaderboard over the course of the day."
                    position="left"
                  >
                    <P
                      className={getIconClassName('dashDaily')}
                    >Daily Dash</P>
                  </Tooltip>
                </Th>
                <Th
                  data-testid='name-column-header'
                  className={getIconClassName('name')}
                  onClick={() => setAssetsSortForColumn('name')}
                >
            Asset Name
                </Th>
                <Th
                  data-testid='symbol-column-header'
                  className={getIconClassName('ticker')}
                  onClick={() => setAssetsSortForColumn('ticker')}
                >
            Symbol
                </Th>
                <Th
                  data-testid='marketcap-column-header'
                  className={getIconClassName('currentMarketcap')}
                  onClick={() => setAssetsSortForColumn('currentMarketcap')}
                >
            Market Cap
                </Th>
                <Th
                  data-testid='price-column-header'
                  className={getIconClassName('currentPrice')}
                  onClick={() => setAssetsSortForColumn('currentPrice')}
                >
            Price
                </Th>
                <Th
                  data-testid='today-column-header'
                  className={getIconClassName('currentChange')}
                  onClick={() => setAssetsSortForColumn('currentChange')}
                >
            Today
                </Th>
                <Th
                  className={getIconClassName('dashWeekly')}
                  onClick={() => setAssetsSortForColumn('dashWeekly')}
                >
                  <Tooltip
                    text="Our leaderboard ranks assets by market capitalization. The Weekly Dash tracks how many places
                     an asset has moved up or down in the leaderboard over the course of the week."
                  >
                    <P
                      className={getIconClassName('dashWeekly')}
                    >Weekly Dash</P>
                  </Tooltip>
                </Th>
                <Th
                  className={getIconClassName('dashMonthly')}
                  onClick={() => setAssetsSortForColumn('dashMonthly')}
                >
                  <Tooltip
                    text="Our leaderboard ranks assets by market capitalization. The Monthly Dash tracks how many places
                     an asset has moved up or down in the leaderboard over the course of the month."
                  >
                    <P
                      className={getIconClassName('dashMonthly')}
                    >Monthly Dash</P>
                  </Tooltip>
                </Th>
                <Th/>
              </tr>
            </thead>
            <tbody>
              {pageData.map((asset) => <AssetItem key={asset.id} asset={asset}/>)}
            </tbody>
          </Table>
        </AssetsView>
      }
    </>
  );
};

const AssetsView = styled.div`
  max-width: 1210px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
  overflow-x: scroll;
`;

const P = styled.p`
 &.asc,
 &.desc {
    position: relative;
    color: ${({theme}) => theme.colors.colorPrimary};
  }
`;
