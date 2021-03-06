import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import styled, {css} from 'styled-components';
import angleDarkIcon from '../../assets/icons/angle-down-secondary-darkTheme.svg';
import angleLightIcon from '../../assets/icons/angle-down-secondary-lightTheme.svg';
import angleActiveIcon from '../../assets/icons/angle-down-light.svg';
import {ThemeContext} from '../Theme/ThemeContextProvider';
import {MetricButton} from './MetricButton';
import {getQueryParam} from '../helpers/queryString';
import {addParamToURL, deleteParamFromURL} from '../../../core/utils';
import {MetricName, metrics} from '../../../core/models/metrics';
import {getMetricParam} from '../helpers/getMetricParam';

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState<string>('Assets');
  const [activeButton, setActiveButton] = useState<string>('Assets');
  const [isExpanded, setIsExpanded] = useState(false);
  const [checkedMetric, setCheckedMetric] = useState<MetricName>('Dash');
  const [theme] = useContext(ThemeContext);
  const tabs = ['Assets', 'Watchlist'];
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    isExpanded ? setActiveButton('View') : setActiveButton(activeTab);
  }, [activeTab, isExpanded]);

  function usePathUpdate() {
    const watchlistMatch = useRouteMatch('/watchlist');

    useEffect(() => {
      setActiveTab(watchlistMatch ? 'Watchlist' : 'Assets');
    }, [watchlistMatch]);
  }

  function usePageUpdate() {
    useEffect(() => {
      const metric = getQueryParam('m', location) as MetricName;
      setCheckedMetric(metric || 'Dash');
    }, [location]);
  }

  usePathUpdate();
  usePageUpdate();

  const onClickTabButton = (tab: string) => {
    const metricParam = getMetricParam(location);
    if (tab === 'Watchlist') {
      history.push('/watchlist' + metricParam);
    } else {
      history.push('/' + metricParam);
    }
    setActiveTab(tab);
  };

  const onDropdownButtonClick = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const onMetricButtonClick = useCallback((label: MetricName) => {
    setCheckedMetric(label);
    setIsExpanded(false);
    const newPath = label !== 'Dash' ? addParamToURL(location, 'm', label) : deleteParamFromURL(location, 'm');
    history.push(newPath);
  }, [checkedMetric, isExpanded]);

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
        data-testid='tab-dropdown-button'
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
        {metrics.map(({name, label}, index) => (
          <li key={index}>
            <MetricButton
              isMetricActive={checkedMetric === name}
              label={label}
              name={name}
              onMetricButtonClick={() => onMetricButtonClick(name)}
            />
          </li>
        ))}
      </TabDropdownContent>

      }
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
  background-color: ${({theme}) => theme.colors.backgroundPrimary};
  border: 1px solid;
  border-color: ${({theme}) => theme.colors.borderSecondary};
  box-shadow: ${({theme}) => theme.colors.boxShadowSecondary};
  border-radius: 2px;
  overflow-y: auto;
  z-index: 1;
`;
