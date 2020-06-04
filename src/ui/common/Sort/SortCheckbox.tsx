import React from 'react';
import { Checkbox, CheckboxProps } from '../Checkbox/Checkbox';
import styled from 'styled-components';
import { TextWithIcon } from '../Text/TextWithIcon';

export interface SortCheckboxProps extends CheckboxProps {
  icon: string;
  label: string;
  className?: string
}

export const SortCheckbox = ({ icon, label, name, value, onChange, className }: SortCheckboxProps) => (
  <CheckboxLabel className={className || ''}>
    <TextWithIcon
      icon={icon}
      text={label}
    />
    <Checkbox
      name={name}
      value={value}
      onChange={onChange}
    />
  </CheckboxLabel>
);

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
`;
