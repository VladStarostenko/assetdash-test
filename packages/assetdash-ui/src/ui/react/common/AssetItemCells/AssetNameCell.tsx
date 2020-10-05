import React, {useEffect, useRef, useState} from 'react';
import {Tooltip} from '../Tooltip';
import styled from 'styled-components';

interface AssetNameCellProps {
  type: string;
  ticker: string;
  name: string;
}

export const AssetNameCell = ({type, ticker, name}: AssetNameCellProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const showTooltip = () => {
    const element = ref.current;
    if (element && element.scrollHeight > element.clientHeight) {
      setIsTooltipVisible(true);
    } else setIsTooltipVisible(false);
  };

  useEffect(() => {
    showTooltip();
    window.addEventListener('resize', showTooltip);
    return () => window.removeEventListener('resize', showTooltip);
  }, []);

  return (
    <AssetName data-testid={'asset-row-name'}>
      <img
        src={
          (type === 'Cryptocurrency'
            ? require(`../../../assets/crypto-icons/${ticker.toLowerCase()}.svg`)
            : require(`../../../assets/stocks-icons/${ticker.toUpperCase()}.png`))
        }
        width="32"
        alt={`${name} logo`}
      />
      <Tooltip text={name} isVisible={isTooltipVisible}>
        <span ref={ref}>{name}</span>
      </Tooltip>
    </AssetName>
  );
};

const AssetName = styled.div`
  display: flex;
  align-items: center;

  span {
    max-height: 38px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: ${({theme}) => theme.colors.colorPrimary};
  }

  img {
    margin-right: 8px;
  }
`;
