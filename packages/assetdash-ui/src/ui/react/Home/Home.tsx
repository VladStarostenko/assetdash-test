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
import {SectorsContext} from '../hooks/SectorsContext';
import {SearchedContext} from '../hooks/SearchedContext';

type Props = RouteComponentProps<{ currentPage: string }>;

const Home = ({match}: Props) => {
  const [tab, setTab] = useState('Assets');
  const tabs = ['Assets', 'Watchlist'];
  const [nameOrTickerPart, setNameOrTickerPart] = useState<string>('');
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const resetSearch = () => {
    setNameOrTickerPart('');
    setSearchInputValue('');
  };
  const resetFilter = () => {
    setCheckedItems({});
  };
  return (
    <Screen>
      <SectorsContext.Provider value={{checkedItems, setCheckedItems, resetFilter}}>
        <SearchedContext.Provider
          value={{nameOrTickerPart,
            setNameOrTickerPart,
            searchInputValue,
            setSearchInputValue,
            resetSearch}}>
          <Container>
            <PageTitle>Top Assets by Market Cap</PageTitle>
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
            currentPage={match.params.currentPage}
            path={match.path}
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
        </SearchedContext.Provider>
      </SectorsContext.Provider>
    </Screen>
  );
};

export default withRouter(Home);
