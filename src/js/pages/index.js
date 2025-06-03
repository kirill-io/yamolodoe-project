import 'css/pages/index.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
} from 'swiper/modules';
import PreloaderPage from '../components/PreloaderPage';
import CookieBanner from '../components/CookieBanner';
import TransitionFromSliderToCheckbox from '../components/TransitionFromSliderToCheckbox';
import MenuOverflowLocker from '../components/MenuOverflowLocker';
import StickyHeader from '../components/StickyHeader';
import * as constants from '../utils/constants';

const {
  introContainerSelector,
  introPaginationSelector,
  introButtonPrevSelector,
  introButtonNextSelector,
} = constants.introSliderConfig;

new PreloaderPage(constants.preloaderConfig);

new CookieBanner(constants.cookieBannerConfig);

new TransitionFromSliderToCheckbox(
  constants.questionsConfig,
  TransitionFromSliderToCheckbox.init(constants.questionsConfig),
);

new MenuOverflowLocker(constants.mobileMenuConfig);

new StickyHeader(constants.headerConfig);

new Swiper(introContainerSelector, {
  modules: [Autoplay, Navigation, Pagination, EffectFade],
  slidesPerView: 1,
  loop: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: introPaginationSelector,
    clickable: true,
  },
  navigation: {
    nextEl: introButtonNextSelector,
    prevEl: introButtonPrevSelector,
  },
});
