import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {AssetType} from '../../core/models/metrics';

export class Api {
  private instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  getAllAssets() {
    return this.instance.get('assets');
  };

  getPage(currentPage: number, perPage: number, typesOfAssets: AssetType[]) {
    return this.instance.get('assets', {params: {currentPage, perPage, typesOfAssets}});
  };

  getWatchList(tickers: string, typesOfAssets: AssetType[]) {
    return this.instance.get('watchlist', {params: {tickers, typesOfAssets}});
  };

  searchAssets(nameOrTickerPart: string, typesOfAssets: AssetType[]) {
    return this.instance.get('assets', {params: {nameOrTickerPart, typesOfAssets}});
  }

  getAssetsForSectors(currentPage: number, perPage: number, sector: string, typesOfAssets: AssetType[]) {
    return this.instance.get('assets', {params: {currentPage, perPage, sector, typesOfAssets}});
  }
}
