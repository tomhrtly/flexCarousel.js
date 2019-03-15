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
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function($) {
  'use strict';

  // Set flexCarousel as a object
  var flexCarousel = window.flexCarousel || {};

  flexCarousel = (function() {
    function flexCarousel(selector, options) {
      const self = this;

      self.defaults = {
        arrows: true,
        arrowsOverlay: true,
        autoplay: false,
        autoplaySpeed: 5000,
        height: null,
        nextArrow: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>',
        prevArrow: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>',
        slidesVisible: 1,
        transition: 'slide',
      };

      // Combine both objects
      self.options = $.extend(self.defaults, options);

      self.selector = $(selector);
      self.init();
    }

    return flexCarousel;
  }());

  var object = flexCarousel.prototype;

  object.autoplay = function() {
    const self = this;

    if(self.options.autoplay) {
      self.timer = setInterval(function() { self.moveSlide('next'); }, self.options.autoplaySpeed);
    }
  }

  object.buildArrowEvents = function() {
    const self = this;
    var prev = self.selector.find('.fc-prev');
    var next = self.selector.find('.fc-next');

    if(self.options.arrows) {
      if(self.options.arrowsOverlay) {
        prev.click(function() { self.moveSlide('prev'); });
        next.click(function() { self.moveSlide('next'); });
      } else {
        self.selector.find('.fc-prev .fc-icon').click(function(){ self.moveSlide('prev'); });
        self.selector.find('.fc-next .fc-icon').click(function(){ self.moveSlide('next'); });
      }
    }
  }

  object.buildArrows = function() {
    const self = this;
    var slide = self.selector.find('.fc-slide');

    if(self.options.arrows) {
      if(self.options.slidesVisible < slide.length) {
        self.selector.prepend('<div class="fc-prev"><span class="fc-icon">' + self.options.prevArrow + '</span></div>');
        self.selector.append('<div class="fc-next"><span class="fc-icon">' + self.options.nextArrow + '</span></div>');

        var prev = self.selector.find('.fc-prev');
        var next = self.selector.find('.fc-next');

        next.addClass('fc-is-active');
        prev.addClass('fc-is-active');

        if (self.options.arrowsOverlay) {
          self.selector.addClass('fc-arrow-overlay');
        }
      }
    }
  }

  object.buildEvents = function() {
    const self = this;

    self.buildArrowEvents();
  }

  object.buildSlides = function() {
    const self = this;
    var index = 0;

    var slide = self.selector.find('> div');
    slide.addClass('fc-slide').wrapAll('<div class="fc-container"><div class="fc-slides ' + self.transitionClasses() + '" /></div>');

    var slideWidth = 100 / self.options.slidesVisible + '%';

    var slides = self.selector.find('.fc-slides');

    if(self.options.slidesVisible < slide.length) {
      slides.css('left', '-' + slideWidth);
      slide.last().css('order', 1);

      var i = 2;
      slide.slice(0, slide.length - 1).each(function () {
        $(this).css('order', i++);
      });

      slide.each(function () {
        var image = $(this).find('img');
        var imageCaption = image.data('caption');

        // Wrap the images and use data attribute for captions for cleaner HTML markup
        image.wrap('<figure class="fc-image"></figure>');

        if (imageCaption) {
          image.after('<figcaption>' + imageCaption + '</figcaption>');
        }
      });

      if(self.options.transition === 'slide') {
        slides.css('transform', 'translateX(' + slideWidth + ')');
      }
    }

    slide.css('min-width', 'calc(100% / ' + self.options.slidesVisible + ')');
  }

  object.changeOrder = function(amount) {
    const self = this;
    var slides = self.selector.find('.fc-slides');
    var slide = self.selector.find('.fc-slide');
    var slideWidth = 100 / self.options.slidesVisible + '%';

    if(amount === 'increase') {
      slide.each(function() {
        var convertedOrder = parseInt($(this).css('order'));
        var orderIncrease = convertedOrder + 1;

        if(convertedOrder === slide.length) {
          $(this).css('order', '1');
        } else {
          $(this).css('order', orderIncrease);
        }
      });

      // Determine whether the carousel is going forward or backward
      if(self.options.transition === 'slide') {
        slides.css('transform', 'translateX(-' + slideWidth + ')');
      }
    } else {
      slide.each(function() {
        var convertedOrder = parseInt($(this).css('order'));
        var orderDecrease = convertedOrder - 1;

        if(convertedOrder === 1) {
          $(this).css('order', slide.length);
        } else {
          $(this).css('order', orderDecrease);
        }
      });

      // Determine whether the carousel is going forward or backward
      if(self.options.transition === 'slide') {
        slides.css('transform', 'translateX(' + slideWidth + ')');
      }
    }
  }

  object.height = function() {
    const self = this;

    if(self.options.height) {
      self.selector.css('height', self.options.height);
    }
  }

  object.init = function() {
    const self = this;

    if (!self.selector.hasClass('fc')) {
      self.selector.addClass('fc');

      self.buildSlides();
      self.buildArrows();
      self.buildEvents();
      self.height();
      self.autoplay();
    }
  };

  object.moveSlide = function(direction) {
    const self = this;

    if(direction) {
      setTimeout(function () { self.transition(); }, 1);
      self.transition();
    }

    if(direction === 'next') {
      self.changeOrder('decrease');
    } else {
      self.changeOrder('increase');
    }
  }

  object.transition = function() {
    const self = this;
    var slides = self.selector.find('.fc-slides');

    if(self.options.transition === 'slide') {
      slides.toggleClass('fc-slide-animation');
    }
  }

  object.transitionClasses = function() {
    const self = this;

    if(self.options.transition === 'slide') {
      return 'fc-slide-animation';
    }
  }

  $.fn.flexCarousel = function() {
    const self = this;
    var options = arguments[0];

    for (var i = 0; i < self.length; i++) {
      if (typeof options == 'object' || typeof options == 'undefined') {
        self[i].flexCarousel = new flexCarousel(self[i], options);
      }
    }

    return self;
  };
}));