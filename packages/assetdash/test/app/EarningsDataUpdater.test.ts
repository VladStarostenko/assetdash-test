import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {clearDatabase} from '../helpers/clear-db';
import {createTestServices} from '../helpers/createTestServices';
import {EarningsDataUpdater} from '../../src/app/EarningsDataUpdater';

chai.use(chaiAsPromised);

describe('EarningsDataUpdater', () => {
  let earningsDataUpdater: EarningsDataUpdater;
  let assetRepository;
  let db;
  let logger;

  beforeEach(() => {
    let iexCloudService;
    ({db, assetRepository, iexCloudService, logger} = createTestServices(true));
    earningsDataUpdater = new EarningsDataUpdater(iexCloudService, assetRepository, logger);
  });

  describe('updateEarnings', () => {
    beforeEach(async () => {
      await clearDatabase(db);
      await assetRepository.insertAsset({
        ticker: 'AAPL',
        name: 'Apple',
        type: 'Stock',
        id: 1
      });
    });

    it('Update EPS and Earnings Date', async () => {
      await earningsDataUpdater.updateEarnings(['AAPL']);
      expect((await assetRepository.findById(1)).eps).to.not.be.undefined;
      expect((await assetRepository.findById(1)).earningsDate).to.not.be.undefined;
    });
  });
});
