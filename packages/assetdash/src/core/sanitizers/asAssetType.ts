import {asAnyOf, asExactly} from '@restless/sanitizers';

export const asAssetType = asAnyOf(
  [asExactly('Stock'), asExactly('ETF'), asExactly('Cryptocurrency')],
  'Type of asset'
);
