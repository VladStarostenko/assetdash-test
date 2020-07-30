import {expect} from 'chai';
import {parseISO, startOfDay} from 'date-fns';
import {AssetRepository} from '../../../src/integration/db/repositories/AssetRepository';
import {RanksRepository} from '../../../src/integration/db/repositories/RanksRepository';
import {clearDatabase} from '../../helpers/clear-db';
import {createTestServices} from '../../helpers/createTestServices';
import {assetWithId} from '../../helpers/fixtures';

describe('RankRepository', () => {
  let ranksRepository: RanksRepository;
  beforeEach(async () => {
    let db;
    let assetRepository: AssetRepository;
    ({ranksRepository, assetRepository, db} = createTestServices());
    await clearDatabase(db);
    await assetRepository.insertAsset(assetWithId(1));
    await assetRepository.insertAsset(assetWithId(2));
  });

  it('first rank of the day becomes both the open and current rank', async () => {
    const openDate = parseISO('2020-05-07 09:31');
    const day = startOfDay(openDate);

    await ranksRepository.updateRank({assetId: 1, position: 100, date: openDate});

    expect(await ranksRepository.findOpenFor(day, 1)).to.deep.include({assetId: 1, position: 100, date: openDate});
    expect(await ranksRepository.findMostRecentFor(day, 1)).to.deep.include({assetId: 1, position: 100, date: openDate});
  });

  it('after adding 2 ranks for a day, first stays the open, second becomes current', async () => {
    const openDate = parseISO('2020-05-07 09:31');
    const middayDate = parseISO('2020-05-07 12:31');
    const day = startOfDay(openDate);

    await ranksRepository.updateRank({assetId: 1, position: 100, date: openDate});
    await ranksRepository.updateRank({assetId: 1, position: 101, date: middayDate});

    expect(await ranksRepository.findOpenFor(day, 1)).to.deep.include({assetId: 1, position: 100, date: openDate});
    expect(await ranksRepository.findMostRecentFor(day, 1)).to.deep.include({assetId: 1, position: 101, date: middayDate});
  });

  it('3rd update updates only the current rank', async () => {
    const openDate = parseISO('2020-05-07 09:31');
    const middayDate = parseISO('2020-05-07 12:31');
    const laterDate = parseISO('2020-05-07 15:31');
    const day = startOfDay(openDate);

    await ranksRepository.updateRank({assetId: 1, position: 100, date: openDate});
    await ranksRepository.updateRank({assetId: 1, position: 101, date: middayDate});
    await ranksRepository.updateRank({assetId: 1, position: 102, date: laterDate});

    expect(await ranksRepository.findOpenFor(day, 1)).to.deep.include({assetId: 1, position: 100, date: openDate});
    expect(await ranksRepository.findMostRecentFor(day, 1)).to.deep.include({assetId: 1, position: 102, date: laterDate});
  });

  it('filters by assetId', async () => {
    const openDate = parseISO('2020-05-07 09:31');
    const day = startOfDay(openDate);

    await ranksRepository.updateRank({assetId: 1, position: 100, date: openDate});
    await ranksRepository.updateRank({assetId: 2, position: 101, date: openDate});

    expect(await ranksRepository.findOpenFor(day, 1)).to.deep.include({assetId: 1, position: 100, date: openDate});
    expect(await ranksRepository.findOpenFor(day, 2)).to.deep.include({assetId: 2, position: 101, date: openDate});
    expect(await ranksRepository.findMostRecentFor(day, 1)).to.deep.include({assetId: 1, position: 100, date: openDate});
    expect(await ranksRepository.findMostRecentFor(day, 2)).to.deep.include({assetId: 2, position: 101, date: openDate});
  });
});
