'use strict';

/*!
 * flexCarousel.js v0.1.0
 * https://github.com/tomhrtly/flexCarousel.js
 *
 * Copyright 2018 Tom Hartley
 * Released under the MIT license
 *
 * Icons provided by Font Awesome: https://fontawesome.com
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function($) {

  // Set flexCarousel as a object
  let flexCarousel = window.flexCarousel || {};

  flexCarousel = (function() {
    function flexCarousel(selector, options) {
      const self = this;

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
        slidesVisible: 1,
        slidesPerPage: 1,
        transition: 'slide',
      };

      // Combine both objects
      self.options = $.extend(self.defaults, options);

      // This will always have active slide index
      self.activeSlide = 0;

      self.selector = $(selector);
      self.init();
    }

    return flexCarousel;
  }());

  let object = flexCarousel.prototype;

  object.autoplay = function() {
    const self = this;

    if(self.options.autoplay) {
      self.timer = setInterval(function() { self.moveSlide('next', 1); }, self.options.autoplaySpeed);
    }
  };

  object.buildArrowEvents = function() {
    const self = this;
    let next = self.selector.find('.fc-next');
    let prev = self.selector.find('.fc-prev');

    if(self.options.arrows) {
      prev.click(function() { self.moveSlide('prev', 1); });
      next.click(function() { self.moveSlide('next', 1); });
    }
  };

  object.buildArrows = function() {
    const self = this;
    let slide = self.selector.find('.fc-slide');

    if(self.options.arrows) {
      if(self.options.slidesVisible < slide.length) {
        self.selector.addClass('fc-arrows');
        self.selector.prepend('<div class="fc-prev"><span class="fc-icon">' + self.options.prevArrow + '</span></div>');
        self.selector.append('<div class="fc-next"><span class="fc-icon">' + self.options.nextArrow + '</span></div>');

        let prev = self.selector.find('.fc-prev');
        let next = self.selector.find('.fc-next');

        next.addClass('fc-is-active');
        prev.addClass('fc-is-active');

        if (self.options.arrowsOverlay) {
          self.selector.addClass('fc-arrow-overlay');
        }
      }
    }
  };

  object.buildCircleEvents = function() {
    let self = this;
    let circle = self.selector.find('.fc-circle');

    if(self.options.circles) {
      circle.click(function(event) {
        let $clickedCircle = $(event.currentTarget);
        if(!$clickedCircle.hasClass('fc-is-active')) {
          let index = $clickedCircle.data('fc-slide-index');
          self.goToSlide(index);
        }
      });
    }
  };

  object.buildCircles = function() {
    let self = this;
    let container = self.selector.find('.fc-container');
    let slide = self.selector.find('.fc-slide:not(.fc-is-clone)');

    if(self.options.circles) {
      if(self.options.slidesVisible < slide.length) {
        self.selector.addClass('fc-circles');
        container.append('<div class="fc-circles" />');

        let circles = self.selector.find('.fc-circles');

        slide.each(function (index) {
          if (index % self.options.slidesPerPage === 0) {
            circles.append('<div class="fc-circle" data-fc-slide-index="' + index + '"><span class="fc-icon fc-is-circle"></span></div>');
          }
        });

        let circle = self.selector.find('.fc-circle');

        circle.first().addClass('fc-is-active');

        if (self.options.circlesOverlay) {
          self.selector.addClass('fc-circles-overlay');
        }
      }
    }
  };

  object.buildEvents = function() {
    const self = this;

    self.buildArrowEvents();
    self.buildCircleEvents();
  };

  object.buildSlides = function() {
    const self = this;

    let slide = self.selector.find('> div');
    slide.addClass('fc-slide').wrapAll('<div class="fc-container"><div class="fc-slides ' + self.transitionClasses() + '" /></div>');

    let slideWidth = 100 / self.options.slidesVisible + '%';

    let slides = self.selector.find('.fc-slides');

    if(self.options.slidesVisible < slide.length) {
      slide.css('min-width', 'calc(100% / ' + self.options.slidesVisible + ')');

      slides.css('left', '-' + slideWidth);

      // Clone all the slides, add the correct order property value, slide width and append to the slides container
      // Fixes issue #2
      if(self.options.slidesVisible === slide.length - 1) {
        slide.each(function() {
          $(this).clone().addClass('fc-is-clone').appendTo(slides);
        });
      }
      slides.children().last().css('order', 1);

      let i = 2;
      slides.children().slice(0, slides.children().length - 1).each(function () {
        $(this).css('order', i++);
      });

      slide.each(function (index, element) {
        let slide = $(element);
        let image = slide.find('img');
        let imageCaption = image.data('caption');
        let picture = slide.find('picture');
        let pictureCaption = picture.data('caption');

        // Wrap the images and use data attribute for captions for cleaner HTML markup
        // but only if we have a caption
        if (pictureCaption) {
          picture.wrap('<figure class="fc-image"></figure>');
          picture.after('<figcaption>' + pictureCaption + '</figcaption>');
        } else if (imageCaption) {
          image.wrap('<figure class="fc-image"></figure>');
          image.after('<figcaption>' + imageCaption + '</figcaption>');
        }
      });

      if(self.options.transition === 'slide') {
        slides.css('transform', 'translateX(' + slideWidth + ')');
      }
    }
  };

  object.changeOrder = function(amount, shift) {
    const self = this;
    let slide = self.selector.find('.fc-slide');
    let slides = self.selector.find('.fc-slides');
    let slideWidth = 100 / self.options.slidesVisible + '%';

    if(amount === 'increase') {
      // Determine whether the carousel is going forward or backward
      if(self.options.transition === 'slide') {
        slides.css('transform', 'translateX(-' + slideWidth + ')');
      }

      slide.each(function() {
        let convertedOrder = parseInt($(this).css('order'));
        let orderIncrease = convertedOrder + shift;

        if(orderIncrease > slide.length) {
          orderIncrease = orderIncrease - slide.length;
        }

        $(this).css('order', orderIncrease);
      });
    } else {
      // Determine whether the carousel is going forward or backward
      if(self.options.transition === 'slide') {
        slides.css('transform', 'translateX(' + slideWidth + ')');
      }

      slide.each(function() {
        let convertedOrder = parseInt($(this).css('order'));
        let orderDecrease = convertedOrder - shift;

        if(orderDecrease <= 0) {
          orderDecrease = slide.length + orderDecrease;
        }

        $(this).css('order', orderDecrease);
      });
    }
  };

  object.goToSlide = function(position) {
    const self = this;
    let activeSlide = self.activeSlide;
    let direction = position > activeSlide ? "next": "prev";
    let shift = Math.abs(activeSlide - position);

    self.moveSlide(direction, shift);
  };

  object.height = function() {
    const self = this;

    if(self.options.height) {
      self.selector.css('height', self.options.height);
    }
  };

  object.init = function() {
    const self = this;

    if(!self.selector.hasClass('fc')) {
      self.selector.addClass('fc');

      self.buildSlides();
      self.buildArrows();
      self.buildCircles();
      self.buildEvents();
      self.height();
      self.autoplay();
    }
  };

  object.moveSlide = function(direction, shift) {
    const self = this;
    let activeSlide = self.activeSlide;
    let circle = self.selector.find('.fc-circle');

    if(direction) {
      setTimeout(function () { self.transition(); }, 1);
      self.transition();
    }

    if(direction === 'next') {
      self.changeOrder('decrease', shift);
    } else {
      self.changeOrder('increase', shift);
    }

    // updating active slide number every time slide changes
    self.updateActiveSlideNumber(direction, shift);
    circle.eq(activeSlide).removeClass('fc-is-active');
    circle.eq(self.activeSlide).addClass('fc-is-active');
  };

  object.transition = function() {
    const self = this;
    let slides = self.selector.find('.fc-slides');

    if(self.options.transition === 'slide') {
      slides.toggleClass('fc-slide-animation');
    }
  };

  object.transitionClasses = function() {
    const self = this;

    if(self.options.transition === 'slide') {
      return 'fc-slide-animation';
    }
  };

  object.updateActiveSlideNumber = function(direction, shift) {
    const self = this;
    let slide = self.selector.find('.fc-slide:not(.fc-is-clone)');

    if(direction === 'next') {
      self.activeSlide += shift;
      if(self.activeSlide >= slide.length) {
        self.activeSlide = 0;
      }
    } else {
      self.activeSlide -= shift;
      if(self.activeSlide < -slide.length) {
        self.activeSlide = slide.length - 1;
      }
    }
  };

  $.fn.flexCarousel = function() {
    const self = this;
    let options = arguments[0];

    for (let i = 0; i < self.length; i++) {
      if (typeof options == 'object' || typeof options == 'undefined') {
        self[i].flexCarousel = new flexCarousel(self[i], options);
      }
    }

    return self;
  };
}));