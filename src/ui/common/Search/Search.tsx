import React from 'react';
import styled from 'styled-components';
import searchIcon from '../../../assets/icons/search.svg';

export const Search = () => (
  <SearchWrapper>
    <SearchInput placeholder="Search asset"/>
    <SearchButton/>
  </SearchWrapper>
);

const SearchWrapper = styled.div`
  position: relative;
  max-width: 770px;
  width: 100%;
  height: 64px;
  margin: 32px auto 48px;

  @media(max-width: 990px) {
    margin-bottom: 40px;
  }

  @media(max-width: 600px) {
    height: 56px;
    margin-top: 12px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 22px 54px 22px 16px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 2px;
  border: none;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.colorPrimary};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.borderPrimary};

  &::-webkit-input-placeholder {
    font-size: 16px;
    line-height: 19px;
    color: #8395AE;
  }
  &::-moz-placeholder {
    font-size: 16px;
    line-height: 19px;
    color: #8395AE;
  }
  &:-ms-input-placeholder {
    font-size: 16px;
    line-height: 19px;
    color: #8395AE;
  }
  &:-moz-placeholder {
    font-size: 16px;
    line-height: 19px;
    color: #8395AE;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  width: 48px;
  height: 48px;
  transform: translateY(-50%);
  padding: 0;
  border-radius: 2px;
  background: #21CE99 url(${searchIcon}) center no-repeat;
  box-shadow: 0px 4px 12px rgba(33, 206, 153, 0.4);
  border: none;

  @media(max-width: 600px) {
    width: 40px;
    height: 40px;
  }
`;
