import 'css/pages/contacts.css';
import PreloaderPage from '../components/PreloaderPage';
import CookieBanner from '../components/CookieBanner';
import StickyHeader from '../components/StickyHeader';
import * as constants from '../utils/constants';

new PreloaderPage(constants.preloaderConfig);
new CookieBanner(constants.cookieBannerConfig);
new StickyHeader(constants.headerConfig);
