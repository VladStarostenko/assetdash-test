import styled from 'styled-components';

export const PageTitle = styled.h1`
  margin-bottom: 24px;
  font-weight: bold;
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  color: ${({ theme }) => theme.colors.colorPrimary};

  @media(max-width: 990px) {
    font-size: 24px;
    line-height: 29px;
  }

  @media(max-width: 600px) {
    font-size: 18px;
    line-height: 22px;
  }
`;
