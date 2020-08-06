import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import {Assets} from '../Assets/Assets';
import {Container} from '../common/Container';
import {Screen, ScreenContent} from '../common/Screen';
import {Search} from '../common/Search/Search';
import {Sort} from '../common/Sort/Sort';
import {PageSubtitle} from '../common/Text/PageSubtitle';
import {PageTitle} from '../common/Text/PageTitle';
import {WatchList} from '../WatchList/WatchList';

const Home = () => {
  const watchlistMatch = useRouteMatch('/watchlist');

  return (
    <Screen>
      <Container>
        <PageTitle>Top Assets by Market Cap</PageTitle>
        <PageSubtitle/>
        <Search/>
        <Sort/>
      </Container>
      <ScreenContent>
        {watchlistMatch ? <WatchList/> : <Assets/>}
      </ScreenContent>
    </Screen>
  );
};

export default Home;
