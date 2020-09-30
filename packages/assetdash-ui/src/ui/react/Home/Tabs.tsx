import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import styled, {css} from 'styled-components';
import angleDarkIcon from '../../assets/icons/angle-down-secondary-darkTheme.svg';
import angleLightIcon from '../../assets/icons/angle-down-secondary-lightTheme.svg';
import angleActiveIcon from '../../assets/icons/angle-down-light.svg';
import {ThemeContext} from '../Theme/ThemeContextProvider';
import {MetricButton} from './MetricButton';

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState<string>('Assets');
  const [activeButton, setActiveButton] = useState<string>('Assets');
  const [isExpanded, setIsExpanded] = useState(false);
  const [checkedMetric, setCheckedMetric] = useState<Record<string, boolean>>({Dash: true});
  const [theme] = useContext(ThemeContext);
  const tabs = ['Assets', 'Watchlist'];
  const history = useHistory();

  useEffect(() => {
    isExpanded ? setActiveButton('View') : setActiveButton(activeTab);
  }, [activeTab, isExpanded]);

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

  const onDropdownButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  const onMetricButtonClick = (label: string) => {
    const checkedMetric = {} as Record<string, boolean>;
    checkedMetric[label] = true;
    setCheckedMetric(checkedMetric);
  };

  return <>
    <TabsRow>
      {tabs.map((tab, index) => (
        <TabButton
          key={index}
          isActive={activeButton === tab}
          onClick={() => onClickTabButton(tab)}
          data-testid={`tab-${tab}${activeTab === tab ? '-active' : ''}`}
        >
          {tab}
        </TabButton>
      ))}
      <TabDropdownButton
        key={3}
        isActive={activeButton === 'View'}
        isExpanded={isExpanded}
        onClick={onDropdownButtonClick}
        themeMode={theme}
      >
        View
      </TabDropdownButton>
      {isExpanded &&
      <TabDropdownContent>
        {metrics.map(({label, typeOfAssets}, index) => (
          <li key={index}>
            <MetricButton
              isMetricActive={checkedMetric[label]}
              typeOfAsset={typeOfAssets}
              label={label}
              onMetricButtonClick={() => onMetricButtonClick(label)}
            />
          </li>
        ))}
      </TabDropdownContent>

      }
    </TabsRow>
  </>;
};

export interface Metric {
  label: string;
  typeOfAssets: string;
}

const metrics: Array<Metric> = [
  {
    label: 'Dash',
    typeOfAssets: 'ALL'
  }, {
    label: 'Earnings',
    typeOfAssets: 'STOCKS'
  }
];

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

interface TabDropdownButtonProps {
  isActive: boolean;
  isExpanded: boolean;
  themeMode: string;
}

const activeTabButtonStyles = css`
  color: #FFFFFF;
  background: #21CE99;
`;

const activeTabDropdownButtonStyles = css`
  background-image: url(${angleActiveIcon});
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

const TabDropdownButton = styled(TabButton)<TabDropdownButtonProps>`
  padding: 0 72px 0 24px;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 10px;
    margin: 0 29px;
    height: 6px;
    transform: ${({isExpanded}) => isExpanded ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'};
    background-image: ${({themeMode}) => themeMode === 'light' ? `url(${angleLightIcon})` : `url(${angleDarkIcon})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    ${({isActive}) => isActive && activeTabDropdownButtonStyles}
  }
`;

const TabDropdownContent = styled.ul`
  position: absolute;
  bottom: -2px;
  transform: translateY(100%);
  margin-left: 210px;
  width: 131px;
  padding: 8px;
  background: ${({theme}) => theme.colors.sortCheckboxBackground};
  border: 1px solid;
  border-color: ${({theme}) => theme.colors.borderSecondary};
  box-shadow: ${({theme}) => theme.colors.boxShadowSecondary};
  border-radius: 2px;
  overflow-y: auto;
  z-index: 1;
`;
