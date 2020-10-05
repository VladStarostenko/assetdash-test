import styled from 'styled-components';
import angleUpIcon from '../../assets/icons/angle-up-bright.svg';
import angleDownIcon from '../../assets/icons/angle-down-bright.svg';

interface DashProps {
  direction: 'up' | 'down';
}

export const Dash = styled.p<DashProps>`
  position: relative;
  display: inline-block;
  padding-left: 22px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: ${({direction}) => direction === 'up' ? 'translateY(-50%) rotate(180deg);' : 'translateY(-50%);'}
    width: 10px;
    height: 6px;
    background: ${({direction}) => direction === 'up'
    ? `url(${angleUpIcon}) no-repeat center;` : `url(${angleDownIcon}) no-repeat center;`}
    background-size: contain;
  }
`;
