import * as constants from '../utils/constants';

export class IntroSlider {
  constructor(element, controls = []) {
    this._root = element;
    this._options = { ...constants.INTRO_SLIDER_DEFAULT };
    this._container = element.querySelector(this._options.containerSelector);
    this._count = 1;
    this._touchStart = 0;
    this._touchEnd = 0;
    this._touchsMove = [];
    // this._setDotAction();
    this._setControls(controls);
    this._reset();
    // this._setTouchControl();
  }

  // _setTouchControl() {
  //   const slider = this._root.querySelector('.intro__slider');
  //   slider.addEventListener('touchstart', (event) => {
  //     event.stopPropagation();
  //     this._touchStart = parseInt(event.targetTouches[0].clientX, 10);
  //   });
  //   slider.addEventListener('touchmove', (event) => {
  //     event.stopPropagation();
  //     this._touchsMove.push(parseInt(event.targetTouches[0].clientX, 10));
  //   });
  //   slider.addEventListener('touchend', (event) => {
  //     event.stopPropagation();
  //     if (
  //       this._touchStart - this._touchsMove.pop() < 0
  //       && Math.abs(this._touchStart - this._touchsMove.pop()) > 50
  //     ) {
  //       if (!this._timer) {
  //         this._root.querySelector('.intro__slider-container').animate(
  //           [
  //             { opacity: '1' },
  //             { opacity: '0' },
  //             { opacity: '1' },
  //           ],
  //           {
  //             duration: 600,
  //           },
  //         );
  //         this._controls.get('left').onAction.call(this, {
  //           action: this._controls.get('left'),
  //           slider: this,
  //         });
  //       }
  //     } else if (this._touchStart - this._touchsMove.pop() > 0) {
  //       if (!this._timer) {
  //         this._root.querySelector('.intro__slider-container').animate([
  //           { opacity: '1' },
  //           { opacity: '0' },
  //           { opacity: '1' },
  //         ], 600);
  //         this._controls.get('right').onAction.call(this, {
  //           action: this._controls.get('right'),
  //           slider: this,
  //         });
  //       }
  //     }
  //   });
  // }

  // _setDotAction() {
  //   const dots = this._root.querySelectorAll(this._options.dotItemSelector);
  //   dots.forEach((item, i) => {
  //     item.classList.remove(this._options.dotItemActionSelector);
  //     if (this._count === i + 1) {
  //       item.classList.add(this._options.dotItemActionSelector);
  //     }
  //   });
  // }

  _reset() {
    [this._options.slidesAmountVar, this._options.currentSlideVar].forEach(
      (varName) => {
        this._container.style.setProperty(
          varName,
          this._root.style.getPropertyValue(varName),
        );
      },
    );

    this._timer = null;

    setTimeout(() => {
      this._options.transitionDuration = this._getTransitionDuration();
      this._update();
    });
  }

  _setControls(controls) {
    this._controls = new Map();

    for (const { element, onStateChange, onAction } of controls) {
      this._controls.set(element.name, {
        onStateChange,
        onAction,
      });

      element.addEventListener('click', (event) => {
        if (!this._timer) {
          // this._root.querySelector('.intro__slider-container').animate(
          //   [
          //     { opacity: '1' },
          //     { opacity: '0' },
          //     { opacity: '1' },
          //   ],
          //   {
          //     duration: 400,
          //     delay: 100,
          //   },
          // );
          onAction.call(this, {
            action: element,
            slider: this,
            event,
          });
        }
      });
    }
  }

  _getTransitionDuration() {
    return (
      parseFloat(
        window
          .getComputedStyle(this._container)
          .getPropertyValue('transition-duration'),
      ) * 1000
    );
  }

  _update() {
    this._controls.forEach(({ onStateChange }, element) => onStateChange.call(this, {
      action: element,
      slider: this,
    }));
    this._timer = null;
  }

  mutate(callback) {
    const buffer = new IntroSlider(this._root.cloneNode(true));
    callback(buffer);
    this._container.replaceWith(buffer._container);
    this._container = buffer._container;
  }

  getSlide(n) {
    return this._root.querySelectorAll(this._options.itemSelector).item(n - 1);
  }

  get slides() {
    return parseInt(this._root.style.getPropertyValue('--slides'), 10);
  }

  get current() {
    return parseInt(this._container.style.getPropertyValue('--current'), 10);
  }

  set current(value) {
    const delay = Math.abs(this.current - value) * this._options.transitionDuration;
    this._container.style.setProperty('--current', value);
    this._timer = setTimeout(this._update.bind(this), delay);
  }

  static actionLeft(button) {
    return {
      element: button,
      onStateChange: ({ slider }) => {
        if (slider.current === 1) {
          slider.mutate((buffer) => {
            const last = buffer.getSlide(buffer.slides);
            last.remove();
            buffer._container.prepend(last);
            buffer.current = 2;
          });
        }
      },
      onAction: ({ slider }) => {
        slider.current -= 1;
        if (slider._count === 1) {
          slider._count = slider.slides;
        } else {
          slider._count -= 1;
        }
        slider._setDotAction();
      },
    };
  }

  static actionRight(button) {
    return {
      element: button,
      onStateChange: ({ slider }) => {
        if (slider.current === slider.slides) {
          slider.mutate((buffer) => {
            const first = buffer.getSlide(1);
            first.remove();
            buffer._container.append(first);
            buffer.current = buffer.slides - 1;
          });
        }
      },
      onAction: ({ slider }) => {
        slider.current += 1;
        if (slider._count === slider.slides) {
          slider._count = 1;
        } else {
          slider._count += 1;
        }
        slider._setDotAction();
      },
    };
  }
}
