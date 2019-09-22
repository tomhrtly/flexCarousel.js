import VuePrism from 'vue-prism';
import 'prismjs/themes/prism-tomorrow.css';
import FlexCarousel from '../../src/flexCarousel';

export default ({
    Vue,
    router,
    siteData
}) => {
    window.flexCarousel = FlexCarousel;

    Vue.use(VuePrism);
    router.addRoutes([
        { path: '/docs', redirect: `/docs/${siteData.themeConfig.currentVersion}` },
        { path: `/docs/${siteData.themeConfig.currentVersion}`, redirect: `/docs/${siteData.themeConfig.currentVersion}/installation` },
        { path: '/examples', redirect: '/examples/basic' },
    ])
}
