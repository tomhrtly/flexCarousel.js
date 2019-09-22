module.exports = {
    title: 'flexCarousel.js',
    description: 'A simple, lightweight Flexbox carousel JavaScript plugin.',
    head: [
        ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Bree+Serif', }]
    ],
    themeConfig: {
        github: 'https://github.com/tomhrtly/flexCarousel.js',
        twitter: 'https://twitter.com/tomhrtly',
        download: 'https://github.com/tomhrtly/flexCarousel.js/releases/download/v1.0.0/flexCarousel-1.0.0.zip',
        currentVersion: '1.0.0',
        versions: ['master', '1.0.0'],
        nav: [
            { text: 'Home', url: '/', },
            { text: 'Docs', url: '/docs', },
            { text: 'Support', url: 'https://github.com/tomhrtly/flexCarousel.js/issues', external: true, },
        ],
        links: [
            { text: 'Introduction', slug: 'introduction', },
            { text: 'Installation', slug: 'installation', },
            { text: 'Configuration', slug: 'configuration', },
            { text: 'Options', slug: 'options', },
            { text: 'Compatibility', slug: 'compatibility', },
        ],
    },
    plugins: {
        'clean-urls': {
            normalSuffix: '',
            indexSuffix: '/',
        },
    }
};
