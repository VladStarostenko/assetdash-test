import React from 'react';
import styled from 'styled-components';

export interface TextWithIconProps {
  icon: string;
  text: string
}

export const TextWithIcon = ({ icon, text }: TextWithIconProps) => (
  <Row>
    <IconWrapper>
      <img src={icon}/>
    </IconWrapper>
    <Text>{text}</Text>
  </Row>
);

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-right: 12px;
  background: ${({ theme }) => theme.colors.sortIconBackground};
  border-radius: 2px;
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.colorPrimary};
  margin-right: auto;
`;
