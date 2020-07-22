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

  searchAssets(nameOrTickerPart: string) {
    return this.instance.get('assets', {params: {nameOrTickerPart}});
  }

  getAssetsForSectors(currentPage: number, perPage: number, sectors: string[]) {
    return this.instance.get('assets', {params: {currentPage, perPage, sectors}});
  }
}
