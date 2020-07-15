import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
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
import {GetPageResponse} from '../../../core/models/getPageResponse';
import {Pagination} from '../../../core/models/pagination';

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

  if (assetsSort.column === 'none') {
    return assets;
  } else {
    return sort(assets, compareByStringOrNumber(assetsSort.column), assetsSort.order);
  }
}

const getDefaultPagination = (currentPage: number) => {
  return {currentPage, perPage: 100, lastPage: currentPage + 1};
};

export const Assets = (props: TabsProps) => {
  const [pageData, setPageData] = useState<Asset[]>([]);
  const [assetsSort, setAssetsSort] = useState<AssetsSort>({column: 'rank', order: 'asc'});
  const [pagination, setPagination] = useState<Pagination>(getDefaultPagination(Number(props.currentPage)));

  const {api} = useServices();
  useEffect(() => {
    api.getPage(pagination.currentPage, pagination.perPage).then((res: GetPageResponse) => {
      setPageData(sortAssets(res.data.data, assetsSort));
      setPagination(res.data.pagination);
    });
  }, [api, pagination.currentPage]);

  useEffect(() => {
    setPageData(sortAssets(pageData, assetsSort));
  }, [assetsSort]);

  const onNextClick = () => {
    routeChange(pagination.currentPage + 1);
  };

  const onPreviousClick = () => {
    routeChange(pagination.currentPage - 1);
  };

  const history = useHistory();

  const routeChange = (newPage: number) => {
    const path = `/${newPage}`;
    const currentPagination = {
      ...pagination,
      currentPage: newPage
    };
    setPagination(currentPagination);
    history.push(path);
  };

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
            { pagination.currentPage > 1
              ? <ButtonArrow onClick={onPreviousClick} direction="left">
                    Previous 100
              </ButtonArrow>
              : null }
            { pagination.currentPage < pagination.lastPage
              ? <ButtonArrow onClick={onNextClick} direction="right">
                    Next 100
              </ButtonArrow>
              : null }
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
