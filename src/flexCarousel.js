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
    const self = this;

    self.selector = document.querySelector(selector);

    self.defaults = {
      arrows: true,
      arrowsOverlay: true,
      autoplay: false,
      autoplaySpeed: 5000,
      circles: true,
      circlesOverlay: true,
      height: null,
      nextArrow: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>',
      prevArrow: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>',
      slidesScrolling: 1,
      slidesVisible: 1,
      transition: 'slide',
      transitionSpeed: 250
    };

    self.options = extend(self.defaults, options);
    self.init();

    function extend(defaults, options) {
      let extended = {};

      for (let prop in defaults) {
        if(Object.prototype.hasOwnProperty.call(defaults, prop)) {
          extended[prop] = defaults[prop];
        }
      }

      for (let prop in options) {
        if(Object.prototype.hasOwnProperty.call(options, prop)) {
          extended[prop] = options[prop];
        }
      }

      return extended;
    }
  }

  addTransition() {
    const self = this;
    const slides = this.selector.querySelector('.fc-slides');

    if (self.options.transition === 'slide') {
      slides.style.transition = 'all ' + self.options.transitionSpeed + 'ms ease-in-out 0s';
    }
  }

  removeTransition() {
    const self = this;
    const slides = this.selector.querySelector('.fc-slides');

    if (self.options.transition === 'slide') {
      slides.style.transition = '';
    }
  }

  buildArrowEvents() {
    const self = this;
    const nextArrow = this.selector.querySelector('.fc-next');
    const prevArrow = this.selector.querySelector('.fc-prev');

    if (this.options.arrows) {
      nextArrow.onclick = function() {
        self.moveSlide('next', 1);
      }

      prevArrow.onclick = function() {
        self.moveSlide('prev', 1);
      }
    }
  }

  buildArrows() {
    const self = this;
    const slides = this.selector.querySelector('.fc-slides');
    const slide = slides.querySelectorAll('.fc-slide');

    if (self.options.arrows) {
      if (self.options.slidesVisible < slide.length) {
        self.selector.classList.add('fc-arrows');

        // Create arrow button
        let nextArrow = document.createElement('button');
        nextArrow.classList.add('fc-next', 'fc-is-active');
        nextArrow.innerHTML = '<span class="fc-icon">' + self.options.nextArrow + '</span>';

        // Create prev button
        let prevArrow = document.createElement('button');
        prevArrow.classList.add('fc-prev', 'fc-is-active');
        prevArrow.innerHTML = '<span class="fc-icon">' + self.options.prevArrow + '</span>';

        // Append next arrow to the selector
        self.selector.appendChild(nextArrow);

        // Prepend prev arrow to the selector
        self.selector.insertBefore(prevArrow, self.selector.firstChild);

        if(self.options.arrowsOverlay) {
          self.selector.classList.add('fc-arrows-overlay');
        }
      }
    }
  }

  buildEvents() {
    const self = this;

    self.buildArrowEvents();
  }

  buildSlides() {
    const self = this;
    const children = self.selector.children;

    // Add the slide class to all child div elements
    for (let i = 0; i < children.length; i++) {
      children[i].classList.add('fc-slide');
    }

    // Wrap slides to reduce HTML markup
    let wrapSlides = '<div class="fc-container"><div class="fc-slides">' + self.selector.innerHTML + '</div></div>';
    self.selector.innerHTML = wrapSlides;

    const slides = self.selector.querySelector('.fc-slides');
    const allSlides = slides.querySelectorAll('.fc-slide');
    const slide = slides.querySelector('.fc-slide');

    if (self.options.slidesVisible < allSlides.length) {

      // Add the min-width CSS property to all slides
      for (let i = 0; i < allSlides.length; i++) {
        allSlides[i].style.minWidth = 'calc(100% /' + self.options.slidesVisible + ')';
      }

      slides.style.transform = 'translate3d(-100%, 0px, 0px)';

      // Clone and prepend/append slides
      const array = Array.from(allSlides);
      const prepend = array.slice(allSlides.length - self.options.slidesVisible, allSlides.length).reverse();
      const append = array.slice(0, self.options.slidesVisible);

      for (let i = 0; i < prepend.length; i++) {
        let clone = prepend[i].cloneNode(true);
        clone.classList.add('fc-is-clone');
        slides.insertBefore(clone, slides.firstChild);
      }

      for (let i = 0; i < append.length; i++) {
        let clone = append[i].cloneNode(true);
        clone.classList.add('fc-is-clone');
        slides.appendChild(clone);
      }
    }
  }

  buildOptions() {
    const self = this;

    // Height option
    if (self.options.height) {
      self.selector.style.height = self.options.height;
    }
  }

  init() {
    const self = this;

    // Check if the selector has the "fc" initializer class
    if (!self.selector.classList.contains('fc')) {
      self.selector.classList.add('fc');
      self.buildSlides();
      self.buildArrows();
      self.buildEvents();
      self.buildOptions();
    }
  }

  moveSlide(direction, amount) {
    const self = this;

    if(direction) {
      self.addTransition();
      setTimeout(function() { self.removeTransition(); }, self.options.transitionSpeed);
    }
  }
}

export default FlexCarousel;