import {render} from '@testing-library/react';
import adapter from 'axios/lib/adapters/http';
import {expect} from 'chai';
import nock from 'nock';
import React from 'react';
import {Api} from '../../../../src/integration/http/api';
import {Assets} from '../../../../src/ui/react/Assets/Assets';
import {ServiceContext} from '../../../../src/ui/react/hooks/useServices';
import {Services} from '../../../../src/ui/react/services';
import {ThemeContextProvider} from '../../../../src/ui/react/Theme/ThemeContextProvider';

function createTestServices(): Services {
  const config = Object.freeze({baseURL: 'http://127.0.0.1'});
  const axiosConfig = {...config, adapter};
  return {
    config,

    api: new Api(axiosConfig)
  };
}

describe('Assets', () => {
  it('are sorted by rank by default', async () => {
    nock('http://127.0.0.1/')
      .get('/assets/page/1/100')
      .reply(200, [
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
        }
      ]);
    const {findAllByTestId} = render(<ServiceContext.Provider value={createTestServices()}><ThemeContextProvider>
      <Assets activeTab='Assets' setTab={() => { /**/ }} tabs={['Assets']}/>
    </ThemeContextProvider></ServiceContext.Provider>);

    const names = await findAllByTestId('asset-row-name');
    expect(names.map(el => el.textContent)).to.deep.eq(['Apple Inc.', 'Microsoft Corporation']);
  });
});
