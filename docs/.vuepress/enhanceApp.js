import FlexCarousel from '../../src/flexCarousel';

window.FlexCarousel = FlexCarousel;

export default ({
    Vue,
    router,
    siteData
}) => {
    router.addRoutes([
        { path: '/docs', redirect: `/docs/${siteData.themeConfig.currentVersion}` },
        { path: `/docs/${siteData.themeConfig.currentVersion}`, redirect: `/docs/${siteData.themeConfig.currentVersion}/installation` },
    ])
}
