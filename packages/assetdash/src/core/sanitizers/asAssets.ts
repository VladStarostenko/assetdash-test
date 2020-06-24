import {asArray, asObject, asString, Sanitizer, asNumber} from '@restless/sanitizers';

export const asAsset = asObject({
  id: asNumber,
  ticker: asString,
  name: asString,
  image_url: asString,
  current_price: asNumber,
  current_marketcap: asNumber,
  current_change: asNumber,
  type: asString,
  dash_daily: asNumber,
  dash_weekly: asNumber,
  dash_monthly: asNumber,
  dash_quarterly: asNumber
});

export const asAssets = asObject({
  assets: asArray(asAsset)
});

type ExtractFromSanitizer<T> = T extends Sanitizer<infer U> ? U : never;
export type Assets = ExtractFromSanitizer<typeof asAssets>;
export type Asset = Assets['assets'][0];
