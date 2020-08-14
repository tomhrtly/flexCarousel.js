## FlexCarousel.js

A simple, lightweight Flexbox carousel ES6 JavaScript plugin. An unofficial fork of [Slick Carousel](https://github.com/kenwheeler/slick/).

### Status

[![npm version](https://img.shields.io/npm/v/flexcarouseljs.svg)](https://npmjs.com/package/flexcarouseljs)
[![downloads](https://img.shields.io/npm/dm/flexcarouseljs.svg)](https://npmjs.com/package/flexcarouseljs)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/tomhrtly/FlexCarousel.js/blob/master/LICENSE)
[![Contributing](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

### Getting Started

* [Download the latest release.](https://github.com/tomhrtly/FlexCarousel.js/releases/download/v1.0.0/FlexCarousel-1.0.0.zip)
* Clone the repo: `git clone https://github.com/tomhrtly/FlexCarousel.js.git`
* Install with [npm](https://www.npmjs.com/): `npm install flexcarouseljs`

Include the necessary CSS into your web page first.

```
<link rel="stylesheet" href="FlexCarousel.css">
```

Then add some basic markup for your carousel.

```
<div class="my-class">
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
</div>
```

Lastly, import and initialize your carousel.

```
import FlexCarousel from 'flexcarouseljs/src/FlexCarousel.js';

const carousel = new FlexCarousel('.my-class');
```

This provides you with a basic "out of the box" carousel, for more customisation including options, <a href="https://flexcarousel.com/docs/">view our full documentation</a>.

### Compatibility

FlexCarousel.js supports the latest, stable releases of all major browsers except Internet Explorer.

We build the carousels using Flexbox browser technology and ES6 syntax which is compiled to ES5 for production-ready code. You can find browser compatibility statistics for both Flexbox and ES5 on [Can I use...](https://caniuse.com).

However, for a quick overview - read the table below which shows you the browser support for FlexCarousel.js. All browser tests are conducted with [Browser Stack](https://browserstack.com).

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Microsoft Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Mozilla Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Google Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| >=16 | >=52 | >=55 | >=11.1 | >=42 |

### Contributing

Feel free to submit a pull request with any changes that will help make this project better!
