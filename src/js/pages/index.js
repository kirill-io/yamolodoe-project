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

new Swiper('.intro__slider-container', {
  modules: [Autoplay, Navigation, Pagination],
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.intro__dots',
  },
  navigation: {
    nextEl: '.intro__slider-button_type_right',
    prevEl: '.intro__slider-button_type_left',
  },
});
