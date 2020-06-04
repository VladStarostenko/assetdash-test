import React from 'react';
import { Container } from '../common/Container';
import { ButtonsRow } from '../common/Button/ButtonsRow';
import { Tabs, TabsProps } from '../common/Tabs';

export const WatchList = (props: TabsProps) => (
  <>
    <Container>
      <ButtonsRow>
        <Tabs {...props}/>
      </ButtonsRow>
    </Container>
  </>
);