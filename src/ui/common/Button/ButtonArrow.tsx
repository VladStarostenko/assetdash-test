import React from 'react';
import { ButtonTertiary } from './ButtonTertiary';
import styled from 'styled-components';
import arrowIcon from '../../../assets/icons/arrow-right.svg';

interface ButtonArrowProps {
  children: string;
  direction: 'right' | 'left'
}

export const ButtonArrow = ({ children, direction }: ButtonArrowProps) => (
  <Button>
    {direction === 'left' && <ArrowLeftIcon src={arrowIcon} alt="arrow"/>}
    {children}
    {direction === 'right' && <ArrowRightIcon src={arrowIcon} alt="arrow"/>}
  </Button>
);

const Button = styled(ButtonTertiary)`
  margin-right: 16px;
  padding: 0 16px;
`;

const ArrowLeftIcon = styled.img`
  margin-left: 13px;
  transform: rotate(180deg);
`;

const ArrowRightIcon = styled.img`
  margin-left: 13px;
`;
