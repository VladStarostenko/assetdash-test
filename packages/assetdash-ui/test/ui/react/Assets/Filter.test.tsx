import chai, {expect} from 'chai';
import chaiDom from 'chai-dom';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import {Simulate} from 'react-dom/test-utils';
import {assetsFilterResult, assetsFilterResult2ndPage, assetsPage1, assetsPage2} from '../../../fixtures/assets';
import {clickFirstSector, waitForNames, waitForPageLoad} from '../../../fixtures/assetsPage';
import {renderHome} from '../../../fixtures/pages.test';
import {page} from '../../../fixtures/pagination';
import click = Simulate.click;

chai.use(chaiDom);
chai.use(chaiAsPromised);

describe('Asset filtering', () => {
  beforeEach(() => {
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=1&perPage=100')
      .reply(200, {
        data: assetsPage1,
        pagination: page(1)
      }).persist();
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=2&perPage=100')
      .reply(200, {
        data: assetsPage2,
        pagination: page(2)
      });
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=1&perPage=100&sector=Stock')
      .reply(200, {
        data: assetsFilterResult,
        pagination: page(1)
      }).persist();
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=2&perPage=100&sector=Stock')
      .reply(200, {
        data: assetsFilterResult2ndPage,
        pagination: page(2)
      });
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it('filters by sector', async () => {
    const {findAllByTestId, getAllByTestId} = renderHome();
    await waitForPageLoad(getAllByTestId);

    await clickFirstSector(findAllByTestId);

    await waitForNames(getAllByTestId, ['Anheuser-Busch']);

    await clickFirstSector(findAllByTestId);

    await waitForNames(getAllByTestId, ['Apple Inc.', 'Microsoft Corporation', 'Amazon.com, Inc.']);
  });

  it('shows ids only when assets are filtered', async () => {
    const {findAllByTestId, getAllByTestId} = renderHome();
    await waitForPageLoad(getAllByTestId);

    await expect(findAllByTestId('asset-row-id')).to.be.rejected;

    await clickFirstSector(findAllByTestId);

    const ids = await findAllByTestId('asset-row-id');
    expect(ids.map(el => el.textContent))
      .to.deep.eq(['1']);

    await clickFirstSector(findAllByTestId);

    await expect(findAllByTestId('asset-row-id')).to.be.rejected;
  });

  it('shows ids for second page of filtering results', async () => {
    const {findAllByTestId, getAllByTestId, findByRole} = renderHome();

    await waitForPageLoad(getAllByTestId);
    await clickFirstSector(findAllByTestId);

    const nextPageButton = await findByRole('button', {name: /Next 100/});

    click(nextPageButton);

    await waitForNames(getAllByTestId, ['Microsoft Corporation']);

    const ids = await findAllByTestId('asset-row-id');
    expect(ids.map(el => el.textContent))
      .to.deep.eq(['101']);
  });

  it('triggering filter should reset page', async () => {
    const {findAllByTestId, getAllByTestId} = renderHome({pageNumber: 2});
    await waitForPageLoad(getAllByTestId);

    await clickFirstSector(findAllByTestId);

    await waitForNames(getAllByTestId, ['Anheuser-Busch']);
  });

  it('goes to previous page', async () => {
    const {findByRole, getAllByTestId, findAllByTestId} = renderHome();
    await waitForPageLoad(getAllByTestId);
    await clickFirstSector(findAllByTestId);
    await waitForNames(getAllByTestId, ['Anheuser-Busch']);

    const nextPageButton = await findByRole('button', {name: /Next 100/});
    click(nextPageButton);
    await waitForNames(getAllByTestId, ['Microsoft Corporation']);

    const previousPageButton = await findByRole('button', {name: /Previous 100/});
    click(previousPageButton);

    await waitForNames(getAllByTestId, ['Anheuser-Busch']);
  });
});
