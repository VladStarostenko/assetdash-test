import React, {useCallback, useContext, useEffect, useState} from 'react';
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
import magnifierIcon from '../../assets/icons/magnifier.svg';

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
  const {checkedItems} = useContext(SectorsContext);
  const {nameOrTickerPart} = useContext(SearchedContext);
  const [isSearchResults, setIsSearchResults] = useState<boolean>(false);

  const {api} = useServices();

  const getSectors = useCallback(() => {
    return Object.entries(checkedItems).filter(([, v]) => !!v).map(([k]) => k);
  }, [checkedItems]);

  const showSearchedData = () => {
    api.searchAssets(nameOrTickerPart).then((res: { data: Asset[] }) => {
      setIsSearchResults(res.data.length === 0);
      setPageData(sortAssets(res.data, assetsSort));
    });
  };

  const paginateData = useCallback((res: GetPageResponse) => {
    if (currentPage > 1 && perPage === 200) {
      setPageData((pageData) => sortAssets(pageData.concat(res.data.data), assetsSort));
    } else {
      setPageData(sortAssets(res.data.data, assetsSort));
    }
    setLastPage(res.data.pagination.lastPage);
  }, [currentPage, perPage, assetsSort]);

  const showSectorsData = useCallback((sectors: string[]) => {
    api.getAssetsForSectors(currentPage, perPage, sectors).then((res: GetPageResponse) => paginateData(res));
  }, [api, currentPage, perPage, paginateData]);

  const showCurrentPage = useCallback(() => {
    api.getPage(currentPage, perPage).then((res: GetPageResponse) => paginateData(res));
  }, [api, currentPage, perPage, paginateData]);

  useEffect(() => {
    setPageData([]);
    if (nameOrTickerPart) {
      showSearchedData();
    } else {
      const sectors = getSectors();
      if (sectors.length > 0) {
        showSectorsData(sectors);
      } else {
        showCurrentPage();
      }
    }
  }, [nameOrTickerPart, showSearchedData, getSectors, showCurrentPage, showSectorsData]);

  useEffect(() => {
    setPageData((pageData) => sortAssets(pageData, assetsSort));
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
            { !nameOrTickerPart
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
              <Th/>
            </tr>
          </thead>
          <tbody>
            {pageData.map((asset) => <AssetItem key={asset.id} asset={asset}/>)}
          </tbody>
        </Table>
      </AssetsView>
      { props.path === '/all' && currentPage < lastPage && !nameOrTickerPart
        ? <Container>
          <TableButtons>
            <ButtonTertiary onClick={onLoadMoreCLick}>
              Load More
            </ButtonTertiary>
          </TableButtons>
        </Container>
        : null }
      { pageData.length === 0 && !isSearchResults ? <Loader/> : null}
      { nameOrTickerPart && isSearchResults
        ? <NoResultsContainer>
          <NoResults>
            <NoFoundIconWrapper>
              <img src={magnifierIcon}/>
            </NoFoundIconWrapper>
            <NoFoundTitel>No results</NoFoundTitel>
            <NoFoundMessage>Try different asset name</NoFoundMessage>
          </NoResults>
        </NoResultsContainer>
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

const NoFoundTitel = styled.h1`
  font-weight: bold;
  font-size: 20px;
  line-height: 18px;
  color: ${({theme}) => theme.colors.colorPrimary};
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const NoFoundIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const NoFoundMessage = styled.div`
  font-size: 16px;
  line-height: 18px;
  color: ${({theme}) => theme.colors.colorSecondary};
  margin-right: auto;
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const NoResultsContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoResults = styled.div`
  max-width: 1210px;
  width: 100%;
  padding: 50px 20px;
  margin: 0 auto;
  overflow-x: scroll;
  background: ${({theme}) => theme.colors.backgroundPrimary};
`;

const TableButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media(max-width: 600px) {
    display: none;
  }
`;

const Loader = styled.div`
  font-size: 10px;
  text-indent: -99999em;
  color: #21CE99;
  margin: 55px auto;
  position: relative;
  width: 10em;
  height: 10em;
  box-shadow: inset 0 0 0 1em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  border-radius: 50%;

  &::before,
  &::after {
    position: absolute;
    content: '';
    border-radius: 50%;
  }
  &::before {
    width: 5.2em;
    height: 10.2em;
    background: #F4FBFB;
    border-radius: 10.2em 0 0 10.2em;
    top: -0.1em;
    left: -0.1em;
    -webkit-transform-origin: 5.1em 5.1em;
    transform-origin: 5.1em 5.1em;
    -webkit-animation: load2 2s infinite ease 1.5s;
    animation: load2 2s infinite ease 1.5s;
  }
  &::after {
    width: 5.2em;
    height: 10.2em;
    background: #F4FBFB;
    border-radius: 0 10.2em 10.2em 0;
    top: -0.1em;
    left: 4.9em;
    -webkit-transform-origin: 0.1em 5.1em;
    transform-origin: 0.1em 5.1em;
    -webkit-animation: load2 2s infinite ease;
    animation: load2 2s infinite ease;
  }
  @-webkit-keyframes load2 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load2 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
