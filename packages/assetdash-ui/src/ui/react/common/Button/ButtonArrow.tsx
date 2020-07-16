import React, {useContext} from 'react';
import {ButtonTertiary} from './ButtonTertiary';
import styled from 'styled-components';
import arrowDarkIcon from '../../../assets/icons/arrow-right.svg';
import arrowLightIcon from '../../../assets/icons/arrow-right-light.svg';
import {ThemeContext} from '../../Theme/ThemeContextProvider';

interface ButtonArrowProps {
  children: string;
  direction: 'right' | 'left';
  onClick(): void;
}

export const ButtonArrow = ({children, direction, onClick}: ButtonArrowProps) => {
  const [theme] = useContext(ThemeContext);
  const arrowIcon = theme === 'light' ? arrowDarkIcon : arrowLightIcon;

  return (
    <Button onClick={onClick}>
      {direction === 'left' && <ArrowLeftIcon src={arrowIcon} alt="arrow"/>}
      {children}
      {direction === 'right' && <ArrowRightIcon src={arrowIcon} alt="arrow"/>}
    </Button>
  );
};

const Button = styled(ButtonTertiary)`
  margin-right: 16px;
  padding: 0 16px;
`;

const ArrowLeftIcon = styled.img`
  margin-right: 13px;
  transform: rotate(180deg);
`;

const ArrowRightIcon = styled.img`
  margin-left: 13px;
`;
