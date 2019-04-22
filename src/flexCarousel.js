/*
 * flexCarousel.js v0.3.0
 * https://github.com/tomhrtly/flexCarousel.js
 *
 * Copyright 2018 Tom Hartley
 * Released under the MIT license
 *
 * Icons provided by Font Awesome: https://fontawesome.com
 */

class FlexCarousel {
  constructor(selector, options) {
    this.selector = document.querySelector(selector);
    this.options = extend({}, this.defaults, options);
    this.init();

    this.defaults = {
      arrows: true,
      arrowsOverlay: true,
      autoplay: false,
      autoplaySpeed: 5000,
      circles: true,
      circlesOverlay: true,
      height: null,
      nextArrow: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>',
      prevArrow: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>',
      slidesVisible: 1,
      transition: 'slide',
    }

    function extend(out) {
      out = out || {};

      for(let i = 1; i < arguments.length; i++) {
        if(!arguments[i]) {
          continue;
        }

        for(let key in arguments[i]) {
          if(arguments[i].hasOwnProperty(key))
            out[key] = arguments[i][key];
        }
      }

      return out;
    };
  }

  buildSlides() {
    const slide = this.selector.children;

    // Add the slide class to all child div elements
    for(let i = 0; i < slide.length; i++) {
      slide[i].classList.add('fc-slide');
    }

    // Wrap slides to reduce HTML markup
    let wrapSlides = '<div class="fc-container"><div class="fc-slides">' + this.selector.innerHTML + '</div></div>';
    this.selector.innerHTML = wrapSlides;
  }

  init() {

    // Check if the selector has the "fc" initializer class
    if(!this.selector.classList.contains('fc')) {
      this.selector.classList.add('fc');
      this.buildSlides();
    }
  }
}

export default FlexCarousel;