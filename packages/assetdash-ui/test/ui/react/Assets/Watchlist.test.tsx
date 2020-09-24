import {fireEvent} from '@testing-library/react';
import chai, {expect} from 'chai';
import chaiDom from 'chai-dom';
import nock from 'nock';
import {Simulate} from 'react-dom/test-utils';
import {Services} from '../../../../src/ui/react/services';
import {assetSearchResult, assetsFilterResult, assetsOnWatchlist, assetsPage1} from '../../../fixtures/assets';
import {clickFirstSector, waitForNames, waitForPageLoad} from '../../../fixtures/assetsPage';
import {renderHome} from '../../../fixtures/pages.test';
import {page} from '../../../fixtures/pagination';
import {createTestServices} from '../../../helpers/testServices';
import click = Simulate.click;

chai.use(chaiDom);

describe('Watchlist', () => {
  let services: Services;

  beforeEach(() => {
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=1&perPage=100')
      .reply(200, {
        data: assetsPage1,
        pagination: page(1)
      });
    nock('http://127.0.0.1/')
      .get('/watchlist?tickers=AAPL-')
      .reply(200, {
        data: assetsOnWatchlist
      }).persist();
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=1&perPage=100&sector=Stock')
      .reply(200, {
        data: assetsFilterResult,
        pagination: page(1)
      });
    nock('http://127.0.0.1/')
      .get('/assets?nameOrTickerPart=ap')
      .reply(200, {
        data: assetSearchResult,
        pagination: page(1)
      });

    services = createTestServices();
    services.watchlist.addElementToWatchList('AAPL');
  });
  afterEach(() => {
    nock.cleanAll();
    services.watchlist.removeElementFromWatchList('AAPL');
  });

  it('shows watchlist at watchlist URL', async () => {
    const {getAllByTestId} = renderHome({path: '/watchlist', services});
    await waitForNames(getAllByTestId, ['Apple Inc.']);
  });

  it('switches to watchlist after tab click', async () => {
    const {getAllByTestId, findByRole} = renderHome({path: '/', services});
    await waitForPageLoad(getAllByTestId);
    const watchlistTabButton = await findByRole('button', {name: /Watchlist/});
    click(watchlistTabButton);
    await waitForNames(getAllByTestId, ['Apple Inc.']);
  });

  it('if sector is selected on watchlist, switches to filtered assets view', async () => {
    const {getAllByTestId, findAllByTestId, findByTestId} = renderHome({path: '/watchlist', services});
    await waitForNames(getAllByTestId, ['Apple Inc.']);
    await clickFirstSector(findAllByTestId);
    expect(await findByTestId('tab-Assets-active')).to.exist;
  });

  it('search on watchlist shows search result', async () => {
    const {getAllByTestId, findAllByTestId, findByTestId} = renderHome({path: '/watchlist', services});
    await waitForNames(getAllByTestId, ['Apple Inc.']);
    await clickFirstSector(findAllByTestId);
    const searchInput = await findByTestId('search-input');

    fireEvent.change(searchInput, {target: {value: 'ap'}});
    await waitForNames(getAllByTestId, ['Starbucks']);

    expect(await findByTestId('tab-Assets-active')).to.exist;
    expect(await findByTestId('tab-Watchlist')).to.exist;
  });
});
