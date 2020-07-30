import {expect} from 'chai';
import {DashService} from '../../src/core/DashService';
import {parseAsEstDate} from '../../src/core/utils';
import {AssetRepository} from '../../src/integration/db/repositories/AssetRepository';
import {RanksRepository} from '../../src/integration/db/repositories/RanksRepository';
import {clearDatabase} from '../helpers/clear-db';
import {createTestServices} from '../helpers/createTestServices';
import {assetWithId} from '../helpers/fixtures';

// May 2020
// Mo Tu We Th Fr Sa Su
//              1  2  3
//  4  5  6  7  8  9 10
// 11 12 13 14 15 16 17
// 18 19 20 21 22 23 24
// 25 26 27 28 29 30 31

describe('Dash Service', () => {
  let assetRepository: AssetRepository;
  let ranksRepository: RanksRepository;
  let dashService: DashService;

  beforeEach(async () => {
    let db;
    ({assetRepository, ranksRepository, dashService, db} = createTestServices());
    await clearDatabase(db);
    await assetRepository.insertAsset(assetWithId(1));
  });

  it('calculates daily dash', async () => {
    const now = parseAsEstDate('2020-05-12 12:41');
    await ranksRepository.updateRank({assetId: 1, position: 100, date: parseAsEstDate('2020-05-12 09:40')});
    await ranksRepository.updateRank({assetId: 1, position: 92, date: parseAsEstDate('2020-05-12 12:40')});

    expect(await dashService.dailyDash(now, 1)).to.eql(8);
  });

  it('calculates weekly dash', async () => {
    const now = parseAsEstDate('2020-05-13 12:41');
    await ranksRepository.updateRank({assetId: 1, position: 100, date: parseAsEstDate('2020-05-11 09:40')});
    await ranksRepository.updateRank({assetId: 1, position: 72, date: parseAsEstDate('2020-05-13 12:40')});

    expect(await dashService.weeklyDash(now, 1)).to.eql(28);
  });

  it('calculates monthly dash', async () => {
    const now = parseAsEstDate('2020-05-13 12:41');
    await ranksRepository.updateRank({assetId: 1, position: 100, date: parseAsEstDate('2020-05-01 09:30')});
    await ranksRepository.updateRank({assetId: 1, position: 50, date: parseAsEstDate('2020-05-13 12:40')});

    expect(await dashService.monthlyDash(now, 1)).to.eql(50);
  });

  xit('daily dash resets a 9 AM EST (cryptocurrency)', async () => {
    const resetTime = parseAsEstDate('2020-05-12 09:00');
    const justBefore = parseAsEstDate('2020-05-12 08:59:59');
    await ranksRepository.updateRank({assetId: 1, position: 100, date: parseAsEstDate('2020-05-12 07:50')});
    await ranksRepository.updateRank({assetId: 1, position: 99, date: parseAsEstDate('2020-05-12 08:55')});

    expect(await dashService.dailyDash(justBefore, 1)).to.eql(1);
    expect(await dashService.dailyDash(resetTime, 1)).to.eql(0);
  });
});
