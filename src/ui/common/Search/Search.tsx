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
  margin: 24px auto 48px;
  border: 1px solid #E7EBF2;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 22px 54px 22px 16px;
  background: #FFFFFF;
  border-radius: 2px;
  border: none;
  font-size: 16px;
  line-height: 19px;
  color: #1F3840;

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
  border: none;
  border: none;
`;
