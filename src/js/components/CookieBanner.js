export default class CookieBanner {
  constructor({
    cookieBannerSelector,
    cookieButtonSelector,
    cookieBannerHiddenSelector,
    cookieBannerVisibleSelector,
  }, options = {}) {
    this._banner = document.querySelector(cookieBannerSelector);
    this._button = this._banner?.querySelector(cookieButtonSelector);
    this._bannerHiddenSelector = cookieBannerHiddenSelector;
    this._bannerVisibleSelector = cookieBannerVisibleSelector;
    this._cookieKey = options.cookieKey || 'cookieAcceptedTime';
    this._expireTime = options.expireTime || 4.32e7;
    this._showDelay = options.showDelay || 1000;

    if (!this._banner || !this._button) return;

    window.addEventListener('load', () => this.#init());
  }

  #init() {
    const savedTime = localStorage.getItem(this._cookieKey);

    if (!savedTime || Date.now() - parseInt(savedTime, 10) > this._expireTime) {
      setTimeout(() => this.#show(), this._showDelay);
    }

    this._button.addEventListener('click', () => this.#accept());
  }

  #show() {
    this._banner.classList.remove(this._bannerHiddenSelector);
    this._banner.classList.add(this._bannerVisibleSelector);
  }

  #hide() {
    this._banner.classList.remove(this._bannerVisibleSelector);
    this._banner.classList.add(this._bannerHiddenSelector);
  }

  #accept() {
    localStorage.setItem(this._cookieKey, Date.now().toString());
    this.#hide();
  }
}
