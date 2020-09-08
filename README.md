## FlexCarousel.js

A simple, lightweight Flexbox carousel ES6 JavaScript plugin. An unofficial fork of [Slick Carousel](https://github.com/kenwheeler/slick/).

### Status

[![npm version](https://img.shields.io/npm/v/flexcarouseljs.svg)](https://npmjs.com/package/flexcarouseljs)
![CI](https://github.com/tomhrtly/FlexCarousel.js/workflows/CI/badge.svg)
[![downloads](https://img.shields.io/npm/dm/flexcarouseljs.svg)](https://npmjs.com/package/flexcarouseljs)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/tomhrtly/FlexCarousel.js/blob/master/LICENSE)
![Contributing](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

### Getting Started

* [Download the latest release.](https://github.com/tomhrtly/FlexCarousel.js/archive/v1.2.0.zip)
* Clone the repo: `git clone https://github.com/tomhrtly/FlexCarousel.js.git`
* Install with [npm](https://www.npmjs.com/): `npm install flexcarouseljs`

### Documentation

- [Installation](#installation)
    - [npm](#npm)
    - [CDN](#cdn)
        - [CSS](#css)
        - [JS](#js)
    - [Download](#download)
- [Configuration](#configuration)
    - [How to Use](#how-to-use)
        - [Document Setup](#document-setup)
        - [Quick-start Template](#quick-start-template)
        - [Styling](#styling)
            - [Sass](#sass)
                - [Initial Variables](#initial-variables)
                - [Derived Variables](#derived-variables)
            - [File Structure](#file-structure)
- [Options](#options)
    - [appendArrows](#appendarrows)
    - [arrows](#arrows)
    - [arrowsOverlay](#arrowsoverlay)
    - [autoplay](#autoplay)
    - [autoplaySpeed](#autoplayspeed)
    - [circles](#circles)
    - [circlesOverlay](#circlesoverlay)
    - [height](#height)
    - [infinite](#infinite)
    - [initialPage](#initialpage)
    - [nextButton](#nextbutton)
    - [prevButton](#prevbutton)
    - [responsive](#responsive)
    - [slidesPerPage](#slidesperpage)
    - [slidesScrolling](#slidesscrolling)
    - [transition](#transition)
    - [transitionSpeed](#transitionspeed)
- [Events](#events)
- [Compatibility](#compatibility)

### Installation

#### npm

To get started, install FlexCarousel.js via the npm package manager. This is the recommended way of installing FlexCarousel.js and it also integrates with module bundlers such as [Webpack](https://webpack.js.org/).

```
$ npm install flexcarouseljs
```

#### CDN
For those wanting to quickly prototype carousel's for their applications, feel free to use the latest stable build provided by [jsDelivr](https://www.jsdelivr.com/).

##### CSS
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flexcarouseljs@1.2.0/dist/FlexCarousel.min.css">
```

##### JS
```html
<script src="https://cdn.jsdelivr.net/npm/flexcarouseljs@1.2.0/dist/FlexCarousel.min.js"></script>
```

#### Download
You can also traditionally [download](https://github.com/tomhrtly/FlexCarousel.js/archive/v1.2.0.zip) the build files locally if you wish.

### Configuration

#### How to Use
Before you start using FlexCarousel.js, make sure your web page is set up to the latest development standards. This means using the correct document declaration and including the responsive meta tag.

##### Document Setup
```html
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    </body>
</html>
```

##### Quick-start Template
After setting up your web page correctly, this is what your full HTML structure should look like to initialize FlexCarousel.js.

Use a semantic unordered list with a list item for each carousel slide wrapped in a HTML tag with a unique identifier to initialize the carousel.

Having trouble getting your carousel to work correctly? Check out this [CodePen example](https://codepen.io/tomhrtly/pen/eXRpOg/).

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flexcarouseljs@1.2.0/dist/FlexCarousel.min.css">
    </head>
    <body>
        <div class="my-class">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/flexcarouseljs@1.2.0/dist/FlexCarousel.min.js"></script>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                const carousel = new FlexCarousel('.my-class');
            });
        </script>
  </body>
</html>
```

#### Styling
It's very easy to take advantage of the FlexCarousel.js Sass file so that you can style your carousel components easily to integrate with your current projects.

Your file structure will depend on your project and if you are using a package manager such as [npm](https://www.npmjs.com/) (recommended).

##### Sass
Below you can find two tables of all the Sass variables available for you to change the value of as the variables include the `!default` suffix.

Each variable also has a prefix, `fc-` to avoid conflicts with other frameworks and variables.

###### Initial Variables
| Name | Type | Default |
|---|---|---|
| `$fc-black` | Color | `#1b1b1b` |
| `$fc-space` | Size | `16px` |

###### Derived Variables
| Name | Type | Default |
|---|---|---|
| `$fc-prev-next-height` | Computed | `$fc-space * 1.5` |
| `$fc-prev-next-min-width` | Computed | `$fc-space * 8` |
| `$fc-slide-min-height` | Computed | `$fc-space * 6` |
| `$fc-slide-padding` | Computed | `$fc-spacer` |
| `$fc-circle-height` | Computed | `$fc-spacer` |
| `$fc-circle-width` | Computed | `$fc-spacer` |

##### File Structure

We do not recommend that you edit the FlexCarousel.js source files within `node_modules`, this is because when you update the package through npm, your changes will be removed and there may be problems sharing your repository with FlexCarousel.js as a dependency.

To change any of the available Sass variables stated above, you should import the source file into your Sass setup and override the default variables. Your file structure should look something like this if using a package manager.

```
my-project/
├── sass
│   └── custom.sass
└── node_modules/
    └── flexcarouseljs
        └── src
            └── FlexCarousel.sass
```

Next, you need to override the default variables *before* importing the Sass file and lastly compile your custom Sass file.

```
$fc-black: blue

import '~flexcarouseljs/src/FlexCarousel'
```

### Options

It's very easy to customise your carousel by changing the options given to you. All you have to do is invoke the FlexCarousel function and pass an object with the options you wish to change from the default value.

```javascript
const carousel = new FlexCarousel('.my-class', {
    option: value,
});
```

#### `appendArrows`

Type: String

Default: `this.selector`

The HTML element which the arrows will be appended to if you want to have more flexibility to how your carousel looks. When using this option, you will most likely want to add your own styles for the previous and next buttons.

```
const carousel = new FlexCarousel('.my-class', {
    appendArrows: document.querySelector('.my-arrows'),
});
``` 

#### `arrows`

Type: Boolean

Default: `true`

Determines whether a previous and next arrow should be shown on either side of the slides so that the user can change the active page.

```
const carousel = new FlexCarousel('.my-class', {
    arrows: false,
});
``` 

#### `arrowsOverlay`

Type: Boolean

Default: `true`

Determines whether the arrows overlay onto the active slide or have their own wrapping elements. `arrows` must be set to `true` for this option to work.

```
const carousel = new FlexCarousel('.my-class', {
    arrowsOverlay: false,
});
``` 

#### `autoplay`

Type: Boolean

Default: `false`

Determines whether the active slide changes to the next slide on a time delay. The carousel will pause when the user hovers their mouse over the selector for improved accessibility.

```
const carousel = new FlexCarousel('.my-class', {
    autoplay: true,
});
```

#### `autoplaySpeed`

Type: Integer

Default: `5000`

Determines how long the active slide(s) will stay active for before transitioning to the next slide.

`autoplay` must be set to `true` for this option to work.

```
const carousel = new FlexCarousel('.my-class', {
    autoplay: true,
    autoplaySpeed: 2000,
});
```

#### `circles`

Type: Boolean

Default: `true`

Determines whether navigation circles should be shown at the bottom of the carousel for users to quickly select which slide to view.

```
const carousel = new FlexCarousel('.my-class', {
    circles: false,
});
``` 

#### `circlesOverlay`

Type: Boolean

Default: `true`

Determines whether the circles overlay onto the active slide(s) or have their own wrapping elements. `circles` must be set to `true` for this option to work.

```
const carousel = new FlexCarousel('.my-class', {
    circlesOverlay: false,
});
``` 

#### `height`

Type: String

Default: `null`

Defines whether a fixed height is to be added to the carousel selector element.

```
const carousel = new FlexCarousel('.my-class', {
    height: '400px',
});
``` 

#### `infinite`

Type: Boolean

Default: `true`

Determines if the carousel will continuously loop over the slides or have the prev/next buttons disabled when on the first/last slide.

```
const carousel = new FlexCarousel('.my-class', {
    infinite: false,
});
``` 

#### `initialPage`

Type: Integer

Default: `0`

Defines which page index the carousel will start on.

```
const carousel = new FlexCarousel('.my-class', {
    initialPage: 2,
});
``` 

#### `nextButton`

Type: String

Default: `<svg ...`

Defines the HTML code for the element which changes the active slide(s) to the next slide when clicked on. Out of the box, we use [Font Awesome](https://fontawesome.com) icons.

```
const carousel = new FlexCarousel('.my-class', {
    nextButton: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-circle-right" class="svg-inline--fa fa-arrow-circle-right fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path></svg>',
});
``` 

#### `prevButton`

Type: String

Default: `<svg ...`

Defines the HTML code for the element which changes the active slide(s) to the previous slide when clicked on. Out of the box, we use [Font Awesome](https://fontawesome.com) icons.

```
const carousel = new FlexCarousel('.my-class', {
    prevButton: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-circle-left" class="svg-inline--fa fa-arrow-circle-left fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"></path></svg>';
});
``` 

#### `responsive`

Type: Array

Default: `null`

A collection of objects which defines options for specific breakpoints.

Each object must contain a `breakpoint` and `options` key. The former key must be an integer which defines the breakpoint for the `options` object to apply to.

This works from a mobile-first approach and each breakpoint will use the previous breakpoint's options.

```
const carousel = new FlexCarousel('.my-class', {
    arrows: false,
    responsive: [
        {
            breakpoint: 992,
            options: {
                autoplay: true,
            },
        },
    ],
});
``` 

#### `slidesPerPage`

Type: Integer

Default: `1`

Defines how many slides are visible on a page at any given time.

```
const carousel = new FlexCarousel('.my-class', {
    slidesPerPage: 3,
});
``` 

#### `slidesScrolling`

Type: Integer

Default: `1`

Defines how many slides should be moved when going to the next page of slides. You don't want to have this option value higher than `slidesPerPage` as this may lead to poor accessibility and user experience.

```
const carousel = new FlexCarousel('.my-class', {
    slidesPerPage: 3,
    slidesScrolling: 3,
});
```

#### `transition`

Type: String

Default: `slide`

Defines which transition should be used when changing the active slide(s). Current transitions available are: `none` and `slide`.

```
const carousel = new FlexCarousel('.my-class', {
    transition: 'none',
});
``` 

#### `transitionSpeed`

Type: Integer

Default: `250`

Defines the transition speed when the slide is being changed. `transition` must be set to `slide` for this option to work.

```
const carousel = new FlexCarousel('.my-class', {
    transitionSpeed: 1000,
});
``` 

### Events

FlexCarousel.js exposes many custom events that you can use to "hook" in your own logic into your carousel if needed.

Below you will find a table complete with all of the custom events available and how to utilise them.

| Event Type | Description |
| --------- | --------- |
| `breakpoint` | This event fires when the carousel is re-initialised after a breakpoint change. |
| `pageChanged` | This event fires when the current page has stopped changing. |
| `pageChanging` | This event is fired immediately when the current page changes. |

```
const carousel = new FlexCarousel('.my-class');

carousel.selector.addEventListener('pageChanged', function () => {
    console.log(`You're viewing page index: ${carousel.currentPage}`);
});
```

### Compatibility

FlexCarousel.js supports the latest, stable releases of all major browsers except Internet Explorer.

We build the carousels using Flexbox browser technology and ES6 syntax which is compiled to ES5 for production-ready code. You can find browser compatibility statistics for both Flexbox and ES5 on [Can I use...](https://caniuse.com).

However, for a quick overview - read the table below which shows you the browser support for FlexCarousel.js. All browser tests are conducted with [Browser Stack](https://browserstack.com).

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Microsoft Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Mozilla Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Google Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| >=16 | >=52 | >=55 | >=11.1 | >=42 |

### Contributing

Feel free to submit a pull request with any changes that will help make this project better!
