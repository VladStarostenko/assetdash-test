import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import angle from '../../assets/icons/angle-right-bright.svg';

interface TooltipProps extends TooltipBodyProps {
  text: string;
  link: string;
  children: ReactNode
}

export const Tooltip = ({ text, link, children, position }: TooltipProps) => (
  <TooltipWrapper>
    {children}
    <TooltipBody position={position}>
      <p>{text}</p>
      <TooltipLink href={link}>Learn more</TooltipLink>
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
  color: #1F3840;
  background: #FFFFFF;
  border: 1px solid #E7EBF2;
  box-shadow: 0px 4px 8px #EBF3F5;
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
    border-bottom-color: #EBF3F5;
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
    border-bottom-color: white;
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
  color: #8395AE;

  &:hover ${TooltipBody} {
    display: inline-block;
  }
`;

const TooltipLink = styled.a`
  position: relative;
  display: inline-block;
  margin-top: 8px;
  padding-right: 23px;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #1F3840;

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    right: 0;
    width: 6px;
    height: 10px;
    background: url(${angle}) center no-repeat;
    background-size: contain;
  }
`;
