/*
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
    function flexCarousel(options) {
      var self = this;

      self.options = {
        // Defaults
        arrows: true,
        arrowsOverlay: true,
        autoplay: false,
        autoplaySpeed: 5000,
        circles: true,
        circlesOverlay: true,
        height: null,
        loop: true,
        nextArrow: '<div class="fc-next"><span class="fc-icon"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></span></div>',
        prevArrow: '<div class="fc-prev"><span class="fc-icon"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></span></div>',
        slidesVisible: 1,
        transition: 'slide',
      };

      self.init();
    }

    return flexCarousel;
  }());

  flexCarousel.prototype.init = function() {
    var self = this;

    if(self.options.arrows) {
      console.log('yes');
    }
  };

  $.fn.flexCarousel = function() {
    var self = this;
    var options = arguments[0];

    for (var i = 0; i < self.length; i++) {
      if (typeof options == 'object' || typeof options == 'undefined') {
        self[i].flexCarousel = new flexCarousel(self[i], options);
      }
    }

    return self;
  };
}));