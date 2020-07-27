import React, {ChangeEvent} from 'react';
import styled, {css} from 'styled-components';
import checkmark from '../../../assets/icons/checkmark.svg';

export interface CheckboxProps {
  value: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id?: string;
}

export const Checkbox = ({id, value, name, onChange}: CheckboxProps) => (
  <CheckboxWrapper>
    <HiddenCheckbox
      data-testid='sector-checkbox'
      name={name}
      id={id || ''}
      onChange={onChange}
      checked={value}
    />
    <StyledCheckbox checked={value}/>
  </CheckboxWrapper>
);

const CheckboxWrapper = styled.div`
  width: 16px;
  height: 16px;
`;

const HiddenCheckbox = styled.input.attrs({type: 'checkbox'})`
  position: absolute;
  height: 0;
  z-index: -1;
  opacity: 0;
`;

interface StyledCheckboxProps {
  checked: boolean;
}

const checkedStyles = css`
  border-color: #21CE99;
`;

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  width: 100%;
  height: 100%;
  background-color: ${props => (props.checked ? '#21CE99' : 'none')};
  background-image: ${props => (props.checked ? `url(${checkmark})` : 'none')};
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid;
  border-color: ${({theme}) => theme.colors.checkboxBorder};
  border-radius: 2px;

  ${props => props.checked && checkedStyles};
`;
