import React from 'react';
import {Container} from '../common/Container';
import {ButtonsRow} from '../common/Button/ButtonsRow';
import {Tabs, AssetsProps} from '../common/Tabs';
import {EmptyWatchList} from './EmptyWatchList';

export const WatchList = (props: AssetsProps) => (
  <>
    <Container>
      <ButtonsRow>
        <Tabs {...props}/>
      </ButtonsRow>
      <EmptyWatchList/>
    </Container>
  </>
);
