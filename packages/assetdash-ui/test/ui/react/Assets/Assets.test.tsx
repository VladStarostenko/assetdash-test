import {fireEvent, render, waitFor} from '@testing-library/react';
import chai, {expect} from 'chai';
import chaiDom from 'chai-dom';
import nock from 'nock';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {HomeWithRouter} from '../../../../src/ui/react/Home/HomeWithRouter';
import {ServiceContext} from '../../../../src/ui/react/hooks/useServices';
import {ThemeContextProvider} from '../../../../src/ui/react/Theme/ThemeContextProvider';
import {waitForPageLoad} from '../../../fixtures/assetsPage';
import {createTestServices} from '../../../helpers/testServices';
import '../../../shims/types';
import {exampleAssets} from '../../../fixtures/assets';
import {pagination} from '../../../fixtures/pagination';

chai.use(chaiDom);

function renderHome() {
  return render(
    <MemoryRouter>
      <ServiceContext.Provider value={createTestServices()}>
        <ThemeContextProvider>
          <HomeWithRouter/>
        </ThemeContextProvider>
      </ServiceContext.Provider>
    </MemoryRouter>);
}

describe('Assets', () => {
  beforeEach(() => {
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=1&perPage=100&typesOfAssets[]=Stock&typesOfAssets[]=ETF&typesOfAssets[]=Cryptocurrency')
      .reply(200, {
        data: exampleAssets,
        pagination
      });
  });
  afterEach(() => {
    nock.cleanAll();
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
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('rank-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Microsoft Corporation', 'Apple Inc.']);
    });

    it('sorts by name', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('name-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Apple Inc.', 'Microsoft Corporation']);
    });

    it('sorts by name reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

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
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('symbol-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Apple Inc.', 'Amazon.com, Inc.', 'Microsoft Corporation']);
    });

    it('sorts by ticker reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('symbol-column-header');
      fireEvent.click(node);
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Microsoft Corporation', 'Amazon.com, Inc.', 'Apple Inc.']);
    });

    it('sorts by marketcap', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('marketcap-column-header');
      fireEvent.click(node);
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Apple Inc.', 'Microsoft Corporation', 'Amazon.com, Inc.']);
    });

    it('sorts by marketcap reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('marketcap-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Microsoft Corporation', 'Apple Inc.']);
    });

    it('sorts by price', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('price-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Microsoft Corporation', 'Apple Inc.', 'Amazon.com, Inc.']);
    });

    it('sorts by price reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('price-column-header');
      fireEvent.click(node);
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Apple Inc.', 'Microsoft Corporation']);
    });

    it('sorts by today', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('today-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Apple Inc.', 'Microsoft Corporation', 'Amazon.com, Inc.']);
    });

    it('sorts by today reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('today-column-header');
      fireEvent.click(node);
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Microsoft Corporation', 'Apple Inc.']);
    });

    it('sorts by weekly dash', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('dashWeekly-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Apple Inc.', 'Microsoft Corporation', 'Amazon.com, Inc.']);
    });

    it('sorts by weekly dash reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('dashWeekly-column-header');
      fireEvent.click(node);
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Microsoft Corporation', 'Apple Inc.']);
    });

    it('sorts by monthly dash', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('dashMonthly-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Microsoft Corporation', 'Amazon.com, Inc.', 'Apple Inc.']);
    });

    it('sorts by monthly dash reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('dashMonthly-column-header');
      fireEvent.click(node);
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Apple Inc.', 'Amazon.com, Inc.', 'Microsoft Corporation']);
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

      await waitForPageLoad(getAllByTestId);

      await waitFor(() => sectors.forEach(sector => {
        const hiddenCheckbox = sector as HTMLInputElement;
        expect(hiddenCheckbox.checked).to.be.false;
      }));
    });
  });
});
