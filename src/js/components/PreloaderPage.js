export default class PreloaderPage {
  constructor({ rootSelector, preloaderSelector, contentSelector }) {
    this._root = document.querySelector(rootSelector);
    this._preloader = document.querySelector(preloaderSelector);
    this._content = document.querySelector(contentSelector);

    if (!this._preloader || !this._content) return;

    this.#init();
  }

  #init() {
    window.addEventListener('load', this.#handlePageLoad.bind(this));
  }

  #handlePageLoad() {
    this.#hidePreloader();
    this.#showContent();
  }

  #hidePreloader() {
    // this._preloader.style.display = 'none';
  }

  #showContent() {
    this._root.style.overflow = 'auto';
    this._content.animate(
      { opacity: ['0', '1'] },
      { duration: 1000, easing: 'ease-in' },
    );
  }
}
