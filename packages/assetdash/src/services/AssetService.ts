import {Asset} from '../sanitizers/asAssets';
import {AssetRepository} from '../repositories/AssetRepository';
import {NotFoundError} from '../errors';

type UploadResult = {status: string} | {error: string};

export class AssetService {
  constructor(private assetRepository: AssetRepository) {}

  async upload(assets: Asset[]): Promise<UploadResult[]> {
    return Promise.all(assets.map(async (asset) => {
      await this.assetRepository.insert(asset.id, asset.ticker, asset.name, asset.image_url, asset.current_price,
        asset.current_marketcap, asset.current_change, asset.type, asset.dash_daily, asset.dash_weekly,
        asset.dash_monthly, asset.dash_quarterly);
      return {status: 'success'};
    }));
  }

  async getAssetFromId(id: number) {
    const assetRecord =
      await this.assetRepository.findById(id);
    if (!assetRecord) {
      throw this.notFoundError(id);
    }
    return {
      assert: assetRecord
    };
  }

  private notFoundError(id: number) {
    return new NotFoundError(`No asset was found by "${id}"`);
  }
}
