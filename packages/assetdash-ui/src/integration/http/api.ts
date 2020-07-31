import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

export class Api {
  private instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  getAllAssets() {
    return this.instance.get('assets');
  };

  getPage(currentPage: number, perPage: number) {
    return this.instance.get('assets', {params: {currentPage, perPage}});
  };

  getPageForWatchList(currentPage: number, perPage: number, watchList: string) {
    return this.instance.get('assets', {params: {currentPage, perPage, watchList}});
  };

  searchAssets(nameOrTickerPart: string) {
    return this.instance.get('assets', {params: {nameOrTickerPart}});
  }

  getAssetsForSectors(currentPage: number, perPage: number, sectors: string[]) {
    return this.instance.get('assets', {params: {currentPage, perPage, sectors}});
  }

  getAssetsForSectorsForWatchList(currentPage: number, perPage: number, sectors: string[], watchList: string) {
    return this.instance.get('assets', {params: {currentPage, perPage, sectors, watchList}});
  }
}
