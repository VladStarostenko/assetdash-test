import {Matcher, MatcherOptions} from '@testing-library/dom/types/matches';
import {fireEvent, render, waitFor} from '@testing-library/react';
import adapter from 'axios/lib/adapters/http';
import chai, {expect} from 'chai';
import chaiDom from 'chai-dom';
import nock from 'nock';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {Api} from '../../../../src/integration/http/api';
import Home from '../../../../src/ui/react/Home/Home';
import {ServiceContext} from '../../../../src/ui/react/hooks/useServices';
import {Services} from '../../../../src/ui/react/services';
import {ThemeContextProvider} from '../../../../src/ui/react/Theme/ThemeContextProvider';
import '../../../shims/types';

chai.use(chaiDom);

type AllByBoundAttributeOnContainer = (
  id: Matcher,
  options?: MatcherOptions,
) => HTMLElement[]

function createTestServices(): Services {
  const config = Object.freeze({baseURL: 'http://127.0.0.1'});
  const axiosConfig = {...config, adapter};
  return {
    config,
    api: new Api(axiosConfig)
  };
}

function renderHome() {
  return render(
    <MemoryRouter>
      <ServiceContext.Provider value={createTestServices()}>
        <ThemeContextProvider>
          <Home/>
        </ThemeContextProvider>
      </ServiceContext.Provider>
    </MemoryRouter>);
}

async function waifForPageLoad(getAllByTestId: AllByBoundAttributeOnContainer) {
  await waitFor(() => expect(getAllByTestId('asset-row-name')).to.have.length(3));
}

const exampleAssets = [
  {
    id: 210,
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    imageUrl: 'https://storage.googleapis.com/iex/api/logos/MSFT.png',
    currentPrice: 214.32,
    currentMarketcap: 1625282860800,
    currentChange: 0.7000000000000001,
    type: 'Stock',
    dashDaily: 0,
    dashWeekly: 0,
    dashMonthly: 0,
    rank: 2
  },
  {
    id: 1093,
    ticker: 'AAPL',
    name: 'Apple Inc.',
    imageUrl: 'https://storage.googleapis.com/iex/api/logos/AAPL.png',
    currentPrice: 382.73,
    currentMarketcap: 1658881948200,
    currentChange: 0.357,
    type: 'Stock',
    dashDaily: 0,
    dashWeekly: 0,
    dashMonthly: 0,
    rank: 1
  }, {
    id: 160,
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    imageUrl: 'https://storage.googleapis.com/iex/api/logos/AMZN.png',
    currentPrice: 3182.63,
    currentMarketcap: 1587419460880,
    currentChange: 3.295,
    type: 'Stock',
    dashDaily: 0,
    dashWeekly: 0,
    dashMonthly: 0,
    rank: 3
  }];

const pagination = {
  total: 3,
  lastPage: 1,
  perPage: 100,
  currentPage: 1,
  from: 0,
  to: 3
};

describe('Assets', () => {
  beforeEach(() => {
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=1&perPage=100')
      .reply(200, {
        data: exampleAssets,
        pagination
      });
  });

  describe('Current Page', () => {
    it('are sorted by rank by default', async () => {
      const {findAllByTestId} = renderHome();

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Apple Inc.', 'Microsoft Corporation', 'Amazon.com, Inc.']);
    });

    it('change sorting direction after click', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waifForPageLoad(getAllByTestId);

      const node = await findByTestId('rank-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Microsoft Corporation', 'Apple Inc.']);
    });

    it('sorts by name', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waifForPageLoad(getAllByTestId);

      const node = await findByTestId('name-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Apple Inc.', 'Microsoft Corporation']);
    });

    it('sorts by name reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waifForPageLoad(getAllByTestId);

      const node = await findByTestId('name-column-header');
      fireEvent.click(node);
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Microsoft Corporation', 'Apple Inc.', 'Amazon.com, Inc.']);
    });

    it('sorts by name after sorting by rank', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitFor(() => expect(getAllByTestId(/asset-row-name/)).to.have.length(3));

      const rankNode = await findByTestId('rank-column-header');
      fireEvent.click(rankNode);

      const nameNode = await findByTestId('name-column-header');
      fireEvent.click(nameNode);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Apple Inc.', 'Microsoft Corporation']);
    });

    it('sorts by ticker', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waifForPageLoad(getAllByTestId);

      const node = await findByTestId('symbol-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Apple Inc.', 'Amazon.com, Inc.', 'Microsoft Corporation']);
    });

    it('sorts by ticker reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waifForPageLoad(getAllByTestId);

      const node = await findByTestId('symbol-column-header');
      fireEvent.click(node);
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Microsoft Corporation', 'Amazon.com, Inc.', 'Apple Inc.']);
    });

    it('sorts by marketcap', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waifForPageLoad(getAllByTestId);

      const node = await findByTestId('marketcap-column-header');
      fireEvent.click(node);
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Apple Inc.', 'Microsoft Corporation', 'Amazon.com, Inc.']);
    });

    it('sorts by marketcap reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waifForPageLoad(getAllByTestId);

      const node = await findByTestId('marketcap-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Microsoft Corporation', 'Apple Inc.']);
    });

    it('sorts by price', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waifForPageLoad(getAllByTestId);

      const node = await findByTestId('price-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Microsoft Corporation', 'Apple Inc.', 'Amazon.com, Inc.']);
    });

    it('sorts by price reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waifForPageLoad(getAllByTestId);

      const node = await findByTestId('price-column-header');
      fireEvent.click(node);
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Apple Inc.', 'Microsoft Corporation']);
    });

    it('sorts by today', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waifForPageLoad(getAllByTestId);

      const node = await findByTestId('today-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Apple Inc.', 'Microsoft Corporation', 'Amazon.com, Inc.']);
    });

    it('sorts by today reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waifForPageLoad(getAllByTestId);

      const node = await findByTestId('today-column-header');
      fireEvent.click(node);
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Microsoft Corporation', 'Apple Inc.']);
    });
  });
  describe('Searching', () => {
    beforeEach(() => {
      nock('http://127.0.0.1/')
        .persist()
        .get(/assets/)
        .reply(200, {
          data: exampleAssets,
          pagination
        });
    });

    it('clears sectors during the searching', async () => {
      const {findAllByTestId, findByTestId, getAllByTestId} = renderHome();
      const sectors = await findAllByTestId('sector-checkbox');

      sectors.forEach(sector => {
        const hiddenCheckbox = sector as HTMLInputElement;
        expect(hiddenCheckbox.checked).to.be.false;
        fireEvent.click(hiddenCheckbox);
        expect(hiddenCheckbox.checked).to.be.true;
      });

      const searchInput = await findByTestId('search-input');
      fireEvent.change(searchInput, {target: {value: 'ap'}});

      await waifForPageLoad(getAllByTestId);

      sectors.forEach(sector => {
        const hiddenCheckbox = sector as HTMLInputElement;
        expect(hiddenCheckbox.checked).to.be.false;
      });
    });
  });
});
