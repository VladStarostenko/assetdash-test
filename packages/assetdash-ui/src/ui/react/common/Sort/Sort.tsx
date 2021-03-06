import React, {ChangeEvent, useContext, useEffect, useRef, useState} from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import styled from 'styled-components';
import airlinesIcon from '../../../assets/icons/airlines.svg';
import cannabisIcon from '../../../assets/icons/cannabis.svg';
import carIcon from '../../../assets/icons/car.svg';
import cloudIcon from '../../../assets/icons/cloud.svg';
import cryptoIcon from '../../../assets/icons/crypto.svg';
import cubeIcon from '../../../assets/icons/cube.svg';
import ecommerceIcon from '../../../assets/icons/e-commerce.svg';
import emergingIcon from '../../../assets/icons/emerging.svg';
import financeIcon from '../../../assets/icons/finance.svg';
import gambleIcon from '../../../assets/icons/gamble.svg';
import goldIcon from '../../../assets/icons/gold.svg';
import healthIcon from '../../../assets/icons/health.svg';
import homeIcon from '../../../assets/icons/home.svg';
import internetIcon from '../../../assets/icons/internet.svg';
import spIcon from '../../../assets/icons/SP500.svg';
import stocksIcon from '../../../assets/icons/stocks.svg';
import cartIcon from '../../../assets/icons/shopping-cart.svg';
import {useOutsideClick} from '../../hooks/useOutsideClick';
import {ThemeContext} from '../../Theme/ThemeContextProvider';
import {DropdownContent} from '../DropdownContent';
import {SortCheckbox} from './SortCheckbox';
import {SortDropdownButton} from './SortDropdown';
import {getMetricParam} from '../../helpers/getMetricParam';

export const Sort = () => {
  const [theme] = useContext(ThemeContext);
  const [maxElements, setMaxElements] = useState(5);
  const [dropDownWidth, setDropDownWidth] = useState(145);
  const sortListRef = useRef<HTMLUListElement>(null);
  const dropDownRef = useRef<HTMLLIElement>(null);
  const [checkedItem, setCheckedItem] = useState<Record<string, boolean>>({});
  const itemWidth = 165;
  const marginRight = 16;
  const maxWidth = (itemWidth + marginRight) * maxElements + dropDownWidth;

  const {sectorName} = useParams();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const checkedItem = {} as Record<string, boolean>;
    checkedItem[sectorName] = !!sectorName;
    setCheckedItem(checkedItem);
  }, [location]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const metricParam = getMetricParam(location);
    if (!event.target.checked) {
      history.push('/' + metricParam);
      return;
    }
    const key = checkboxes.find(({name}) => name === event.target.name)?.key || '';
    history.push(`/${event.target.name}/${key}` + metricParam);
  };

  const resetFilter = () => {
    const metricParam = getMetricParam(location);
    history.push('/' + metricParam);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      if (sortListRef && sortListRef.current) {
        const containerWidth = sortListRef.current.offsetWidth;
        if (document.documentElement.clientWidth <= 600) setDropDownWidth(400);
        else setDropDownWidth(145);
        setMaxElements(Math.floor((containerWidth - itemWidth) / (dropDownWidth + marginRight)));
      }
    };
    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [dropDownWidth]);

  const [isExpanded, setIsExpanded] = useState(false);
  const sortDropdownRef = useRef<HTMLUListElement>(null);
  useOutsideClick(sortDropdownRef, () => isExpanded && setIsExpanded(false));

  const isResetButtonVisible = () => {
    return [...Object.values(checkedItem)].some(value => !!value);
  };

  const [selectedDropdownCheckboxes, setSelectedDropdownCheckboxes] = useState(0);
  useEffect(() => {
    const displayCheckedCheckboxesAmount = () => {
      let amount = 0;
      checkboxes.slice(maxElements).forEach(checkbox => {
        if (checkedItem[checkbox.name]) amount++;
      });
      setSelectedDropdownCheckboxes(amount);
    };
    displayCheckedCheckboxesAmount();
  }, [checkedItem, maxElements]);

  return (
    <SortView>
      <SortRow style={{maxWidth}}>
        <Title>Sort by:</Title>
        <ResetButton isVisible={isResetButtonVisible()} onClick={resetFilter}>Reset filters</ResetButton>
      </SortRow>
      <SortList ref={sortListRef}>
        {checkboxes.slice(0, maxElements).map(({icon, label, name}, index) => (
          <SortItem key={index} style={{width: itemWidth, marginRight}}>
            <SortCheckbox
              icon={icon}
              label={label}
              name={name}
              value={checkedItem[name] || false}
              onChange={handleChange}
            />
          </SortItem>
        ))}
        <SortDropdownItem ref={dropDownRef} style={{width: dropDownWidth}}>
          <SortDropdownButton
            isExpanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            themeMode={theme}
          >
            More
            {selectedDropdownCheckboxes
              ? <SelectedDropdownCheckboxes>{`${selectedDropdownCheckboxes} more selected`}</SelectedDropdownCheckboxes>
              : null
            }
          </SortDropdownButton>
          {isExpanded &&
            <SortDropdownContent ref={sortDropdownRef}>
              {checkboxes.slice(maxElements).map(({icon, label, name}, index) => (
                <li key={index}>
                  <SortCheckbox
                    icon={icon}
                    label={label}
                    name={name}
                    value={checkedItem[name] || false}
                    onChange={handleChange}
                  />
                </li>
              ))}
            </SortDropdownContent>
          }
        </SortDropdownItem>
      </SortList>
    </SortView>
  );
};

