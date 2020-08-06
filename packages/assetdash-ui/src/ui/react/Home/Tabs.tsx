import React, {useEffect, useState} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import styled, {css} from 'styled-components';

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState<string>('Assets');
  const tabs = ['Assets', 'Watchlist'];

  const history = useHistory();

  function usePathUpdate() {
    const watchlistMatch = useRouteMatch('/watchlist');

    useEffect(() => {
      setActiveTab(watchlistMatch ? 'Watchlist' : 'Assets');
    }, [watchlistMatch]);
  }

  usePathUpdate();

  const onClickTabButton = (tab: string) => {
    if (tab === 'Watchlist') {
      history.push('/watchlist');
    } else {
      history.push('/');
    }
    setActiveTab(tab);
  };

  return <>
    <TabsRow>
      {tabs.map((tab, index) => (
        <TabButton
          key={index}
          isActive={activeTab === tab}
          onClick={() => onClickTabButton(tab)}
          data-testid={`tab-${tab}${activeTab === tab ? '-active' : ''}`}
        >
          {tab}
        </TabButton>
      ))}
    </TabsRow>
  </>;
};

const TabsRow = styled.div`
  display: flex;
  height: 48px;
  padding: 4px;
  background-color: ${({theme}) => theme.colors.backgroundPrimary};
  border-radius: 2px;
`;

interface TabButtonProps {
  isActive: boolean;
}

const activeTabButtonStyles = css`
  color: #FFFFFF;
  background: #21CE99;
`;

const TabButton = styled.button<TabButtonProps>`
  height: 100%;
  padding: 0 24px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${({theme}) => theme.colors.colorSecondary};
  background-color: ${({theme}) => theme.colors.backgroundPrimary};
  border-radius: 2px;
  border: none;
  outline: none;
  cursor: pointer;

  ${({isActive}) => isActive && activeTabButtonStyles}
`;
