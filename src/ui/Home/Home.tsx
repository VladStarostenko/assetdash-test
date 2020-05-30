import React from 'react';
import { Screen } from '../common/Screen';
import { Container } from '../common/Container';
import { PageTitle } from '../common/Text/PageTitle';
import { Search } from '../common/Search/Search';
import { Sort } from '../common/Sort/Sort';

export const Home = () => (
  <Screen>
    <Container>
      <PageTitle>Top Asset by Market Cap</PageTitle>
      <Search/>
      <Sort/>
    </Container>
  </Screen>
);
