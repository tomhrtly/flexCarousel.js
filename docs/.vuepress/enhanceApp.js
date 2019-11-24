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

    const routes = [
        {
            path: '/docs',
            redirect: `/docs/${siteData.themeConfig.currentVersion}`
        },
        {
            path: '/examples',
            redirect: '/examples/basic'
        },
    ];

    siteData.themeConfig.versions.forEach((element) => {
        routes.push({
            path: `/docs/${element}/`,
            redirect: `/docs/${element}/installation`
        })
    });

    router.addRoutes(routes);
}
