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
  constructor (selector, options) {
    this.selector = document.querySelector(selector);

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
      slidesScrolling: 1,
      slidesVisible: 1,
      transition: 'slide',
      transitionSpeed: 250
    };

    this.slideWidth = null;
    this.slideOffset = null;
    this.slideAmount = null;
    this.currentSlide = 0;
    this.options = extend(this.defaults, options);
    this.init();

    function extend (defaults, options) {
      let extended = {};

      for (let prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
          extended[prop] = defaults[prop];
        }
      }

      for (let prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
          extended[prop] = options[prop];
        }
      }

      return extended;
    }
  }

  addTransition() {
    const slides = this.selector.querySelector('.fc-slides');

    // Add transition property to slides when invoked
    if (this.options.transition === 'slide') {
      slides.style.transition = 'all ' + this.options.transitionSpeed + 'ms ease-in-out 0s';
    }
  }

  buildArrowEvents() {
    const nextArrow = this.selector.querySelector('.fc-next');
    const prevArrow = this.selector.querySelector('.fc-prev');

    if (this.options.arrows) {

      // Move to the next slide when clicking the next arrow
      nextArrow.addEventListener('click', () => {
        this.moveSlide('next');
      });

      // Move to the previous slide when clicking the previous arrow
      prevArrow.addEventListener('click', () => {
        this.moveSlide('previous');
      });
    }
  }

  buildArrows() {
    const slides = this.selector.querySelector('.fc-slides');
    const slide = slides.querySelectorAll('.fc-slide');

    if (this.options.arrows) {

      // Only show the arrows if there are more slides then slidesVisible option
      if (this.options.slidesVisible < slide.length) {
        this.selector.classList.add('fc-arrows');

        // Create arrow button
        let nextArrow = document.createElement('button');
        nextArrow.classList.add('fc-next', 'fc-is-active');
        nextArrow.innerHTML = '<span class="fc-icon">' + this.options.nextArrow + '</span>';

        // Create prev button
        let prevArrow = document.createElement('button');
        prevArrow.classList.add('fc-prev', 'fc-is-active');
        prevArrow.innerHTML = '<span class="fc-icon">' + this.options.prevArrow + '</span>';

        // Append next arrow to the selector
        this.selector.appendChild(nextArrow);

        // Prepend prev arrow to the selector
        this.selector.insertBefore(prevArrow, this.selector.firstChild);

        // Add the overlay class if needed
        if (this.options.arrowsOverlay) {
          this.selector.classList.add('fc-arrows-overlay');
        }
      }
    }
  }

  buildEvents() {
    this.buildArrowEvents();
  }

  buildSlides() {
    const children = this.selector.children;

    // Add the slide class to all child div elements
    for (let i = 0; i < children.length; i++) {
      children[i].classList.add('fc-slide');
    }

    // Wrap slides to reduce HTML markup
    this.selector.innerHTML = '<div class="fc-container"><div class="fc-slides">' + this.selector.innerHTML + '</div></div>';

    const slides = this.selector.querySelector('.fc-slides');
    const allSlides = slides.querySelectorAll('.fc-slide');

    this.slideAmount = allSlides.length;

    if (this.options.slidesVisible < this.slideAmount) {
      this.slideWidth = 100 / this.options.slidesVisible;

      // Add the min-width CSS property to all slides
      for (let i = 0; i < this.slideAmount; i++) {
        allSlides[i].style.minWidth = this.slideWidth + '%';
      }

      // Clone and prepend/append slides
      const array = Array.from(allSlides);
      const prepend = array.slice(this.slideAmount - this.options.slidesVisible, this.slideAmount).reverse();
      const append = array.slice(0, this.options.slidesVisible);

      for (let i = 0; i < prepend.length; i++) {
        let clone = prepend[i].cloneNode(true);

        // Add a clone class
        clone.classList.add('fc-is-clone');
        slides.insertBefore(clone, slides.firstChild);
      }

      for (let i = 0; i < append.length; i++) {
        let clone = append[i].cloneNode(true);

        // Add a clone class
        clone.classList.add('fc-is-clone');
        slides.appendChild(clone);
      }

      this.setTransform(this.getLeftSlideWidth(this.currentSlide));
    }
  }

  buildOptions() {
    if (this.options.height) {
      // Add the height property if the option is set
      this.selector.style.height = this.options.height;
    }
  }

  getLeftSlideWidth(index) {
    if (this.options.slidesVisible < this.slideAmount) {
      this.slideOffset = (this.slideWidth * this.options.slidesVisible) * -1;
    }

    return ((index * this.slideWidth) * -1) + this.slideOffset;
  }

  init() {
    // Check if the selector has the "fc" initializer class
    if (!this.selector.classList.contains('fc')) {
      this.selector.classList.add('fc');
      this.buildSlides();
      this.buildArrows();
      this.buildEvents();
      this.buildOptions();
    }
  }

  removeTransition() {
    const slides = this.selector.querySelector('.fc-slides');

    if (this.options.transition === 'slide') {
      // Remove transition property to slides when invoked
      slides.style.transition = '';
    }
  }

  setTransform(position) {
    const obj = {};
    const slides = this.selector.querySelector('.fc-slides');

    obj.transform = 'translate3d(' + Math.ceil(position) + '%' + ', 0px, 0px)';
    slides.style.transform = obj.transform;
  }
}

export default FlexCarousel;