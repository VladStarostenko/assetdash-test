import React, {useCallback, useContext, useEffect, useState} from 'react';
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
import {AssetsSort} from '../../../core/models/assetsSort';
import {sortAssets} from '../../../core/utils';
import {AssetsList} from '../common/AssetsList/AssetsList';

export interface AssetsProps {
  currentPage?: string;
  path?: string;
  routeChange: (path: string) => void;
}

export const Assets = (props: AssetsProps) => {
  const [pageData, setPageData] = useState<Asset[]>([]);
  const [assetsSort, setAssetsSort] = useState<AssetsSort>({column: 'rank', order: 'asc'});
  const [currentPage, setCurrentPage] = useState<number>(Number(props.currentPage) || 1);
  const [lastPage, setLastPage] = useState<number>(Number(props.currentPage) + 1 || 1);
  const [perPage, setPerPage] = useState<number>(props.path === '/all' ? 200 : 100);
  const {checkedItems, setCheckedItems, isItemsChange, setIsItemsChange} = useContext(SectorsContext);
  const {nameOrTickerPart, setNameOrTickerPart, searchInputValue, setSearchInputValue} = useContext(SearchedContext);
  const [emptySearchResults, setEmptySearchResults] = useState<boolean>(false);
  const [tab, setTab] = useState<string>(props.path === '/watchlist' ? 'Watchlist' : 'Assets');
  const tabs = ['Assets', 'Watchlist'];

  const {api, watchlist} = useServices();

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

  const showCurrentPage = useCallback(() => {
    api.getPage(currentPage, perPage).then((res: GetPageResponse) => paginateData(res));
  }, [api, currentPage, perPage, paginateData]);

  const showWatchList = useCallback((watchList: string) => {
    api.getWatchList(watchList).then((res) => setPageData(sortAssets(res.data.data, assetsSort)));
  }, [api, currentPage, perPage, paginateData]);

  useEffect(() => {
    if (isItemsChange) {
      props.routeChange('/');
    }
  }, [isItemsChange]);

  useEffect(() => {
    if (props.path === '/watchlist') {
      resetPage();
      setTab('Watchlist');
    }
    if (props.path === '/:currentPage') {
      setCurrentPage(Number(props.currentPage));
    }
    if (props.path === '/') {
      if (isItemsChange) {
        resetPageForSectors();
      } else if (searchInputValue) {
        resetPageForSearch();
      } else {
        resetPage();
      }
    }
  }, [props.path, props.currentPage]);

  useEffect(() => {
    const sectors = getSectors();
    if (nameOrTickerPart) {
      showSearchedData();
    } else if (sectors.length > 0) {
      setTab('Assets');
      showSectorsData(sectors);
    } else if (tab === 'Assets') {
      showCurrentPage();
    } else {
      showWatchList(watchlist.get('watchlist'));
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
    setCheckedItems({});
    setTab('Assets');
  };

  const resetPageForSectors = () => {
    setCurrentPage(1);
    setPageData([]);
    setIsItemsChange(false);
  };

  const resetPageForSearch = () => {
    setCurrentPage(1);
  };

  const routeForNextAndPrevious = (newPage: number) => {
    newPage === 1 ? props.routeChange('/') : props.routeChange(`/${newPage}`);
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
    props.routeChange('/');
  };

  const onViewAllClick = () => {
    setCurrentPage(1);
    setPerPage(200);
    props.routeChange('/all');
  };

  const onLoadMoreCLick = () => {
    setCurrentPage(currentPage + 1);
  };

  return <>
    <Container>
      <ButtonsRow>
        <Tabs activeTab={tab} tabs={tabs} setTab={setTab}
          path={props.path} routeChange={props.routeChange}/>
        { props.path !== '/watchlist'
          ? <TableButtons>
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
          : null}
      </ButtonsRow>
    </Container>
    <AssetsList
      watchlist={watchlist}
      assetsSort={assetsSort}
      setAssetsSort={setAssetsSort}
      tab={tab}
      pageData={pageData}
    />
    { props.path === '/all' && currentPage < lastPage && !nameOrTickerPart
      ? <Container>
        <TableButtons>
          <ButtonTertiary onClick={onLoadMoreCLick}>
            Load More
          </ButtonTertiary>
        </TableButtons>
      </Container>
      : null }
    { pageData.length === 0 && !emptySearchResults ? <Loader/> : null}
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
