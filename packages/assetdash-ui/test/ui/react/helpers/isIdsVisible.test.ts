import {expect} from 'chai';
import {isIdsVisible} from '../../../../src/ui/react/helpers/isIdsVisible';

describe('isIdsVisible', () => {
  const location = {
    pathname: '/',
    search: ''
  };

  describe('show ids', () => {
    it('search results', async () => {
      const newLocation = {...location, search: '?q=aapl'};
      expect(isIdsVisible(newLocation)).to.be.true;
    });

    it('sort results', async () => {
      const newLocation = {...location, pathname: '/Stock/largest-companies-by-market-cap'};
      expect(isIdsVisible(newLocation)).to.be.true;
    });

    it('second page of sort results', async () => {
      const newLocation = {pathname: '/Stock/largest-companies-by-market-cap', search: '?p=2'};
      expect(isIdsVisible(newLocation)).to.be.true;
    });

    it('watchlist', async () => {
      const newLocation = {...location, pathname: '/watchlist'};
      expect(isIdsVisible(newLocation)).to.be.true;
    });
  });

  describe('don\'t show ids', () => {
    it('main page', async () => {
      expect(isIdsVisible(location)).to.be.false;
    });

    it('second page', async () => {
      const newLocation = {...location, search: '?p=2'};
      expect(isIdsVisible(newLocation)).to.be.false;
    });

    it('view all', async () => {
      const newLocation = {...location, pathname: '/all'};
      expect(isIdsVisible(newLocation)).to.be.false;
    });
  });
});
