import React, {useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Screen, ScreenContent} from '../common/Screen';
import {Container} from '../common/Container';
import {PageTitle} from '../common/Text/PageTitle';
import {Search} from '../common/Search/Search';
import {Sort} from '../common/Sort/Sort';
import {Assets} from '../Assets/Assets';
import {WatchList} from '../WatchList/WatchList';
import {PageSubtitle} from '../common/Text/PageSubtitle';
import {Asset} from '../../../core/models/asset';

type Props = RouteComponentProps<{ currentPage: string }>;

const Home = ({match}: Props) => {
  const [tab, setTab] = useState('Assets');
  const tabs = ['Assets', 'Watchlist'];
  const [searchedData, setSearchedData] = useState<Asset[]>();
  const [isSearchLineEmpty, setIsSearchLineEmpty] = useState<boolean>(true);

  return (
    <Screen>
      <Container>
        <PageTitle>Top Assets by Market Cap</PageTitle>
        <PageSubtitle/>
        <Search setSearchedData={setSearchedData} setIsSearchLineEmpty={setIsSearchLineEmpty}/>
        <Sort/>
      </Container>
      <ScreenContent>
        {tab === 'Assets' &&
          <Assets
            activeTab={tab}
            setTab={setTab}
            tabs={tabs}
            currentPage={match.params.currentPage}
            path={match.path}
            searchedData={searchedData}
            isSearchLineEmpty={isSearchLineEmpty}
          />
        }
        {tab === 'Watchlist' &&
          <WatchList
            activeTab={tab}
            setTab={setTab}
            tabs={tabs}
            isSearchLineEmpty={isSearchLineEmpty}
          />
        }
      </ScreenContent>
    </Screen>
  );
};

export default withRouter(Home);
