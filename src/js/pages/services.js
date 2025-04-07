import 'css/pages/services.css';
import PreloaderPage from '../components/PreloaderPage';
import CookieBanner from '../components/CookieBanner';
import StickyHeader from '../components/StickyHeader';
import * as constants from '../utils/constants';

new PreloaderPage(PreloaderPage.init(constants.preloaderConfig));
new CookieBanner(constants.cookieBannerConfig);
new StickyHeader(StickyHeader.init(constants.headerConfig));
