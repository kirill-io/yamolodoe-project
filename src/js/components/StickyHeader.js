export default class StickyHeader {
  constructor({ headerSelector, checkboxSelector }) {
    this._header = document.querySelector(headerSelector);
    this._checkbox = document.querySelector(checkboxSelector);

    if (!this._header || !this._checkbox) return;

    this._headerVisible = true;
    this._lastScrollY = 0;
    this.#setStateCheckbox();
    this.#init();
  }

  #setStateCheckbox() {
    this._checkboxState = this._checkbox.checked;
  }

  #setHeaderHeight() {
    this._headerHeight = this._header.offsetHeight;
  }

  #setScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  #hideHeader() {
    this._header.style.transform = `translateY(-${this._headerHeight}px)`;
    this._headerVisible = false;
  }

  #showHeader() {
    this._header.style.transform = 'translateY(0px)';
    this._headerVisible = true;
  }

  #pageScrollHandler() {
    window.addEventListener('scroll', () => {
      this.#setStateCheckbox();
      this.#setHeaderHeight();
      if (
        this.#setScrollPosition() > this._lastScrollY
        && this._headerVisible
        && this.#setScrollPosition() > this._headerHeight
        && !this._checkboxState
      ) {
        this.#hideHeader();
      } else if (
        this.#setScrollPosition() < this._lastScrollY
        && !this._headerVisible
      ) {
        this.#showHeader();
      }
      this._lastScrollY = this.#setScrollPosition();
    });
  }

  #init() {
    this.#setHeaderHeight();
    this.#pageScrollHandler();
  }
}
