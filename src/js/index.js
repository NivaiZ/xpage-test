
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import mobileNav from './modules/burger-menu';
import { useDynamicAdapt } from './modules/dynamic-adapt';
import headerScroll from './modules/header-scroll';
import scrollTop from './modules/scroll-up';
import initBanner from './modules/main-banner';

Fancybox.bind('[data-fancybox]', {});

function handleDOMContentLoaded() {
	headerScroll();
	mobileNav();
	scrollTop();
	useDynamicAdapt("max");
	initBanner();
}
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);