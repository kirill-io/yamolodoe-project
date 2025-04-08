export default class TransitionFromSliderToCheckbox {
  constructor({ checkboxSelector }, controls) {
    this._checkboxElements = [...document.querySelectorAll(checkboxSelector)];
    this.#setControls(controls);
  }

  #openCheckbox(id) {
    for (const checkbox of this._checkboxElements) {
      if (checkbox.id === id) {
        checkbox.checked = true;
        checkbox.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  }

  #setControls(controls) {
    for (const element of controls) {
      if (element.dataset.id) {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          this.#openCheckbox(event.target.dataset.id);
        });
      }
    }
  }

  static init({ buttonSlector }) {
    return [...document.querySelectorAll(buttonSlector)];
  }
}
