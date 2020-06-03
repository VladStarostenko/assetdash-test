import React from 'react';
import { Screen, ScreenContent } from '../common/Screen';
import { Container } from '../common/Container';
import { PageTitle } from '../common/Text/PageTitle';
import { Search } from '../common/Search/Search';
import { Sort } from '../common/Sort/Sort';
import { Assets } from '../common/Assets/Assets';

export const Home = () => {
  return (
    <Screen>
      <Container>
        <PageTitle>Top Asset by Market Cap</PageTitle>
        <Search/>
        <Sort/>
      </Container>
      <ScreenContent>
        <Container></Container>
        <Assets/>
      </ScreenContent>
    </Screen>
  );
};
