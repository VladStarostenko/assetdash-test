import React from 'react';
import styled from 'styled-components';

export interface MetricProps {
  label: string;
  className?: string;
}

export const MetricButton = ({label, className}: MetricProps) => (
  <MetricLabel className={className || ''}>
    <Text>{label}</Text>
  </MetricLabel>
);

const MetricLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
  cursor: pointer;
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  color: ${({theme}) => theme.colors.colorPrimary};
  margin-right: auto;
`;
