import React from 'react';
import {useParams, useRouteMatch} from 'react-router-dom';
import {Assets} from '../Assets/Assets';
import {Container} from '../common/Container';
import {Screen, ScreenContent} from '../common/Screen';
import {Search} from '../common/Search/Search';
import {Sort} from '../common/Sort/Sort';
import {PageSubtitle} from '../common/Text/PageSubtitle';
import {PageTitle} from '../common/Text/PageTitle';
import {WatchList} from '../WatchList/WatchList';
import {getPageTitle} from '../helpers/getPageTitle';

const Home = () => {
  const watchlistMatch = useRouteMatch('/watchlist');
  const {sectorName} = useParams();

  return (
    <Screen>
      <Container>
        <PageTitle data-testid='title'>{sectorName ? `${getPageTitle(sectorName)}` : 'Top Assets'} by Market Cap</PageTitle>
        <div>blog
          <a href="localhost:8080/blog/"></a>
        </div>

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
