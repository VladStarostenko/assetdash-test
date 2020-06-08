import React, { useState } from 'react';
import { Screen, ScreenContent } from '../common/Screen';
import { Container } from '../common/Container';
import { PageTitle } from '../common/Text/PageTitle';
import { Search } from '../common/Search/Search';
import { Sort } from '../common/Sort/Sort';
import { Assets } from '../Assets/Assets';
import { WatchList } from '../WatchList/WatchList';
import { PageSubtitle } from '../common/Text/PageSubtitle';

export const Home = () => {
  const [tab, setTab] = useState('Assets');
  const tabs = ['Assets', 'Watchlist'];

  return (
    <Screen>
      <Container>
        <PageTitle>Top Asset by Market Cap</PageTitle>
        <PageSubtitle/>
        <Search/>
        <Sort/>
      </Container>
      <ScreenContent>
        {tab === 'Assets' &&
          <Assets
            activeTab={tab}
            setTab={setTab}
            tabs={tabs}
          />
        }
        {tab === 'Watchlist' &&
          <WatchList
            activeTab={tab}
            setTab={setTab}
            tabs={tabs}
          />
        }
      </ScreenContent>
    </Screen>
  );
};
