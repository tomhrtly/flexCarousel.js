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
    this.options = options;
    this.init();
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