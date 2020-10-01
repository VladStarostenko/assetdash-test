import React from 'react';
import styled from 'styled-components';
import {Link, useLocation} from 'react-router-dom';
import {getMetricParam} from '../helpers/getMetricParam';

export const Logo = () => {
  const location = useLocation();
  const homeUrl = '/' + getMetricParam(location);

  return (
    <Link to={homeUrl}>
      <LogoText>Asset<span>Dash</span></LogoText>
    </Link>
  );
};

const LogoText = styled.p`
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.04em;
  color: ${({theme}) => theme.colors.logoColor};

  & span {
    font-weight: 700
  }

  @media(max-width: 600px) {
    font-size: 18px;
    line-height: 22px;
  }
`;
