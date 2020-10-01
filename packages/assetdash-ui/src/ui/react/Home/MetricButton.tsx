import React from 'react';
import styled, {css} from 'styled-components';

export interface MetricProps {
  name: string;
  label: string;
  isMetricActive: boolean;
  className?: string;
  onMetricButtonClick: () => void;
}

export const MetricButton = ({name, className, isMetricActive, label, onMetricButtonClick}: MetricProps) => (
  <MetricLabel className={className || ''} onClick={onMetricButtonClick}>
    <Label isMetricActive={isMetricActive}>{name}</Label>
    <TypeBlock>
      <TypeTitle>{label}</TypeTitle>
    </TypeBlock>
  </MetricLabel>
);

const MetricLabel = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;
  cursor: pointer;
  height: 100%;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${({theme}) => theme.colors.colorSecondary};
  background-color: ${({theme}) => theme.colors.backgroundPrimary};
  border-radius: 2px;
  border: none;
  outline: none;
`;

interface LabelProps {
  isMetricActive: boolean;
}

const activeMetricStyles = css`
  font-weight: bold;
  color: ${({theme}) => theme.colors.colorPrimary};
`;

const Label = styled.p<LabelProps>`
  font-size: 14px;
  line-height: 18px;
  margin-right: 10px;
  display: inline;
  color: ${({theme}) => theme.colors.colorSecondary};
  ${({isMetricActive}) => isMetricActive && activeMetricStyles}
`;

const TypeBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2px;
  width: auto;
  background: rgba(33, 206, 153, 0.2);
  border-radius: 2px;
`;

const TypeTitle = styled.p`
  position: static;
  height: 10px;
  display:inline;
  float:right;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 8px;
  line-height: 10px;
  color: #0EC08A;
`;
