import {expect} from 'chai';
import {areIdsVisible} from '../../../../src/ui/react/helpers/areIdsVisible';

describe('areIdsVisible', () => {
  const location = {
    pathname: '/',
    search: ''
  };

  describe('show ids', () => {
    it('search results', async () => {
      const newLocation = {...location, search: '?q=aapl'};
      expect(areIdsVisible(newLocation)).to.be.true;
    });

    it('when filtering by name', async () => {
      const newLocation = {...location, pathname: '/Stock/largest-companies-by-market-cap'};
      expect(areIdsVisible(newLocation)).to.be.true;
    });

    it('second page of sort results', async () => {
      const newLocation = {pathname: '/Stock/largest-companies-by-market-cap', search: '?p=2'};
      expect(areIdsVisible(newLocation)).to.be.true;
    });

    it('watchlist', async () => {
      const newLocation = {...location, pathname: '/watchlist'};
      expect(areIdsVisible(newLocation)).to.be.true;
    });
  });

  describe('don\'t show ids', () => {
    it('main page', async () => {
      expect(areIdsVisible(location)).to.be.false;
    });

    it('second page', async () => {
      const newLocation = {...location, search: '?p=2'};
      expect(areIdsVisible(newLocation)).to.be.false;
    });

    it('view all', async () => {
      const newLocation = {...location, pathname: '/all'};
      expect(areIdsVisible(newLocation)).to.be.false;
    });
  });
});
