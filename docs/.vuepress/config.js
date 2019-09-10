module.exports = {
    title: 'flexCarousel.js',
    description: 'A simple, lightweight Flexbox carousel JavaScript module.',
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
            { text: 'Docs', url: '/docs', },
            { text: 'Examples', url: '/examples', },
            { text: 'Support', url: 'https://github.com/tomhrtly/flexCarousel.js/issues', external: true, },
        ],
        links: [
            { text: 'Introduction', slug: 'introduction', },
            { text: 'Installation', slug: 'installation', },
            { text: 'Configuration', slug: 'configuration', },
            { text: 'Browser Support', slug: 'browser-support', },
        ],
        examples: [
            { text: 'Arrows', slug: 'arrows', },
            { text: 'Arrows without Overlay', slug: 'arrows-without-overlay', },
            { text: 'Autoplay', slug: 'autoplay', },
            { text: 'Autoplay Speed', slug: 'autoplay-speed', },
            { text: 'Basic', slug: 'basic', },
            { text: 'Circles', slug: 'circles', },
            { text: 'Circles without Overlay', slug: 'circles-without-overlay', },
            { text: 'Different Icons', slug: 'different-icons', },
            { text: 'Fixed Height', slug: 'fixed-height', },
            { text: 'Images', slug: 'images', },
            { text: 'Images with Captions', slug: 'images-with-captions', },
            { text: 'No Transition', slug: 'no-transition', },
            { text: 'Slides Visible', slug: 'slides-visible', },
            { text: 'Videos', slug: 'videos', },
        ],
    },
    plugins: {
        'clean-urls': {
            normalSuffix: '',
            indexSuffix: '/',
        },
    }
};
