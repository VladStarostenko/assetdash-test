import React from 'react';
import { Checkbox, CheckboxProps } from '../Checkbox/Checkbox';
import styled from 'styled-components';

export interface SortCheckboxProps extends CheckboxProps {
  icon: string;
  label: string;
  className?: string
}

export const SortCheckbox = ({ icon, label, name, value, onChange, className }: SortCheckboxProps) => (
  <CheckboxLabel className={className || ''}>
    <CheckboxIconWrapper>
      <img src={icon}/>
    </CheckboxIconWrapper>
    <CheckboxText>{label}</CheckboxText>
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
  width: 100%;
  padding: 8px;
`;

const CheckboxIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-right: 12px;
  background: ${({ theme }) => theme.colors.sortIconBackground};
  border-radius: 2px;
`;

const CheckboxText = styled.p`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.colorPrimary};
  margin-right: auto;
`;
