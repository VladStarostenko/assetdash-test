import {waitFor} from '@testing-library/dom';
import chai, {expect} from 'chai';
import chaiDom from 'chai-dom';
import nock from 'nock';
import {Simulate} from 'react-dom/test-utils';
import {assetsPage1, assetsPage2, allAssets} from '../../../fixtures/assets';
import {waitForPageLoad} from '../../../fixtures/assetsPage';
import {renderHome} from '../../../fixtures/pages.test';
import {page} from '../../../fixtures/pagination';
import click = Simulate.click;

chai.use(chaiDom);

describe('Asset paging', () => {
  beforeEach(() => {
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=1&perPage=100&typesOfAssets[]=Stock&typesOfAssets[]=ETF&typesOfAssets[]=Cryptocurrency')
      .reply(200, {
        data: assetsPage1,
        pagination: page(1)
      }).persist();
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=2&perPage=100&typesOfAssets[]=Stock&typesOfAssets[]=ETF&typesOfAssets[]=Cryptocurrency')
      .reply(200, {
        data: assetsPage2,
        pagination: page(2)
      });
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=1&perPage=200&typesOfAssets[]=Stock&typesOfAssets[]=ETF&typesOfAssets[]=Cryptocurrency')
      .reply(200, {
        data: allAssets,
        pagination: page(1)
      });
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it('loads page from URL', async () => {
    const {findByText, findAllByTestId} = renderHome({pageNumber: 2});

    expect((await findAllByTestId('asset-row-name')).map(el => el.textContent))
      .to.deep.eq(['Gilead Sciences', 'Starbucks', 'Anheuser-Busch']);

    expect(await findByText('Next 100')).to.be.visible;
    expect(await findByText('Previous 100')).to.be.visible;
  });

  it('goes to next page', async () => {
    const {findByRole, getAllByTestId} = renderHome();
    await waitForPageLoad(getAllByTestId);
    const nextPageButton = await findByRole('button', {name: /Next 100/});
    click(nextPageButton);

    await waitFor(() =>
      expect((getAllByTestId('asset-row-name')).map(el => el.textContent))
        .to.deep.eq(['Gilead Sciences', 'Starbucks', 'Anheuser-Busch'])
    );
  });

  it('goes to all assets', async () => {
    const {findByRole, getAllByTestId} = renderHome();
    await waitForPageLoad(getAllByTestId);
    const viewAllButton = await findByRole('button', {name: /View all/});
    click(viewAllButton);

    await waitFor(() =>
      expect((getAllByTestId('asset-row-name')).map(el => el.textContent))
        .to.deep.eq(['Apple Inc.', 'Microsoft Corporation', 'Amazon.com, Inc.', 'Gilead Sciences', 'Starbucks', 'Anheuser-Busch'])
    );
  });
});
