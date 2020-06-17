import React, { useRef, useState, ChangeEvent, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { SortCheckbox } from './SortCheckbox';
import internetIcon from '../../../assets/icons/internet.svg';
import financeIcon from '../../../assets/icons/finance.svg';
import homeIcon from '../../../assets/icons/home.svg';
import cartIcon from '../../../assets/icons/shopping-cart.svg';
import healthIcon from '../../../assets/icons/health.svg';
import cloudIcon from '../../../assets/icons/cloud.svg';
import ecommerceIcon from '../../../assets/icons/e-commerce.svg';
import emergingIcon from '../../../assets/icons/emerging.svg';
import airlinesIcon from '../../../assets/icons/airlines.svg';
import carIcon from '../../../assets/icons/car.svg';
import gambleIcon from '../../../assets/icons/gamble.svg';
import goldIcon from '../../../assets/icons/gold.svg';
import cryptoIcon from '../../../assets/icons/crypto.svg';
import cannabisIcon from '../../../assets/icons/cannabis.svg';
import cubeIcon from '../../../assets/icons/cube.svg';
import { SortDropdownButton } from './SortDropdown';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { ThemeContext } from '../../Theme/ThemeContextProvider';
import { DropdownContent } from '../DropdownContent';

export const Sort = () => {
  const [theme] = useContext(ThemeContext);
  const [checkedItems, setCheckedItems] = useState<CheckBox | any>({});
  const [maxElements, setMaxElements] = useState(5);
  const [dropDownWidth, setDropDownWidth] = useState(145);
  const sortListRef = useRef<HTMLUListElement>(null);
  const dropDownRef = useRef<HTMLLIElement>(null);
  const itemWidth = 165;
  const marginRight = 16;
  const maxWidth = (itemWidth + marginRight) * maxElements + dropDownWidth;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
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
    return [...Object.values(checkedItems)].some(value => !!value);
  };

  const [selectedDropdownCheckboxes, setSelectedDropdownCheckboxes] = useState(0);
  useEffect(() => {
    const displayCheckedCheckboxesAmount = () => {
      let amount = 0;
      checkboxes.slice(maxElements).forEach(checkbox => {
        if (checkedItems[checkbox.name]) amount++;
      });
      setSelectedDropdownCheckboxes(amount);
    };
    displayCheckedCheckboxesAmount();
  }, [checkedItems, maxElements]);

  return (
    <SortView>
      <SortRow style={{ maxWidth }}>
        <Title>Sort by sector:</Title>
        <ResetButton isVisible={isResetButtonVisible()} onClick={() => setCheckedItems({})}>Reset filters</ResetButton>
      </SortRow>
      <SortList ref={sortListRef}>
        {checkboxes.slice(0, maxElements).map(({ icon, label, name }, index) => (
          <SortItem key={index} style={{ width: itemWidth, marginRight }}>
            <SortCheckbox
              icon={icon}
              label={label}
              name={name}
              value={checkedItems[name] || false}
              onChange={handleChange}
            />
          </SortItem>
        ))}
        <SortDropdownItem ref={dropDownRef} style={{ width: dropDownWidth }}>
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
              {checkboxes.slice(maxElements).map(({ icon, label, name }, index) => (
                <li key={index}>
                  <SortCheckbox
                    icon={icon}
                    label={label}
                    name={name}
                    value={checkedItems[name] || false}
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
  label: string
}

const checkboxes: Array<CheckBox> = [
  {
    icon: internetIcon,
    name: 'internet',
    label: 'Internet',
  },
  {
    icon: financeIcon,
    name: 'finance',
    label: 'Finance',
  },
  {
    icon: homeIcon,
    name: 'hospitality',
    label: 'Hospitality',
  },
  {
    icon: cartIcon,
    name: 'retail',
    label: 'Retail',
  },
  {
    icon: healthIcon,
    name: 'health',
    label: 'Health',
  },
  {
    icon: cloudIcon,
    name: 'cloud',
    label: 'Cloud',
  },
  {
    icon: ecommerceIcon,
    name: 'eCommerce',
    label: 'E-commerce',
  },
  {
    icon: emergingIcon,
    name: 'emergingMarkets',
    label: 'Emerging Markets ',
  },
  {
    icon: airlinesIcon,
    name: 'airlines',
    label: 'Airlines ',
  },
  {
    icon: carIcon,
    name: 'cars',
    label: 'Cars ',
  },
  {
    icon: gambleIcon,
    name: 'gamble',
    label: 'Gamble ',
  },
  {
    icon: goldIcon,
    name: 'gold',
    label: 'Gold ',
  },
  {
    icon: cryptoIcon,
    name: 'cryptocurrencies',
    label: 'Cryptocurrencies ',
  },
  {
    icon: cannabisIcon,
    name: 'cannabis',
    label: 'Cannabis ',
  },
  {
    icon: cubeIcon,
    name: 'etfs',
    label: 'ETFs ',
  },
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
  isVisible: boolean
}

const ResetButton = styled.button<ResetButtonProps>`
  visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
  padding: 0;
  border: none;
  background: none;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: ${({ theme }) => theme.colors.colorPrimary};
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
  background-color: ${({ theme }) => theme.colors.sortCheckboxBackground};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.sortCheckboxBorder};
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
