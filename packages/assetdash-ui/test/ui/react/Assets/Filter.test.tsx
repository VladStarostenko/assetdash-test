import chai from 'chai';
import chaiDom from 'chai-dom';
import nock from 'nock';
import {Simulate} from 'react-dom/test-utils';
import {assetsFilterResult, assetsFilterResult2ndPage, assetsPage1, assetsPage2} from '../../../fixtures/assets';
import {clickFirstSector, waitForNames, waitForPageLoad} from '../../../fixtures/assetsPage';
import {renderHome} from '../../../fixtures/pages.test';
import {page} from '../../../fixtures/pagination';
import click = Simulate.click;

chai.use(chaiDom);

describe('Asset filtering', () => {
  beforeEach(() => {
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=1&perPage=100')
      .reply(200, {
        data: assetsPage1,
        pagination: page(1)
      });
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=2&perPage=100')
      .reply(200, {
        data: assetsPage2,
        pagination: page(2)
      });
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=1&perPage=100&sectors[]=Stock')
      .reply(200, {
        data: assetsFilterResult,
        pagination: page(1)
      }).persist();
    nock('http://127.0.0.1/')
      .get('/assets?currentPage=2&perPage=100&sectors[]=Stock')
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
