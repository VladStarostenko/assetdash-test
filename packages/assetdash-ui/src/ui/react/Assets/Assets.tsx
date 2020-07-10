import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Table, Th} from '../common/Table/Table';
import {useServices} from '../hooks/useServices';
import {AssetItem} from './AssetItem';
import {ButtonTertiary} from '../common/Button/ButtonTertiary';
import {Tabs, TabsProps} from '../common/Tabs';
import {Container} from '../common/Container';
import {ButtonArrow} from '../common/Button/ButtonArrow';
import {ButtonsRow} from '../common/Button/ButtonsRow';
import {Tooltip} from '../common/Tooltip';
import {Asset} from '../../../core/models/asset';
import {AssetResponse} from '../../../core/models/assetResponse';
import {sortByRank} from '../../../core/utils';

type AssetsSort = {
  column: 'rank' | 'name' | 'ticker' | 'currentMarketcap' | 'currentPrice' | 'currentChange' | 'none';
  order: 'desc' | 'asc';
}

function sortAssets(assets: Asset[], assetsSort: AssetsSort) {
  function sort(assets: Asset[], compare: (a: Asset, b: Asset) => number, order: 'desc' | 'asc') {
    const result = [...assets];
    result.sort(compare);
    return order === 'asc' ? result : result.reverse();
  }

  const compareByStringOrNumber = (column: keyof Asset) => (a: Asset, b: Asset) => {
    if (a[column] > b[column]) {
      return 1;
    }
    if (a[column] < b[column]) {
      return -1;
    }
    return 0;
  };

  switch (assetsSort.column) {
    case 'name':
      return sort(assets, compareByStringOrNumber('name'), assetsSort.order);
    case 'rank':
      return sort(assets, compareByStringOrNumber('rank'), assetsSort.order);
    case 'ticker':
      return sort(assets, compareByStringOrNumber('ticker'), assetsSort.order);
    case 'currentMarketcap':
      return sort(assets, compareByStringOrNumber('currentMarketcap'), assetsSort.order);
    case 'currentPrice':
      return sort(assets, compareByStringOrNumber('currentPrice'), assetsSort.order);
    case 'currentChange':
      return sort(assets, compareByStringOrNumber('currentChange'), assetsSort.order);
    default:
      return assets;
  }
}

export const Assets = (props: TabsProps) => {
  const [pageData, setPageData] = useState<Asset[]>([]);
  const [assetsSort, setAssetsSort] = useState<AssetsSort>({column: 'none', order: 'desc'});
  const {api} = useServices();
  useEffect(() => {
    api.getPage(1).then((res: AssetResponse) => {
      setPageData(sortByRank(res.data, 1));
    });
  }, [api]);

  useEffect(() => {
    setPageData(sortAssets(pageData, assetsSort));
  }, [assetsSort]);

  const setAssetsSortForColumn =
    (column: 'name' | 'rank' | 'ticker' | 'currentMarketcap' | 'currentPrice' | 'currentChange') => {
      if (assetsSort.column === column && assetsSort.order === 'asc') {
        setAssetsSort({column: column, order: 'desc'});
      } else {
        setAssetsSort({column: column, order: 'asc'});
      }
    };

  const onAssetNameClick = () => {
    setAssetsSortForColumn('name');
  };

  const onRankClick = () => {
    setAssetsSortForColumn('rank');
  };

  const onSymbolClick = () => {
    setAssetsSortForColumn('ticker');
  };

  const onMarketcapClick = () => {
    setAssetsSortForColumn('currentMarketcap');
  };

  const onPriceClick = () => {
    setAssetsSortForColumn('currentPrice');
  };

  const onTodayClick = () => {
    setAssetsSortForColumn('currentChange');
  };

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
              <Th data-testid='rank-column-header' onClick={onRankClick}>Rank</Th>
              <Th>
                <Tooltip
                  text="Our leaderboard ranks assets by market capitalization. The Daily Dash tracks how many places
                      an asset has moved up or down in the leaderboard over the course of the day."
                  position="left"
                >
                  <p>Daily Dash</p>
                </Tooltip>
              </Th>
              <Th data-testid='name-column-header' onClick={onAssetNameClick}>Asset Name</Th>
              <Th data-testid='symbol-column-header' onClick={onSymbolClick}>Symbol</Th>
              <Th data-testid='marketcap-column-header' onClick={onMarketcapClick}>Market Cap</Th>
              <Th data-testid='price-column-header' onClick={onPriceClick}>Price</Th>
              <Th data-testid='today-column-header' onClick={onTodayClick}>Today</Th>
              <Th>
                <Tooltip
                  text="Our leaderboard ranks assets by market capitalization. The Weekly Dash tracks how many places
                       an asset has moved up or down in the leaderboard over the course of the week."
                >
                  <p>Weekly Dash</p>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip
                  text="Our leaderboard ranks assets by market capitalization. The Monthly Dash tracks how many places
                       an asset has moved up or down in the leaderboard over the course of the month."
                >
                  <p>Monthly Dash</p>
                </Tooltip>
              </Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((asset) => <AssetItem key={asset.id} asset={asset}/>)}
          </tbody>
        </Table>
      </AssetsView>
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

const TableButtons = styled.div`
  display: flex;
  align-items: center;

  @media(max-width: 600px) {
    display: none;
  }
`;
