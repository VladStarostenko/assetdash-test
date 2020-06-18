import React, {useContext, useState, useRef} from 'react';
import styled from 'styled-components';
import {IconButton} from '../Button/IconButton';
import linkIconDark from '../../../assets/icons/external-link.svg';
import linkIconLight from '../../../assets/icons/external-link-light.svg';
import {ThemeContext} from '../../Theme/ThemeContextProvider';
import {DropdownContent} from '../DropdownContent';
import {TextWithIcon, TextWithIconProps} from '../Text/TextWithIcon';
import twitterIcon from '../../../assets/icons/twitter.svg';
import telegramIcon from '../../../assets/icons/telegram.svg';
import alphaIcon from '../../../assets/icons/alpha.svg';
import {useOutsideClick} from '../../hooks/useOutsideClick';

export const SocialDropdown = () => {
  const [theme] = useContext(ThemeContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  useOutsideClick(dropdownRef, () => isExpanded && setIsExpanded(false));

  return (
    <SocialDropdownWrapper>
      <IconButton onClick={() => setIsExpanded(!isExpanded)}>
        <img src={theme === 'light' ? linkIconDark : linkIconLight} alt="link"/>
      </IconButton>
      {isExpanded &&
        <SocialDropdownContent ref={dropdownRef}>
          <SocialItem
            href="#"
            icon={twitterIcon}
            text="Twitter"
          />
          <SocialItem
            href="#"
            icon={telegramIcon}
            text="Telegram"
          />
          <SocialItem
            href="#"
            icon={alphaIcon}
            text="SeekingAlpha"
          />
        </SocialDropdownContent>
      }
    </SocialDropdownWrapper>
  );
};

interface SocialItemProps extends TextWithIconProps {
  href: string;
}

const SocialItem = ({href, icon, text}: SocialItemProps) => (
  <li>
    <SocialLink href={href}>
      <TextWithIcon
        icon={icon}
        text={text}
      />
    </SocialLink>
  </li>
);

const SocialDropdownWrapper = styled.div`
  position: relative;
  margin-left: 8px;
`;

const SocialLink = styled.a`
  display: block;
  padding: 8px;
`;

const SocialDropdownContent = styled(DropdownContent)`
  bottom: -8px;
  width: 245px;
`;
