import React from 'react';
import styled from 'styled-components';
import checkmark from '../../../assets/icons/checkmark.svg';

export interface CheckboxProps {
  id: string;
  value: boolean;
  onChange: (value: boolean) => void
}

export const Checkbox = ({ id, value, onChange }: CheckboxProps) => (
  <CheckboxWrapper onClick={() => onChange(!value)}>
    <HiddenCheckbox id={id || ''} onChange={() => onChange(!value)} checked={value}/>
    <StyledCheckbox checked={value}/>
  </CheckboxWrapper>
);

const CheckboxWrapper = styled.div`
  width: 16px;
  height: 16px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  height: 0;
  z-index: -1;
  opacity: 0;
`;

interface StyledCheckboxProps {
  checked: boolean
}

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  width: 100%;
  height: 100%;
  background-color: ${props => (props.checked ? `#21CE99` : '#fff')};
  background-image: ${props => (props.checked ? `url(${checkmark})` : 'none')};
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid;
  border-color: ${props => (props.checked ? `#21CE99` : '#D8E0E3')};
  border-radius: 2px;
`;
