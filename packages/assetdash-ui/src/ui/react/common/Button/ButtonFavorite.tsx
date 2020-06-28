import React from 'react';
import styled from 'styled-components';
import starUnfilledIcon from '../../../assets/icons/star-unfilled.svg';
import starFilledIcon from '../../../assets/icons/star-filled.svg';

export interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export const ButtonFavorite = ({checked, onChange}: CheckboxProps) => (
  <CheckboxWrapper>
    <HiddenCheckbox onChange={onChange} checked={checked}/>
    <StyledCheckbox checked={checked}/>
  </CheckboxWrapper>
);

const CheckboxWrapper = styled.label`
  position: relative;
  display: block;
  width: 20px;
  height: 20px;
`;

const HiddenCheckbox = styled.input.attrs({type: 'checkbox'})`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  height: 0;
  z-index: -1;
  opacity: 0;
`;

interface StyledCheckboxProps {
  checked: boolean;
}

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  width: 20px;
  height: 20px;
  background-image: ${props => (props.checked ? `url(${starFilledIcon})` : `url(${starUnfilledIcon})`)};
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;
