import React from 'react';
import styled from 'styled-components';
import { Container } from '../common/Container';
import { ButtonsRow } from '../common/Button/ButtonsRow';
import { Tabs, TabsProps } from '../common/Tabs';
import starIcon from '../../assets/icons/star.svg';

export const WatchList = (props: TabsProps) => (
  <>
    <Container>
      <ButtonsRow>
        <Tabs {...props}/>
      </ButtonsRow>
      <EmptyView>
        <img src={starIcon} alt="star"/>
        <EmptyViewTitle>You don’t have any assets added to the watchlist</EmptyViewTitle>
        <EmptyViewText>Use asset list to create watchlist</EmptyViewText>
      </EmptyView>
    </Container>
  </>
);

const EmptyView = styled.div`
  padding: 170px 16px;
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 2px;
  text-align: center;
`;

const EmptyViewTitle = styled.h2`
  margin: 8px 0;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: ${({ theme }) => theme.colors.colorPrimary};
`;

const EmptyViewText = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: ${({ theme }) => theme.colors.colorSecondary};
`;
