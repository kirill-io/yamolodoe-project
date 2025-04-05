export default class PreloaderPage {
  constructor({ preloaderElement, contentElement }) {
    this._preloader = preloaderElement;
    this._content = contentElement;
    this._enablePreloaderPage();
  }

  _enablePreloaderPage() {
    this._pageLoadHandler();
  }

  _pageLoadHandler() {
    this._preloader.animate(
      { opacity: [1, 0] },
      { duration: 500, easing: 'ease-out' },
    ).onfinish = () => {
      this._preloader.style.display = 'none';
    };

    this._content.style.display = 'block';
    this._content.animate(
      { opacity: ['0', '1'] },
      { duration: 1000, easing: 'ease-in' },
    );
  }

  static init({ preloaderSelector, contentSelector }) {
    return {
      preloaderElement: document.querySelector(preloaderSelector),
      contentElement: document.querySelector(contentSelector),
    };
  }
}
