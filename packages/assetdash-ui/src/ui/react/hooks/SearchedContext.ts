import {createContext} from 'react';
import {Asset} from '../../../core/models/asset';

export interface SearchedContext {
  isSearchLineEmpty: boolean;
  setIsSearchLineEmpty(arg: boolean): void;
  searchedData?: Asset[];
  setSearchedData(arg: Asset[]): void;
}

export const SearchedContext = createContext<SearchedContext | any>({isSearchLineEmpty: true});
