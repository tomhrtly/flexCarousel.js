import VuePrism from 'vue-prism';
import 'prismjs/themes/prism-tomorrow.css';

export default ({
    Vue,
    router,
    siteData
}) => {
    Vue.use(VuePrism);
    router.addRoutes([
        { path: '/docs', redirect: `/docs/${siteData.themeConfig.currentVersion}` },
        { path: `/docs/${siteData.themeConfig.currentVersion}`, redirect: `/docs/${siteData.themeConfig.currentVersion}/installation` },
        { path: '/examples', redirect: '/examples/basic' },
    ])
}
