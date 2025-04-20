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
    const animation = this._preloader.animate(
      { opacity: ['1', '0'] },
      {
        duration: 1000,
        easing: 'ease-in',
        fill: 'forwards',
      },
    );

    animation.finished.then(() => {
      this._preloader.style.zIndex = '-9999';
      this._preloader.style.pointerEvents = 'none';
    });
  }

  #showContent() {
    window.scrollTo(0, 0);
    this._content.animate(
      { opacity: ['.5', '1'] },
      { duration: 1000, easing: 'ease-in' },
    );
  }
}
