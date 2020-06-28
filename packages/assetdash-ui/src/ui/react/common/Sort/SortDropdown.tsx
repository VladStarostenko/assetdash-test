import styled from 'styled-components';
import angleDarkIcon from '../../../assets/icons/angle.svg';
import angleLightIcon from '../../../assets/icons/angle-down-light.svg';

interface SortDropdownButtonProps {
  isExpanded: boolean;
  themeMode: string;
}

export const SortDropdownButton = styled.button<SortDropdownButtonProps>`
  position: relative;
  width: 100%;
  height: 48px;
  padding: 0 30px 0 12px;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  text-align: left;
  background: ${({theme}) => theme.colors.sortCheckboxBackground};
  color: ${({theme}) => theme.colors.colorPrimary};
  border: 1px solid;
  border-color: ${({theme}) => theme.colors.borderSecondary};
  border-radius: 2px;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 22px;
    width: 10px;
    height: 6px;
    transform: ${({isExpanded}) => isExpanded ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'};
    background-image: ${({themeMode}) => themeMode === 'light' ? `url(${angleDarkIcon})` : `url(${angleLightIcon})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
`;
