import React, {useCallback, useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import searchIcon from '../../../assets/icons/search.svg';
import {debounce} from '../../helpers/debounce';
import {getQueryParam} from '../../helpers/queryString';
import {getMetricParam} from '../../helpers/getMetricParam';

export const Search = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const location = useLocation();
  const history = useHistory();
  const triggerSearch = (value: string) => {
    if (!(value)) {
      const metricParam = getMetricParam(location);
      history.push('/' + metricParam);
    }
    if (value.length > 1) {
      const metricParam = getMetricParam(location);
      const newUrl = metricParam ? '/' + metricParam + `&q=${value}` : `/?q=${value}`;
      history.push(newUrl);
    }
  };

  const debouncedTriggerSearch = useCallback(debounce(triggerSearch, 700), []);

  useEffect(() => {
    const query = getQueryParam('q', location);
    setSearchInputValue(query || '');
  }, [location]);

  const onChangeInput = (value: string) => {
    setSearchInputValue(value);
    debouncedTriggerSearch(value);
  };

  return (
    <SearchWrapper>
      <SearchInput data-testid="search-input"
        onChange={e => onChangeInput(e.target.value)}
        placeholder="Search asset"
        value={searchInputValue}/>
      <SearchButton/>
    </SearchWrapper>
  );
};

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
  background-color: ${({theme}) => theme.colors.backgroundPrimary};
  border-radius: 2px;
  border: none;
  font-size: 16px;
  line-height: 19px;
  color: ${({theme}) => theme.colors.colorPrimary};
  border: 1px solid;
  border-color: ${({theme}) => theme.colors.borderPrimary};

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
