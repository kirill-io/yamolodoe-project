export default class TransitionFromSliderToCheckbox {
  constructor({ checkboxSelector }, controls) {
    this._checkboxElements = [...document.querySelectorAll(checkboxSelector)];
    this._setControls(controls);
  }

  _openCheckbox(id) {
    for (const checkbox of this._checkboxElements) {
      if (checkbox.id === id) {
        checkbox.checked = true;
        checkbox.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  }

  _setControls(controls) {
    for (const element of controls) {
      if (element.dataset.id) {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          this._openCheckbox(event.target.dataset.id);
        });
      }
    }
  }

  static init({ buttonSlector }) {
    return [...document.querySelectorAll(buttonSlector)];
  }
}
