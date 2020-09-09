import React from 'react';
import adImage from '../../assets/ad/Assetdash@2x.png';
import styled from 'styled-components';

export const Advertisement = () => (
  <div>
    <a
      href="https://unstoppabledomains.com/r/da702815756540f"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Ad/>
    </a>
  </div>
);

const Ad = styled.div`
  width: 100%;
  height: 37px;
  background-image: url(${adImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
