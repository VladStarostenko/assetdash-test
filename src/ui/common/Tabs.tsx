import React from 'react';
import styled from 'styled-components';

export interface TabsProps {
  activeTab: string;
  tabs: Array<string>;
  setTab: (tab: string) => void
}

export const Tabs = ({ activeTab, setTab, tabs }: TabsProps) => (
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
  background: #FFFFFF;
  border-radius: 2px;
`;

interface TabButtonProps {
  isActive: boolean
}

const TabButton = styled.button<TabButtonProps>`
  height: 100%;
  padding: 0 24px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${({ isActive }) => isActive ? '#FFFFFF' : '#8395AE'};
  background: ${({ isActive }) => isActive ? '#21CE99' : '#fff'};
  border-radius: 2px;
  border: none;
  outline: none;
  cursor: pointer;
`;
