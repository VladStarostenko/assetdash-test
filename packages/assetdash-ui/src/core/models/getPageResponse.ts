import {Asset} from './asset';
import {Pagination} from './pagination';

export interface GetPageResponse {
  data: {
    data: Asset[];
    pagination: Pagination;
  };
}
