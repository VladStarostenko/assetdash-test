import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class WatchListService {
  get(key: string) {
    return cookies.get(key);
  }

  set(key: string, value: string, options?: object) {
    cookies.set(key, value, options);
  }

  remove(key: string) {
    cookies.remove(key);
  }

  addElementToWatchList(ticker: string) {
    const currentCookie = this.get('watchlist');
    const newCookie = currentCookie ? currentCookie.concat(ticker) : ticker;
    this.set('watchlist', newCookie + '-');
  }

  removeElementFromWatchList(ticker: string) {
    const currentCookie = this.get('watchlist');
    const newCookie = currentCookie.replace(`${ticker}-`, '');
    this.set('watchlist', newCookie);
  }

  isInWatchList(ticker: string) {
    const watchList = this.get('watchlist') ? this.get('watchlist').split('-') : [];
    return watchList.indexOf(ticker) !== -1;
  };
}
