import 'css/pages/index.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import {
  Autoplay,
  Navigation,
  Pagination,
} from 'swiper/modules';
import * as constants from '../utils/constants';
import TransitionFromSliderToCheckbox from '../components/TransitionFromSliderToCheckbox';
import StickyHeader from '../components/StickyHeader';

const {
  containerSelector,
  paginationSelector,
  buttonPrevSelector,
  buttonNextSelector,
} = constants.introSliderConfig;

new Swiper(containerSelector, {
  modules: [Autoplay, Navigation, Pagination],
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: paginationSelector,
  },
  navigation: {
    nextEl: buttonNextSelector,
    prevEl: buttonPrevSelector,
  },
});

new TransitionFromSliderToCheckbox(
  constants.questionsConfig,
  TransitionFromSliderToCheckbox.init(constants.questionsConfig),
);

new StickyHeader(StickyHeader.init(constants.headerConfig));
