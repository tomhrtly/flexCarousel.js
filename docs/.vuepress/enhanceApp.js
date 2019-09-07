export default ({ router, siteData }) => {
    router.addRoutes([
        { path: '/docs', redirect: `/docs/${siteData.themeConfig.currentVersion}` },
    ])
}
