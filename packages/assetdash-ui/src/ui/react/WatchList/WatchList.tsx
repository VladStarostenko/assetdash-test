import React, {useCallback, useEffect, useState} from 'react';
import {Asset} from '../../../core/models/asset';
import {AssetsList} from '../common/AssetsList/AssetsList';
import {ButtonsRow} from '../common/Button/ButtonsRow';
import {Container} from '../common/Container';
import {Tabs} from '../Home/Tabs';
import {useServices} from '../hooks/useServices';
import {EmptyWatchList} from './EmptyWatchList';
import {getQueryParam} from '../helpers/queryString';
import {getMetricTypes} from '../helpers/getMetricTypes';
import {useLocation} from 'react-router-dom';
import {AssetType} from '../../../core/models/metrics';

export const WatchList = () => {
  const {api, watchlist} = useServices();
  const [watchlistData, setWatchlistData] = useState<Asset[]>([]);

  const location = useLocation();

  const metric = getQueryParam('m', location) || 'Dash';
  const [typesOfAssets, setTypesOfAssets] = useState<AssetType[]>(getMetricTypes(metric));

  useEffect(() => {
    const metric = getQueryParam('m', location) || 'Dash';
    const typesOfAssets = getMetricTypes(metric);
    setTypesOfAssets(typesOfAssets);
  }, [location]);

  const showWatchList = useCallback((watchList: string) => {
    if (watchList) {
      api.getWatchList(watchList, typesOfAssets).then((res) => setWatchlistData(res.data.data));
    } else {
      setWatchlistData([]);
    }
  }, [api, typesOfAssets]);

  useEffect(() => {
    showWatchList(watchlist.get('watchlist'));
  }, [showWatchList, watchlist]);

  function hasWatchlistData() {
    return watchlist.get('watchlist') && watchlistData;
  }

  return <>

    <Container>
      <ButtonsRow>
        <Tabs/>
      </ButtonsRow>
    </Container>

    {hasWatchlistData() && <AssetsList pageData={watchlistData} showIds={true}/>}
    {!hasWatchlistData() && <EmptyWatchList/>}
  </>;
};
