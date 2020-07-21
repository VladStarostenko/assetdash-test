import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {Table, Th} from '../common/Table/Table';
import {useServices} from '../hooks/useServices';
import {AssetItem} from './AssetItem';
import {ButtonTertiary} from '../common/Button/ButtonTertiary';
import {Tabs} from '../common/Tabs';
import {Container} from '../common/Container';
import {ButtonArrow} from '../common/Button/ButtonArrow';
import {ButtonsRow} from '../common/Button/ButtonsRow';
import {Tooltip} from '../common/Tooltip';
import {Asset} from '../../../core/models/asset';
import {GetPageResponse} from '../../../core/models/getPageResponse';
import {SectorsContext} from '../hooks/SectorsContext';
import {SearchedContext} from '../hooks/SearchedContext';

type Column = 'rank' | 'name' | 'ticker' | 'currentMarketcap' | 'currentPrice' | 'currentChange' | 'none';
type Order = 'desc' | 'asc';

type AssetsSort = {
  column: Column;
  order: Order;
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

export interface AssetsProps {
  activeTab: string;
  tabs: Array<string>;
  setTab: (tab: string) => void;
  currentPage?: string;
  path?: string;
}

export const Assets = (props: AssetsProps) => {
  const [pageData, setPageData] = useState<Asset[]>([]);
  const [assetsSort, setAssetsSort] = useState<AssetsSort>({column: 'rank', order: 'asc'});
  const [currentPage, setCurrentPage] = useState<number>(Number(props.currentPage) || 1);
  const [lastPage, setLastPage] = useState<number>(Number(props.currentPage) + 1 || 1);
  const [perPage, setPerPage] = useState<number>(props.path === '/all' ? 200 : 100);
  const {checkedItems, setCheckedItems} = useContext(SectorsContext);
  const {searchedData, isSearchLineEmpty} = useContext(SearchedContext);

  const {api} = useServices();

  const getSectors = () => {
    const sectors: string[] = [];
    for (const item in checkedItems) {
      if (checkedItems[item]) {
        sectors.push(item);
      }
    }
    return sectors;
  };

  const showSearchedData = () => {
    setPageData(sortAssets(searchedData, assetsSort));
  };

  const showSectorsData = (sectors: string[]) => {
    api.getAssetsForSectors(sectors).then((res) => {
      setPageData(sortAssets(res.data, assetsSort));
    });
  };

  const showCurrentPage = () => {
    api.getPage(currentPage, perPage).then((res: GetPageResponse) => {
      if (currentPage > 1 && perPage === 200) {
        setPageData(sortAssets(pageData.concat(res.data.data), assetsSort));
      } else {
        setPageData(sortAssets(res.data.data, assetsSort));
      }
      setLastPage(res.data.pagination.lastPage);
    });
  };

  useEffect(() => {
    if (!isSearchLineEmpty) {
      showSearchedData();
    } else {
      const sectors = getSectors();
      if (sectors.length > 0) {
        showSectorsData(sectors);
      } else {
        showCurrentPage();
      }
    }
  }, [api, currentPage, perPage, searchedData, isSearchLineEmpty, checkedItems]);

  useEffect(() => {
    setPageData(sortAssets(pageData, assetsSort));
  }, [assetsSort]);

  const history = useHistory();
  const routeChange = (path: string) => {
    history.push(path);
  };

  const routeForNextAndPrevious = (newPage: number) => {
    setCurrentPage(newPage);
    newPage === 1 ? routeChange('/') : routeChange(`/${newPage}`);
  };

  const onNextClick = () => {
    routeForNextAndPrevious(currentPage + 1);
  };

  const onPreviousClick = () => {
    routeForNextAndPrevious(currentPage - 1);
  };

  const onBackToTopClick = () => {
    setCurrentPage(1);
    setPerPage(100);
    routeChange('/');
  };

  const onViewAllClick = () => {
    setCurrentPage(1);
    setPerPage(200);
    routeChange('/all');
  };

  const onLoadMoreCLick = () => {
    setCurrentPage(currentPage + 1);
  };

  const setAssetsSortForColumn = (column: Column) => {
    if (assetsSort.column === column && assetsSort.order === 'asc') {
      setAssetsSort({column: column, order: 'desc'});
    } else {
      setAssetsSort({column: column, order: 'asc'});
    }
  };

  const getIconClassName = (column: Column) => assetsSort.column !== column ? '' : assetsSort.order;

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
          <Tabs activeTab={props.activeTab} tabs={props.tabs} setTab={props.setTab}/>
          <TableButtons>
            { !searchedData && getSectors().length === 0
              ? <>
                { perPage > 100
                  ? <ButtonArrow onClick={onBackToTopClick} direction="left">
                Back to Top 100
                  </ButtonArrow>
                  : <>
                    { currentPage > 1
                      ? <ButtonArrow onClick={onPreviousClick} direction="left">
                    Previous 100
                      </ButtonArrow>
                      : null }
                    { currentPage < lastPage
                      ? <ButtonArrow onClick={onNextClick} direction="right">
                    Next 100
                      </ButtonArrow>
                      : null }
                    <ButtonTertiary onClick={onViewAllClick}>View all</ButtonTertiary>
                  </>
                } </>
              : null }
          </TableButtons>
        </ButtonsRow>
      </Container>
      <AssetsView>
        <Table>
          <thead>
            <tr>
              <Th data-testid='rank-column-header' className={getIconClassName('rank')} onClick={onRankClick}>Rank</Th>
              <Th>
                <Tooltip
                  text="Our leaderboard ranks assets by market capitalization. The Daily Dash tracks how many places
                      an asset has moved up or down in the leaderboard over the course of the day."
                  position="left"
                >
                  <p>Daily Dash</p>
                </Tooltip>
              </Th>
              <Th
                data-testid='name-column-header'
                className={getIconClassName('name')}
                onClick={onAssetNameClick}
              >
                Asset Name
              </Th>
              <Th
                data-testid='symbol-column-header'
                className={getIconClassName('ticker')}
                onClick={onSymbolClick}
              >
                Symbol
              </Th>
              <Th
                data-testid='marketcap-column-header'
                className={getIconClassName('currentMarketcap')}
                onClick={onMarketcapClick}
              >
                Market Cap
              </Th>
              <Th
                data-testid='price-column-header'
                className={getIconClassName('currentPrice')}
                onClick={onPriceClick}
              >
                Price
              </Th>
              <Th
                data-testid='today-column-header'
                className={getIconClassName('currentChange')}
                onClick={onTodayClick}
              >
                Today
              </Th>
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
      { props.path === '/all' && currentPage < lastPage
        ? <Container>
          <TableButtons>
            <ButtonTertiary onClick={onLoadMoreCLick}>
              Load More
            </ButtonTertiary>
          </TableButtons>
        </Container>
        : null }
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
  justify-content: center;

  @media(max-width: 600px) {
    display: none;
  }
`;
