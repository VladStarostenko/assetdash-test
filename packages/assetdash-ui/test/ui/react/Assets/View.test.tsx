import {fireEvent, render} from '@testing-library/react';
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
import {exampleAssets, exampleAssetsForEarningsMetric} from '../../../fixtures/assets';
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

describe('View metrics', () => {
  beforeEach(() => {
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=1&perPage=100&typesOfAssets[]=Stock')
      .reply(200, {
        data: exampleAssetsForEarningsMetric,
        pagination
      });
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
      const {findAllByTestId, findByTestId} = renderHome();

      const viewDropdown = await findByTestId('tab-dropdown-button');
      fireEvent.click(viewDropdown);

      const metricButton = (await findAllByTestId('metric-button'))[1];
      fireEvent.click(metricButton);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Apple Inc.', 'Microsoft Corporation', 'Amazon.com, Inc.']);
    });

    it('sorts by eps', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const viewDropdown = await findByTestId('tab-dropdown-button');
      fireEvent.click(viewDropdown);

      const metricButton = (await findAllByTestId('metric-button'))[1];
      fireEvent.click(metricButton);

      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('eps-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Apple Inc.', 'Microsoft Corporation', 'Amazon.com, Inc.']);
    });

    it('sorts by eps reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const viewDropdown = await findByTestId('tab-dropdown-button');
      fireEvent.click(viewDropdown);

      const metricButton = (await findAllByTestId('metric-button'))[1];
      fireEvent.click(metricButton);

      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('eps-column-header');
      fireEvent.click(node);
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Microsoft Corporation', 'Apple Inc.']);
    });

    it('sorts by earnings date', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const viewDropdown = await findByTestId('tab-dropdown-button');
      fireEvent.click(viewDropdown);

      const metricButton = (await findAllByTestId('metric-button'))[1];
      fireEvent.click(metricButton);

      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('earningsDate-column-header');
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Microsoft Corporation', 'Apple Inc.', 'Amazon.com, Inc.']);
    });

    it('sorts by earnings date reversed', async () => {
      const {findByTestId, findAllByTestId, getAllByTestId} = renderHome();
      await waitForPageLoad(getAllByTestId);

      const viewDropdown = await findByTestId('tab-dropdown-button');
      fireEvent.click(viewDropdown);

      const metricButton = (await findAllByTestId('metric-button'))[1];
      fireEvent.click(metricButton);

      await waitForPageLoad(getAllByTestId);

      const node = await findByTestId('earningsDate-column-header');
      fireEvent.click(node);
      fireEvent.click(node);

      const names = await findAllByTestId('asset-row-name');
      expect(names.map(el => el.textContent))
        .to.deep.eq(['Amazon.com, Inc.', 'Apple Inc.', 'Microsoft Corporation']);
    });
  });
});
