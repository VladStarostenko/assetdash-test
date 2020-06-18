import React from 'react';
import styled from 'styled-components';

export const PageSubtitle = () => (
  <Row>
    <Text>Stocks</Text>
    <Text>ETFs</Text>
    <Text>Cryptocurrencies</Text>
  </Row>
);

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const Text = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #8395AE;

  & + & {
    margin-left: 20px;
  }
`;
