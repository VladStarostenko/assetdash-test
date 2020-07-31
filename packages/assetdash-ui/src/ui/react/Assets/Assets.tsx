import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {Asset} from '../../../core/models/asset';
import {GetPageResponse} from '../../../core/models/getPageResponse';
import magnifierIcon from '../../assets/icons/magnifier.svg';
import {ButtonArrow} from '../common/Button/ButtonArrow';
import {ButtonsRow} from '../common/Button/ButtonsRow';
import {ButtonTertiary} from '../common/Button/ButtonTertiary';
import {Container} from '../common/Container';
import {Tabs} from '../common/Tabs';
import {SearchedContext} from '../hooks/SearchedContext';
import {SectorsContext} from '../hooks/SectorsContext';
import {useServices} from '../hooks/useServices';
import {AssetsSort, Column} from '../../../core/models/assetsSort';
import {Table, Th} from '../common/Table/Table';
import {Tooltip} from '../common/Tooltip';
import {AssetItem} from './AssetItem';
import {sortAssets} from '../../../core/utils';
import {EmptyWatchList} from '../WatchList/EmptyWatchList';

export interface AssetsProps {
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
  const {nameOrTickerPart, setNameOrTickerPart, setSearchInputValue} = useContext(SearchedContext);
  const [emptySearchResults, setEmptySearchResults] = useState<boolean>(false);
  const [emptySortResults, setEmptySortResults] = useState<boolean>(false);
  const [tab, setTab] = useState('Assets');
  const tabs = ['Assets', 'Watchlist'];

  const {api} = useServices();

  const getSectors = useCallback(() => {
    return Object.entries(checkedItems).filter(([, v]) => !!v).map(([k]) => k);
  }, [checkedItems]);

  const showSearchedData = useCallback(() => {
    api.searchAssets(nameOrTickerPart).then((res: GetPageResponse) => {
      setEmptySearchResults(res.data.data.length === 0);
      setPageData(sortAssets(res.data.data, assetsSort));
    });
  }, [api, nameOrTickerPart]);

  const paginateData = useCallback((res: GetPageResponse) => {
    if (currentPage > 1 && perPage === 200) {
      setPageData((pageData) => sortAssets(pageData.concat(res.data.data), assetsSort));
    } else {
      setPageData(sortAssets(res.data.data, assetsSort));
    }
    setLastPage(res.data.pagination.lastPage);
  }, [currentPage, perPage]);

  const showSectorsData = useCallback((sectors: string[]) => {
    api.getAssetsForSectors(currentPage, perPage, sectors).then((res: GetPageResponse) => paginateData(res));
  }, [api, currentPage, perPage, paginateData]);

  const showSectorsDataForWatchList = useCallback((sectors: string[], watchList: string) => {
    api.getAssetsForSectorsForWatchList(currentPage, perPage, sectors, watchList)
      .then((res: GetPageResponse) => {
        setEmptySortResults(res.data.data.length === 0);
        paginateData(res);
      });
  }, [api, currentPage, perPage, paginateData]);

  const showCurrentPage = useCallback(() => {
    api.getPage(currentPage, perPage).then((res: GetPageResponse) => paginateData(res));
  }, [api, currentPage, perPage, paginateData]);

  const showCurrentPageForWatchList = useCallback((watchList: string) => {
    api.getPageForWatchList(currentPage, perPage, watchList).then((res: GetPageResponse) => paginateData(res));
  }, [api, currentPage, perPage, paginateData]);

  const {watchlist} = useServices();

  useEffect(() => {
    if (nameOrTickerPart) {
      showSearchedData();
    } else if (tab === 'Assets') {
      const sectors = getSectors();
      if (sectors.length > 0) {
        showSectorsData(sectors);
      } else {
        showCurrentPage();
      }
    } else {
      const sectors = getSectors();
      if (sectors.length > 0) {
        showSectorsDataForWatchList(sectors, watchlist.get('watchlist'));
      } else {
        showCurrentPageForWatchList(watchlist.get('watchlist'));
      }
    }
  }, [nameOrTickerPart, showSearchedData, getSectors, showCurrentPage, showSectorsData, perPage, tab]);

  useEffect(() => {
    setPageData(sortAssets(pageData, assetsSort));
  }, [assetsSort]);

  const resetPage = () => {
    setCurrentPage(1);
    setPerPage(100);
    setAssetsSort({column: 'rank', order: 'asc'});
    setNameOrTickerPart('');
    setPageData([]);
    setSearchInputValue('');
  };

  useEffect(() => {
    if (!props.currentPage && props.path !== '/all') {
      resetPage();
    }
  }, [props.currentPage, props.path]);

  useEffect(() => {
    if (!nameOrTickerPart || nameOrTickerPart === '') {
      routeChange('/');
    }
  }, [getSectors, nameOrTickerPart]);

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

  return <>
    <Container>
      <ButtonsRow>
        <Tabs activeTab={tab} tabs={tabs} setTab={setTab} resetPage={resetPage}/>
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
    { props.path === '/all' && currentPage < lastPage && !nameOrTickerPart
      ? <Container>
        <TableButtons>
          <ButtonTertiary onClick={onLoadMoreCLick}>
            Load More
          </ButtonTertiary>
        </TableButtons>
      </Container>
      : null }
    { pageData.length === 0 && !emptySearchResults && !emptySortResults ? <Loader/> : null}
    { nameOrTickerPart && emptySearchResults
      ? <NoResultsContainer>
        <NoResults>
          <NotFoundIconWrapper>
            <img src={magnifierIcon}/>
          </NotFoundIconWrapper>
          <NotFoundTitle>No results</NotFoundTitle>
          <NotFoundMessage>Try different asset name</NotFoundMessage>
        </NoResults>
      </NoResultsContainer>
      : null }
  </>;
};

const AssetsView = styled.div`
  max-width: 1210px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
  overflow-x: scroll;
`;

const NotFoundTitle = styled.h1`
  font-weight: bold;
  font-size: 20px;
  line-height: 18px;
  color: ${({theme}) => theme.colors.colorPrimary};
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const NotFoundIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const NotFoundMessage = styled.div`
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
    background: ${({theme}) => theme.colors.backgroundSecondary};
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
    background: ${({theme}) => theme.colors.backgroundSecondary};
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

const P = styled.p`
 &.asc,
 &.desc {
    position: relative;
    color: ${({theme}) => theme.colors.colorPrimary};
  }
`;
