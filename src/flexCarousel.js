/*
 * flexCarousel.js v0.0.1
 * https://github.com/tomhrtly/flexCarousel.js
 *
 * Copyright 2018 Tom Hartley
 * Released under the MIT license
 */
(function ($) {
  $.fn.flexCarousel = function(options) {
    var settings = $.extend({
      arrows: true,
      arrowsOverlay: false,
      autoplay: false,
      autoplaySpeed: 5000,
      height: null,
      nextArrow: '<i class="fas fa-angle-right"></i>',
      prevArrow: '<i class="fas fa-angle-left"></i>'
    }, options);

    $('.flexCarousel-slides').addClass('flexCarousel-animate');

    var onLeftClick = function() {
      toggleReverse(true);
      setOrder('left');
      toggleAnimate();
      setTimeout(toggleAnimate, 50);
    }

    var onRightClick = function() {
      toggleReverse(false);
      setOrder('right');
      toggleAnimate();
      setTimeout(toggleAnimate, 50);
    }

    var flexCarouselSlides = $('.flexCarousel-slides');
    var flexCarouselSlide = $('.flexCarousel-slide');

    var toggleReverse = function(check) {
      if(check === true) {
        flexCarouselSlides.addClass('flexCarousel-reverse');
      } else {
        flexCarouselSlides.removeClass('flexCarousel-reverse');
      }
    }

    var toggleAnimate = function() {
      flexCarouselSlides.toggleClass('flexCarousel-animate');
    }

    var setOrder = function(direction) {
      if(direction === 'left') {
        flexCarouselSlide.each(function() {
          var convertedOrder = parseInt($(this).css('order'));
          var orderDecrease = convertedOrder + 1;
          if(convertedOrder === flexCarouselSlide.length) {
            $(this).css('order', '1');
          } else {
            $(this).css('order', orderDecrease);
          }
        });
      } else if(direction === 'right') {
        flexCarouselSlide.each(function() {
          var convertedOrder = parseInt($(this).css('order'));
          var orderIncrease = convertedOrder - 1;
          if(convertedOrder === 1) {
            $(this).css('order', flexCarouselSlide.length);
          } else {
            $(this).css('order', orderIncrease);
          }
        });
      }
    }

    flexCarouselSlide.each(function() {
      var index = $(this).index() + 1;
      $(this).css('order', index);
    });

    if(settings.arrows) {
      $('.flexCarousel').prepend('<div class="flexCarousel-prev"><span class="flexCarousel-icon">' + settings.prevArrow + '</span></div>');
      $('.flexCarousel').append('<div class="flexCarousel-next"><span class="flexCarousel-icon">' + settings.nextArrow + '</span></div>');
      $('.flexCarousel-prev').click(onLeftClick);
      $('.flexCarousel-next').click(onRightClick);
      if(settings.arrowsOverlay) {
        $('.flexCarousel').addClass('flexCarousel-has-overlay');
      }
    }

    if(settings.autoplay) {
      setInterval(function() {
        onRightClick();
      }, settings.autoplaySpeed);
    }

    if(settings.circles) {
      $('.flexCarousel-container').append('<div class="flexCarousel-thumbnails"><div class="flexCarousel-thumbnail"><span class="flexCarousel-icon"><i class="fas fa-circle"></i></span></div></div>');
      if(settings.circlesOverlay) {
        $('.flexCarousel-container').addClass('flexCarousel-has-overlay');
        $('.flexCarousel-thumbnails').addClass('flexCarousel-is-overlay');
      }
    }

    if(settings.height) {
      $('.flexCarousel').css('height', settings.height);
    }
  };
}(jQuery));
