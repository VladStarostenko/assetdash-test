import {createContext} from 'react';
import {Asset} from '../../../core/models/asset';

export interface SearchedContext {
  nameOrTickerPart: string;
  setNameOrTickerPart(arg: string): void;
  searchedData: Asset[];
  setSearchedData(arg: Asset[]): void;
  searchInputValue: string;
  setSearchInputValue(arg: string): void;
}

export const SearchedContext = createContext<SearchedContext>({
  nameOrTickerPart: '',
  setNameOrTickerPart: () => { /**/ },
  searchedData: [],
  setSearchedData: () => { /**/ },
  searchInputValue: '',
  setSearchInputValue: () => { /**/ }
});
