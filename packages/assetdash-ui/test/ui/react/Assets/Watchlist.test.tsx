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

  describe('Empty watchlist', () => {
    beforeEach(() => {
      services = createTestServices();
    });

    it('shows empty watchlist', async () => {
      const {findByTestId} = renderHome({path: '/watchlist', services});
      const emptyWatchListTitle = await findByTestId('emptyWatchlistTitle');
      expect(emptyWatchListTitle.textContent).to.eq('You have not added any assets to your watchlist');
    });
  });

  describe('Not empty watchlist', () => {
    beforeEach(() => {
      nock('http://127.0.0.1/')
        .get('/assets?currentPage=1&perPage=100&typesOfAssets[]=Stock&typesOfAssets[]=ETF&typesOfAssets[]=Cryptocurrency')
        .reply(200, {
          data: assetsPage1,
          pagination: page(1)
        });
      nock('http://127.0.0.1/')
        .get('/watchlist?tickers=AAPL-&typesOfAssets[]=Stock&typesOfAssets[]=ETF&typesOfAssets[]=Cryptocurrency')
        .reply(200, {
          data: assetsOnWatchlist
        }).persist();
      nock('http://127.0.0.1/')
        .get('/assets?currentPage=1&perPage=100&sector=Stock&typesOfAssets[]=Stock&typesOfAssets[]=ETF&typesOfAssets[]=Cryptocurrency')
        .reply(200, {
          data: assetsFilterResult,
          pagination: page(1)
        });
      nock('http://127.0.0.1/')
        .get('/assets?nameOrTickerPart=ap&typesOfAssets[]=Stock&typesOfAssets[]=ETF&typesOfAssets[]=Cryptocurrency')
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

    it('shows ids for watchlist', async () => {
      const {getAllByTestId, findAllByTestId} = renderHome({path: '/watchlist', services});
      await waitForNames(getAllByTestId, ['Apple Inc.']);

      const ids = await findAllByTestId('asset-row-id');
      expect(ids.map(el => el.textContent))
        .to.deep.eq(['1']);
    });
  });
});
