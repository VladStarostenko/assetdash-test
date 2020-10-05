import React, {useState} from 'react';
import styled from 'styled-components';
import {Asset} from '../../../../core/models/asset';
import {AssetsSort, Column} from '../../../../core/models/assetsSort';
import {sortAssets} from '../../../../core/utils';
import {AssetItem} from '../../Assets/AssetItem';
import {Table, Th, ThId} from '../Table/Table';
import {Tooltip} from '../Tooltip';
import {useLocation} from 'react-router-dom';
import {getQueryParam} from '../../helpers/queryString';
import {ColumnHeaderText} from '../ColumnHeaderText';
import {DashViewHeaders} from './DashViewHeaders';
import {EarningsViewHeaders} from './EarningsViewHeaders';

export interface AssetListProps {
  pageData: Asset[];
  showIds: boolean;
}

export const AssetsList = ({pageData, showIds}: AssetListProps) => {
  const [assetsSort, setAssetsSort] = useState<AssetsSort>({column: 'rank', order: 'asc'});
  const location = useLocation();

  const setAssetsSortForColumn = (column: Column) => {
    if (assetsSort.column === column && assetsSort.order === 'asc') {
      setAssetsSort({column: column, order: 'desc'});
    } else {
      setAssetsSort({column: column, order: 'asc'});
    }
  };

  const getIconClassName = (column: Column) => assetsSort.column !== column ? '' : assetsSort.order;

  const getId = (index: number) => {
    const currentPage = getQueryParam('p', location) || 1;
    return (Number(currentPage) - 1) * 100 + index + 1;
  };

  const metric = getQueryParam('m', location);

  return (
    <>
      <AssetsView showIds={showIds}>
        <Table>
          <thead>
            <tr>
              { showIds ? <ThId/> : null }
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
                  <ColumnHeaderText
                    className={getIconClassName('dashDaily')}
                  >Daily Dash</ColumnHeaderText>
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
              {!metric
                ? <DashViewHeaders getIconClassName={getIconClassName} setAssetsSortForColumn={setAssetsSortForColumn}/>
                : <EarningsViewHeaders getIconClassName={getIconClassName} setAssetsSortForColumn={setAssetsSortForColumn}/>
              }
              <Th/>
            </tr>
          </thead>
          <tbody>
            {sortAssets(pageData, assetsSort).map((asset, index) => (
              showIds
                ? <AssetItem key={asset.id} asset={asset} id={getId(index)}/>
                : <AssetItem key={asset.id} asset={asset}/>
            ))}
          </tbody>
        </Table>
      </AssetsView>
    </>
  );
};

interface AssetsViewProps {
  showIds: boolean;
}

const AssetsView = styled.div<AssetsViewProps>`
  max-width: 1210px;
  width: 100%;
  padding: ${({showIds}) => showIds ? '0 20px 0 0' : '0 20px'};
  margin: 0 auto;
  overflow-x: scroll;
`;
