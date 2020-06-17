import React from 'react';
import { Container } from '../common/Container';
import { ButtonsRow } from '../common/Button/ButtonsRow';
import { Tabs, TabsProps } from '../common/Tabs';
import { EmptyWatchList } from './EmptyWatchList';

export const WatchList = (props: TabsProps) => (
  <>
    <Container>
      <ButtonsRow>
        <Tabs {...props}/>
      </ButtonsRow>
      <EmptyWatchList/>
    </Container>
  </>
);