export interface CheckBox {
  name: string;
  icon: string;
  label: string;
  key: string;
}

const checkboxes: Array<CheckBox> = [
  {
    icon: stocksIcon,
    name: 'Stock',
    label: 'Stocks',
    key: 'largest-companies-by-market-cap'
  },
  {
    icon: internetIcon,
    name: 'Internet',
    label: 'Internet',
    key: 'internet-stocks'
  },
  {
    icon: homeIcon,
    name: 'Hospitality',
    label: 'Hospitality',
    key: 'hospitality-stocks'
  },
  {
    icon: cartIcon,
    name: 'Retail',
    label: 'Retail',
    key: 'retail-stocks'
  },
  {
    icon: spIcon,
    name: 'SP500',
    label: 'S&P 500',
    key: 'sp-500-companies-by-market-cap'
  },
  {
    icon: financeIcon,
    name: 'Finance',
    label: 'Finance',
    key: 'finance-sector-stocks'
  },
  {
    icon: healthIcon,
    name: 'Health',
    label: 'Health',
    key: 'health-stocks'
  },
  {
    icon: cloudIcon,
    name: 'Cloud',
    label: 'Cloud',
    key: 'cloud-stocks'
  },
  {
    icon: ecommerceIcon,
    name: 'E-commerce',
    label: 'E-commerce',
    key: 'ecommerce-stocks'
  },
  {
    icon: emergingIcon,
    name: 'Emerging Markets',
    label: 'Emerging Markets',
    key: 'emerging-markets-stocks'
  },
  {
    icon: airlinesIcon,
    name: 'Airline',
    label: 'Airlines',
    key: 'airline-stocks'
  },
  {
    icon: carIcon,
    name: 'Cars',
    label: 'Cars',
    key: 'car-stocks'
  },
  {
    icon: gambleIcon,
    name: 'Gamble',
    label: 'Gamble',
    key: 'casino-stocks'
  },
  {
    icon: goldIcon,
    name: 'Gold',
    label: 'Gold',
    key: 'gold-stocks'
  },
  {
    icon: cryptoIcon,
    name: 'Cryptocurrency',
    label: 'Cryptocurrencies',
    key: 'cryptos-market-cap'
  },
  {
    icon: cannabisIcon,
    name: 'Green',
    label: 'Cannabis',
    key: 'cannabis-stocks'
  },
  {
    icon: cubeIcon,
    name: 'ETFs',
    label: 'ETFs',
    key: 'etfs'
  }
];

const Title = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #8395AE;
`;

const SortView = styled.div`
  padding-bottom: 48px;

  @media (max-width: 990px) {
    padding-bottom: 24px;
  }
`;

const SortRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    & {
      max-width: 100% !important;
    }
  }
`;

interface ResetButtonProps {
  isVisible: boolean;
}

const ResetButton = styled.button<ResetButtonProps>`
  visibility: ${({isVisible}) => isVisible ? 'visible' : 'hidden'};
  padding: 0;
  border: none;
  background: none;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: ${({theme}) => theme.colors.colorPrimary};
`;

const SortList = styled.ul`
  display: flex;
  align-items: center;
  max-width: 1100px;
  margin-top: 8px;
`;

const SortItem = styled.li`
  position: relative;
  height: 48px;
  background-color: ${({theme}) => theme.colors.sortCheckboxBackground};
  border: 1px solid;
  border-color: ${({theme}) => theme.colors.sortCheckboxBorder};
  border-radius: 2px;
`;

const SortDropdownContent = styled(DropdownContent)`
  @media(max-width: 600px) {
    width: 100%;
  }
`;

const SortDropdownItem = styled.li`
  position: relative;

  @media(max-width: 600px) {
    min-width: 100%;
  }
`;

const SelectedDropdownCheckboxes = styled.span`
  display: block;
  margin-top: 2px;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #21CE99;
`;
