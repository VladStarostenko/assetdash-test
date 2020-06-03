import styled from 'styled-components';
import angleIcon from '../../../assets/icons/angle.svg';

interface SortDropdownButtonProps {
  isExpanded: boolean
}

export const SortDropdownButton = styled.button<SortDropdownButtonProps>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px 30px 16px 12px;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  text-align: left;
  color: #1F3840;
  background: #FFFFFF;
  border: 1px solid #EEF2FA;
  border-radius: 2px;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 22px;
    width: 10px;
    height: 6px;
    transform: ${({ isExpanded }) => isExpanded ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'};
    background: url(${angleIcon}) center no-repeat;
    background-size: contain;
  }
`;

export const SortDropdownContent = styled.ul`
  position: absolute;
  right: 0;
  bottom: -15px;
  transform: translateY(100%);
  width: 254px;
  max-height: 544px;
  padding: 8px;
  background: #FFFFFF;
  border: 1px solid #EEF2FA;
  box-shadow: 0px 4px 8px #EBF3F5;
  border-radius: 2px;
  overflow-y: auto;
  z-index: 1;
`;
