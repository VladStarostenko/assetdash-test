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

  searchAssets(string: string) {
    return this.instance.get('assets', {params: {string}});
  }
}
