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

  init() {
    if(!this.selector.classList.contains('fc')) {
      this.selector.classList.add('fc');
    }
  }
}

export default FlexCarousel;