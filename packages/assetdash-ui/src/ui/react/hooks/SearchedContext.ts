import {createContext} from 'react';

export interface SearchedContext {
  nameOrTickerPart: string;
  setNameOrTickerPart(arg: string): void;
  searchInputValue: string;
  setSearchInputValue(arg: string): void;
  resetSearch(): void;
}

export const SearchedContext = createContext<SearchedContext>({
  nameOrTickerPart: '',
  setNameOrTickerPart: () => { /**/ },
  searchInputValue: '',
  setSearchInputValue: () => { /**/ },
  resetSearch: () => { /**/ }
});
