import {waitFor} from '@testing-library/dom';
import {fireEvent} from '@testing-library/react';
import chai, {expect} from 'chai';
import chaiDom from 'chai-dom';
import nock from 'nock';
import {assetSearchResult, assetsPage1} from '../../../fixtures/assets';
import {waitForPageLoad} from '../../../fixtures/assetsPage';
import {renderHome} from '../../../fixtures/pages.test';
import {page} from '../../../fixtures/pagination';

chai.use(chaiDom);

describe('Asset searching', () => {
  beforeEach(() => {
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=1&perPage=100&typesOfAssets[]=Stock&typesOfAssets[]=ETF&typesOfAssets[]=Cryptocurrency')
      .reply(200, {
        data: assetsPage1,
        pagination: page(1)
      }).persist();
    nock('http://127.0.0.1/')
      .get('/assets?nameOrTickerPart=ap&typesOfAssets[]=Stock&typesOfAssets[]=ETF&typesOfAssets[]=Cryptocurrency&')
      .reply(200, {
        data: assetSearchResult,
        pagination: page(1)
      });
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it('filters by query', async () => {
    const {findByTestId, getAllByTestId} = renderHome();
    await waitForPageLoad(getAllByTestId);
    const searchInput = await findByTestId('search-input');
    fireEvent.change(searchInput, {target: {value: 'ap'}});

    await waitFor(() => expect((getAllByTestId('asset-row-name')).map(el => el.textContent))
      .to.deep.eq(['Starbucks']));
  });

  it('shows first page when query deleted', async () => {
    const {findByTestId, getAllByTestId} = renderHome();
    await waitForPageLoad(getAllByTestId);
    const searchInput = await findByTestId('search-input');
    fireEvent.change(searchInput, {target: {value: 'ap'}});
    await waitFor(() => expect((getAllByTestId('asset-row-name')).map(el => el.textContent))
      .to.deep.eq(['Starbucks']));

    fireEvent.change(searchInput, {target: {value: ''}});
    await waitForPageLoad(getAllByTestId);
  });

  it('shows ids only for searching results', async () => {
    const {findByTestId, getAllByTestId, findAllByTestId} = renderHome();
    await waitForPageLoad(getAllByTestId);

    await expect(findAllByTestId('asset-row-id')).to.be.rejected;

    const searchInput = await findByTestId('search-input');
    fireEvent.change(searchInput, {target: {value: 'ap'}});

    const ids = await findAllByTestId('asset-row-id');
    expect(ids.map(el => el.textContent))
      .to.deep.eq(['1']);

    fireEvent.change(searchInput, {target: {value: ''}});
    await waitForPageLoad(getAllByTestId);
    await expect(findAllByTestId('asset-row-id')).to.be.rejected;
  });
});
