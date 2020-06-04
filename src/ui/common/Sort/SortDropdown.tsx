import styled from 'styled-components';
import angleDarkIcon from '../../../assets/icons/angle.svg';
import angleLightIcon from '../../../assets/icons/angle-down-light.svg';

interface SortDropdownButtonProps {
  isExpanded: boolean;
  themeMode: string
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
  background: ${({ theme }) => theme.colors.sortCheckboxBackground};
  color: ${({ theme }) => theme.colors.colorPrimary};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.borderSecondary};
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
    background-image: ${({ themeMode }) => themeMode === 'light' ? `url(${angleDarkIcon})` : `url(${angleLightIcon})`};
    background-repeat: no-repeat;
    background-position: center;
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
  background: ${({ theme }) => theme.colors.sortCheckboxBackground};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.borderSecondary};
  box-shadow: ${({ theme }) => theme.colors.boxShadowSecondary};
  border-radius: 2px;
  overflow-y: auto;
  z-index: 1;
`;
