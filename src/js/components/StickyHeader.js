export default class StickyHeader {
  constructor(headerElement) {
    this._header = headerElement;
    this._headerState = true;
    this._lastScroll = 0;
    this._enableStickyHeader();
  }

  _enableStickyHeader() {
    this._setHeaderHeight();
    this._pageScrollHandler();
  }

  _setHeaderHeight() {
    this._headerHeight = this._header.offsetHeight;
  }

  _setScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  _hideHeader() {
    this._header.style.transform = `translateY(-${this._headerHeight}px)`;
    this._headerState = false;
  }

  _showHeader() {
    this._header.style.transform = 'translateY(0px)';
    this._headerState = true;
  }

  _pageScrollHandler() {
    window.addEventListener('scroll', () => {
      this._setHeaderHeight();
      if (
        this._setScrollPosition() > this._lastScroll
        && this._headerState
        && this._setScrollPosition() > this._headerHeight
      ) {
        this._hideHeader();
      } else if (
        this._setScrollPosition() < this._lastScroll
        && !this._headerState
      ) {
        this._showHeader();
      }
      this._lastScroll = this._setScrollPosition();
    });
  }

  static init({ headerSelector }) {
    return document.querySelector(headerSelector);
  }
}
