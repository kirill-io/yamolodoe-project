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
    window.addEventListener('load', () => {
      this._preloader.style.display = 'none';
      this._content.style.display = 'flex';
      this._content.animate(
        { opacity: ['0', '1'] },
        { duration: 1000, easing: 'ease-in' },
      );
    });
  }

  static init({ preloaderSelector, contentSelector }) {
    return {
      preloaderElement: document.querySelector(preloaderSelector),
      contentElement: document.querySelector(contentSelector),
    };
  }
}
