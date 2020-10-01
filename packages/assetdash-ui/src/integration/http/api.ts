import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

export class Api {
  private instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  getAllAssets() {
    return this.instance.get('assets');
  };

  getPage(currentPage: number, perPage: number, typesOfAssets: string[]) {
    return this.instance.get('assets', {params: {currentPage, perPage, typesOfAssets}});
  };

  getWatchList(tickers: string, typesOfAssets: string[]) {
    return this.instance.get('watchlist', {params: {tickers, typesOfAssets}});
  };

  searchAssets(nameOrTickerPart: string) {
    return this.instance.get('assets', {params: {nameOrTickerPart}});
  }

  getAssetsForSectors(currentPage: number, perPage: number, sector: string) {
    return this.instance.get('assets', {params: {currentPage, perPage, sector}});
  }
}
