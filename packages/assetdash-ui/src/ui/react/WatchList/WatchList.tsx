import React, {useCallback, useEffect, useState} from 'react';
import {Asset} from '../../../core/models/asset';
import {AssetsList} from '../common/AssetsList/AssetsList';
import {ButtonsRow} from '../common/Button/ButtonsRow';
import {Container} from '../common/Container';
import {Tabs} from '../Home/Tabs';
import {useServices} from '../hooks/useServices';
import {EmptyWatchList} from './EmptyWatchList';

export const WatchList = () => {
  const {api, watchlist} = useServices();
  const [watchlistData, setWatchlistData] = useState<Asset[]>([]);

  const showWatchList = useCallback((watchList: string) => {
    api.getWatchList(watchList).then((res) => setWatchlistData(res.data.data));
  }, [api]);

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

    {hasWatchlistData() && <AssetsList pageData={watchlistData} isShowIds={true}/>}
    {!hasWatchlistData() && <EmptyWatchList/>}
  </>;
};
