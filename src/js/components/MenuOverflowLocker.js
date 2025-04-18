export default class MenuOverflowLocker {
  constructor({ rootSelector, menuInputSelector }) {
    this._root = document.querySelector(rootSelector);
    this._menuInput = document.querySelector(menuInputSelector);

    this.#init();
  }

  #handleToggle(e) {
    const isChecked = e.target.checked;
    this._root.style.overflow = isChecked ? 'hidden' : 'auto';
  }

  #init() {
    this._menuInput.addEventListener('change', this.#handleToggle.bind(this));
  }
}
