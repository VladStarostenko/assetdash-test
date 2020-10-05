import React, {useCallback, useEffect, useState} from 'react';
import {useHistory, useLocation, useParams, useRouteMatch} from 'react-router-dom';
import styled from 'styled-components';
import {Asset} from '../../../core/models/asset';
import {GetPageResponse} from '../../../core/models/getPageResponse';
import magnifierIcon from '../../assets/icons/magnifier.svg';
import {AssetsList} from '../common/AssetsList/AssetsList';
import {ButtonArrow} from '../common/Button/ButtonArrow';
import {ButtonsRow} from '../common/Button/ButtonsRow';
import {ButtonTertiary} from '../common/Button/ButtonTertiary';
import {Container} from '../common/Container';
import {getQueryParam} from '../helpers/queryString';
import {Tabs} from '../Home/Tabs';
import {useServices} from '../hooks/useServices';
import {areIdsVisible} from '../helpers/areIdsVisible';
import {getMetricTypes} from '../helpers/getMetricTypes';
import {getMetricParam} from '../helpers/getMetricParam';

export const Assets = () => {
  const [pageData, setPageData] = useState<Asset[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(100);
  const [nameOrTickerPart, setNameOrTickerPart] = useState('');
  const [sector, setSector] = useState<string>('');
  const [emptySearchResults, setEmptySearchResults] = useState<boolean>(false);
  const [emptySortResults, setEmptySortResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const {api} = useServices();
  const location = useLocation();
  const [showIds, setShowIds] =
    useState<boolean>(areIdsVisible(location));
  const {sectorName} = useParams();
  const [typesOfAssets, setTypesOfAssets] = useState<string[]>([]);

  function usePageUpdate() {
    useEffect(() => {
      const currentPage = getQueryParam('p', location);
      setCurrentPage(Number(currentPage) || 1);
      const nameOrTickerPart = getQueryParam('q', location);
      setNameOrTickerPart(nameOrTickerPart || '');
      const sector = sectorName || '';
      setSector(sector);
      const metric = getQueryParam('m', location) || 'Dash';
      const typesOfAssets = getMetricTypes(metric);
      setTypesOfAssets(typesOfAssets);
    }, [location]);
  }

  function usePathUpdate() {
    const allMatch = useRouteMatch('/all');

    useEffect(() => {
      setPerPage(allMatch ? 200 : 100);
    }, [allMatch]);
  }

  usePageUpdate();
  usePathUpdate();

  const isShowingAll = () => perPage === 200;

  const loadAssetSearchResult = useCallback(() => {
    api.searchAssets(nameOrTickerPart, typesOfAssets).then((res: GetPageResponse) => {
      setEmptySearchResults(res.data.data.length === 0);
      setPageData(res.data.data);
      setIsLoading(false);
    });
  }, [api, nameOrTickerPart, typesOfAssets]);

  const paginateData = useCallback((res: GetPageResponse) => {
    if (currentPage > 1 && isShowingAll()) {
      setPageData((pageData) => pageData.concat(res.data.data));
    } else {
      setPageData(res.data.data);
    }
    setLastPage(res.data.pagination.lastPage);
    setIsLoading(false);
  }, [currentPage]);

  const loadFilteredAssets = useCallback((sector: string) => {
    api.getAssetsForSectors(currentPage, perPage, sector, typesOfAssets).then((res: GetPageResponse) => {
      setEmptySortResults(res.data.data.length === 0);
      paginateData(res);
    });
  }, [api, currentPage, perPage, paginateData, typesOfAssets]);

  const loadCurrentPage = useCallback(() => {
    if (currentPage < 1) {
      return;
    }
    api.getPage(currentPage, perPage, typesOfAssets).then((res: GetPageResponse) => paginateData(res));
  }, [api, currentPage, perPage, paginateData, typesOfAssets]);

  useEffect(() => {
    setShowIds(areIdsVisible(location));
  }, [location]);

  useEffect(() => {
    setIsLoading(true);
    if (!isShowingAll()) {
      setPageData([]);
    }
    if (nameOrTickerPart) {
      loadAssetSearchResult();
    } else if (sector) {
      loadFilteredAssets(sector);
    } else {
      loadCurrentPage();
    }
  }, [nameOrTickerPart, loadAssetSearchResult, sector, loadCurrentPage, loadFilteredAssets, perPage]);

  function updatePageInParams(newPage: number) {
    const urlSearchParams = new URLSearchParams(location.search);
    if (newPage > 1) {
      urlSearchParams.set('p', newPage.toString());
    } else {
      urlSearchParams.delete('p');
    }
    return urlSearchParams.toString();
  }

  const routeForNextAndPrevious = (newPage: number) => {
    const urlSearchString = updatePageInParams(newPage);
    const newPath = urlSearchString ? `${location.pathname}?${urlSearchString}` : `${location.pathname}`;
    history.push(newPath);
  };

  const onNextClick = () => {
    routeForNextAndPrevious(currentPage + 1);
  };

  const onPreviousClick = () => {
    routeForNextAndPrevious(currentPage - 1);
  };

  const onBackToTopClick = () => {
    const metricParam = getMetricParam(location);
    history.push('/' + metricParam);
  };

  const onViewAllClick = () => {
    const metricParam = getMetricParam(location);
    history.push('/all' + metricParam);
  };

  const onLoadMoreCLick = () => {
    setCurrentPage(currentPage + 1);
  };

  const noSearchOrSortResults = () => {
    return (nameOrTickerPart && emptySearchResults) || (emptySortResults && sector);
  };

  return <>
    <Container>
      <ButtonsRow>
        <Tabs/>
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
    <AssetsList
      pageData={pageData}
      showIds={showIds}
    />
    { isShowingAll() && currentPage < lastPage && !nameOrTickerPart
      ? <Container>
        <TableButtons>
          <ButtonTertiary onClick={onLoadMoreCLick}>
            Load More
          </ButtonTertiary>
        </TableButtons>
      </Container>
      : null }
    { isLoading ? <Loader/> : null}
    { noSearchOrSortResults()
      ? <NoResultsContainer>
        <NoResults>
          <NotFoundIconWrapper>
            <img src={magnifierIcon} alt="search"/>
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
