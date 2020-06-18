import styled from 'styled-components';

export const OnboardView = styled.div`
  position: relative;
  flex-grow: 1;
  padding: 0 0 100px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 220px;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    z-index: 0;
  }
`;
