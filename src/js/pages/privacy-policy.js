import 'css/pages/privacy-policy.css';
import PreloaderPage from '../components/PreloaderPage';
import CookieBanner from '../components/CookieBanner';
import MenuOverflowLocker from '../components/MenuOverflowLocker';
import StickyHeader from '../components/StickyHeader';
import * as constants from '../utils/constants';

new PreloaderPage(constants.preloaderConfig);
new CookieBanner(constants.cookieBannerConfig);
new MenuOverflowLocker(constants.mobileMenuConfig);
new StickyHeader(constants.headerConfig);
