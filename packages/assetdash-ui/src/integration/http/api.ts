import axios from 'axios';
import {config} from '../../config/config';

const instance = axios.create(config);

export const getAllAssets = () => {
  return instance.get('assets');
};

export const getPage = (currentPage: number, perPage = 100) => {
  return instance.get('assets/page/' + currentPage + '/' + perPage);
};
