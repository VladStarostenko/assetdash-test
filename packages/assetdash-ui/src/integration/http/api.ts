import axios from 'axios';
import {config} from '../../config/config';

const instance = axios.create(config);

export const getAllAssets = () => {
  return instance.get('assets');
};
