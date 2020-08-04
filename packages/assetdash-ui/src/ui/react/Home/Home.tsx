import React, {useState} from 'react';
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom';
import {Screen, ScreenContent} from '../common/Screen';
import {Container} from '../common/Container';
import {PageTitle} from '../common/Text/PageTitle';
import {Search} from '../common/Search/Search';
import {Sort} from '../common/Sort/Sort';
import {Assets} from '../Assets/Assets';
import {PageSubtitle} from '../common/Text/PageSubtitle';
import {SectorsContext} from '../hooks/SectorsContext';
import {SearchedContext} from '../hooks/SearchedContext';

type Props = RouteComponentProps<{ currentPage: string }>;

const Home = ({match}: Props) => {
  const [nameOrTickerPart, setNameOrTickerPart] = useState<string>('');
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isItemsChange, setIsItemsChange] = useState<boolean>(false);

  const history = useHistory();
  const routeChange = (path: string) => {
    history.push(path);
  };

  const resetSearch = () => {
    setNameOrTickerPart('');
    setSearchInputValue('');
  };
  const resetFilter = () => {
    setCheckedItems({});
  };
  return (
    <Screen>
      <SectorsContext.Provider
        value={{checkedItems,
          setCheckedItems,
          resetFilter,
          isItemsChange,
          setIsItemsChange}}>
        <SearchedContext.Provider
          value={{nameOrTickerPart,
            setNameOrTickerPart,
            searchInputValue,
            setSearchInputValue,
            resetSearch}}>
          <Container>
            <PageTitle>Top Assets by Market Cap</PageTitle>
            <PageSubtitle/>
            <Search routeChange={routeChange}/>
            <Sort path={match.path}/>
          </Container>
          <ScreenContent>
            <Assets currentPage={match.params.currentPage} path={match.path} routeChange={routeChange}/>
          </ScreenContent>
        </SearchedContext.Provider>
      </SectorsContext.Provider>
    </Screen>
  );
};

export default withRouter(Home);
