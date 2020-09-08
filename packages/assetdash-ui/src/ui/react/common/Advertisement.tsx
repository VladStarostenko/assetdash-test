import React from 'react';
import ad from '../../assets/ad/Assetdash@2x.png';
import styled from 'styled-components';

export const Advertisement = () => (
  <div className="container">
    <a
      href="https://unstoppabledomains.com/r/da702815756540f"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Add src={ad} alt="ad"/>
    </a>
  </div>
);

const Add = styled.img`
  width: 100%;
`;
