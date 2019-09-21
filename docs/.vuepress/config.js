module.exports = {
    title: 'flexCarousel.js',
    description: 'A simple, lightweight Flexbox carousel JavaScript plugin.',
    head: [
        ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Bree+Serif', }]
    ],
    themeConfig: {
        github: 'https://github.com/tomhrtly/flexCarousel.js',
        twitter: 'https://twitter.com/tomhrtly',
        download: 'https://github.com/tomhrtly/flexCarousel.js/releases/download/v0.3.0/flexCarousel-0.3.0.zip',
        currentVersion: '0.3.0',
        versions: ['master', '0.3.0'],
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
            { text: 'Browser Support', slug: 'browser-support', },
        ],
    },
    plugins: {
        'clean-urls': {
            normalSuffix: '',
            indexSuffix: '/',
        },
    }
};
