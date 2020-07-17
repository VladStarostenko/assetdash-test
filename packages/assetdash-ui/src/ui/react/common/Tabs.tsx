import React from 'react';
import styled, {css} from 'styled-components';
import {Asset} from '../../../core/models/asset';

export interface AssetsProps {
  activeTab: string;
  tabs: Array<string>;
  setTab: (tab: string) => void;
  currentPage?: string;
  path?: string;
  searchedData?: Asset[];
  isSearchLineEmpty: boolean;
}

export const Tabs = ({activeTab, setTab, tabs}: AssetsProps) => (
  <TabsRow>
    {tabs.map((tab, index) => (
      <TabButton
        key={index}
        isActive={activeTab === tab}
        onClick={() => setTab(tab)}
      >
        {tab}
      </TabButton>
    ))}
  </TabsRow>
);

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
