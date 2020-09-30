import React from 'react';
import styled from 'styled-components';
import starIcon from '../../assets/icons/star.svg';

export const EmptyWatchList = () => (
  <EmptyView>
    <img src={starIcon} alt="star"/>
    <EmptyViewTitle data-testid="emptyWatchlistTitle">You have not added any assets to your watchlist</EmptyViewTitle>
    <EmptyViewText>Use the Asset Leaderboard to build your watchlist</EmptyViewText>
  </EmptyView>
);

const EmptyView = styled.div`
  padding: 170px 16px;
  background: ${({theme}) => theme.colors.backgroundPrimary};
  border-radius: 2px;
  text-align: center;
`;

const EmptyViewTitle = styled.h2`
  margin: 8px 0;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: ${({theme}) => theme.colors.colorPrimary};
`;

const EmptyViewText = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: ${({theme}) => theme.colors.colorSecondary};
`;
