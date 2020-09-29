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
      await assetRepository.insertAssets([{
        ticker: 'AAPL',
        name: 'Apple',
        type: 'Stock',
        id: 1
      }, {
        ticker: 'AKR',
        name: 'Acadia Realty Trust',
        type: 'Stock',
        id: 2
      }, {
        ticker: 'AACG',
        name: 'ATA Creativity Global',
        type: 'Stock',
        id: 3
      }]);
    });

    it('Updates EPS and Earnings Date', async () => {
      await earningsDataUpdater.updateEarnings(['AAPL']);
      expect((await assetRepository.findById(1)).eps).to.not.be.null;
      expect((await assetRepository.findById(1)).earningsDate).to.not.be.null;
    });

    it('Sets EPS null if not found', async () => {
      await earningsDataUpdater.updateEarnings(['AKR']);
      expect((await assetRepository.findById(2)).eps).to.be.null;
    });

    it('Sets Earnings Date null if not found', async () => {
      await earningsDataUpdater.updateEarnings(['AACG']);
      expect((await assetRepository.findById(3)).earningsDate).to.be.null;
    });
  });
});
