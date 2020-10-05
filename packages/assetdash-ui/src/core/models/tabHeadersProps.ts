import {Column, Order} from './assetsSort';

export interface TabHeadersProps {
  getIconClassName: (column: Column) => Order | '';
  setAssetsSortForColumn: (column: Column) => void;
}
