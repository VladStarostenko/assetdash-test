import React from 'react';
import styled from 'styled-components';

export interface MetricProps {
  label: string;
  typeOfAsset: string;
  className?: string;
}

export const MetricButton = ({label, className, typeOfAsset}: MetricProps) => (
  <MetricLabel className={className || ''}>
    <Text>{label}</Text>
    <TypeBlock>
      <TypeTitle>{typeOfAsset}</TypeTitle>
    </TypeBlock>
  </MetricLabel>
);

const MetricLabel = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;
  cursor: pointer;
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  color: ${({theme}) => theme.colors.colorPrimary};
  margin-right: 10px;
  display: inline;
`;

const TypeBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2px;
  width: auto;
  left: 380px;
  top: 527px;
  background: rgba(33, 206, 153, 0.2);
  border-radius: 2px;
`;

const TypeTitle = styled.p`
  position: static;
  height: 10px;
  left: 4px;
  top: 1px;
  display:inline;
  float:right;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 8px;
  line-height: 10px;
  color: #0EC08A;
`;
