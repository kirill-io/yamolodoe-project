import 'css/pages/index.css';
import { IntroSlider } from '../components/IntroSlider';

const introElement = document.querySelector('.intro');

new IntroSlider(
  introElement,
  [
    IntroSlider.actionLeft(
      introElement.querySelector('.intro__slider-button[name=left]'),
    ),
    IntroSlider.actionRight(
      introElement.querySelector('.intro__slider-button[name=right]'),
    ),
  ],
);
