import VuePrism from 'vue-prism';
import 'prismjs/themes/prism-tomorrow.css';
import FlexCarousel from '../../src/flexCarousel';

export default ({
    Vue,
    router,
    siteData
}) => {
    window.flexCarousel = FlexCarousel;
    window.router = router;

    Vue.use(VuePrism);
    router.addRoutes([
        { path: '/docs', redirect: `/docs/${siteData.themeConfig.currentVersion}` },
        { path: `/docs/master/`, redirect: `/docs/master/installation` },
        { path: `/docs/1.0.0/`, redirect: `/docs/1.0.0/installation` },
        { path: '/examples', redirect: '/examples/basic' },
    ])
}
