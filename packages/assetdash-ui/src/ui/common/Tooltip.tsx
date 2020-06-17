import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface TooltipProps extends TooltipBodyProps {
  text: string;
  children: ReactNode
}

export const Tooltip = ({ text, children, position }: TooltipProps) => (
  <TooltipWrapper>
    {children}
    <TooltipBody position={position}>
      <p>{text}</p>
    </TooltipBody>
  </TooltipWrapper>
);

const tooltipRightPositionStyles = css`
  left: auto;
  transform: translate(0, 100%);
  right: 0;

  &::before {
    left: auto;
    right: 25px;
  }

  &::after {
    left: auto;
    right: 27px;
  }
`;

const tooltipLefttPositionStyles = css`
  left: 0;
  transform: translate(0, 100%);

  &::before {
    left: 25px;
  }

  &::after {
    left: 27px;
  }
`;

interface TooltipBodyProps {
  position?: 'left' | 'top' | 'bottom' | 'right'
}

const TooltipBody = styled.div<TooltipBodyProps>`
  display: none;
  position: absolute;
  bottom: -7px;
  left: 50%;
  transform: translate(-50%, 100%);
  width: 300px;
  padding: 16px;
  white-space: normal;
  text-align: left;
  font-size: 14px;
  font-weight: normal;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.colorPrimary};
  background: ${({ theme }) => theme.colors.tooltipBackground};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.tooltipBorder};
  box-shadow: ${({ theme }) => theme.colors.boxShadowSecondary};
  border-radius: 2px;
  z-index: 2;

  &::before {
    content: '';
    display: block;  
    position: absolute;
    left: 140px;
    bottom: 100%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: ${({ theme }) => theme.colors.tooltipBorder};
  }
  &:after {
    content: '';
    display: block;  
    position: absolute;
    left: 142px;
    bottom: 100%;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-bottom-color: ${({ theme }) => theme.colors.tooltipBackground};
  }

  ${({ position }) => position === 'right' && tooltipRightPositionStyles}
  ${({ position }) => position === 'left' && tooltipLefttPositionStyles}
`;

const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.colorSecondary};

  &:hover ${TooltipBody} {
    display: inline-block;
  }
`;
