import 'css/pages/index.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectCoverflow,
} from 'swiper/modules';
import * as constants from '../utils/constants';
import TransitionFromSliderToCheckbox from '../components/TransitionFromSliderToCheckbox';
import StickyHeader from '../components/StickyHeader';

const {
  introContainerSelector,
  introPaginationSelector,
  introButtonPrevSelector,
  introButtonNextSelector,
} = constants.introSliderConfig;

const {
  teamContainerSelector,
  teamButtonPrevSelector,
  teamButtonNextSelector,
} = constants.teamSliderConfig;

new Swiper(introContainerSelector, {
  modules: [Autoplay, Navigation, Pagination],
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: introPaginationSelector,
  },
  navigation: {
    nextEl: introButtonNextSelector,
    prevEl: introButtonPrevSelector,
  },
});

new TransitionFromSliderToCheckbox(
  constants.questionsConfig,
  TransitionFromSliderToCheckbox.init(constants.questionsConfig),
);

new StickyHeader(StickyHeader.init(constants.headerConfig));

new Swiper(teamContainerSelector, {
  modules: [EffectCoverflow, Navigation],
  effect: 'coverflow',
  centeredSlides: true,
  slidesPerView: 3,
  initialSlide: 1,
  loop: true,
  spaceBetween: 50,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    scale: 0.9,
    modifier: 1,
    slideShadows: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 100,
    },
    1921: {
      slidesPerView: 4,
      spaceBetween: 150,
    },
  },
  navigation: {
    nextEl: teamButtonPrevSelector,
    prevEl: teamButtonNextSelector,
  },
});

window.onload = () => {
  const content = document.getElementById('content');
  document.getElementById('preloader').style.display = 'none';
  content.style.display = 'block';
  content.animate(
    { opacity: ['0', '1'] },
    { duration: 1000, easing: 'ease-in' },
  );
};
