/*
 * flexCarousel.js v0.0.2
 * https://github.com/tomhrtly/flexCarousel.js
 *
 * Copyright 2018 Tom Hartley
 * Released under the MIT license
 */
(function ($) {
  $.fn.flexCarousel = function(options) {
    var settings = $.extend({
      arrows: true,
      arrowsOverlay: true,
      autoplay: false,
      autoplaySpeed: 5000,
      circles: true,
      circlesOverlay: true,
      height: null,
      loop: true,
      nextArrow: '<i class="fas fa-angle-right"></i>',
      prevArrow: '<i class="fas fa-angle-left"></i>',
      slidesVisible: 1,
    }, options);

    var flexCarouselSlides = $('.flexCarousel-slides');
    var flexCarouselSlide = $('.flexCarousel-slide');

    // This adds the animation class to the slides element
    flexCarouselSlides.addClass('flexCarousel-animate');

    // Functions to execute when the onLeftClick var has been called
    var onLeftClick = function() {
      setTimeout(toggleAnimate, 50);
      toggleReverse(true);
      setOrder('left');
      checkLoop();
      toggleAnimate();
    }

    // Functions to execute when the onRightClick var has been called
    var onRightClick = function() {
      setTimeout(toggleAnimate, 50);
      toggleReverse(false);
      setOrder('right');
      checkLoop();
      toggleAnimate();
    }

    // Set the left property value to auto if the amount of slides visible is the same as the total number of slides
    if(settings.slidesVisible === flexCarouselSlide.length) {
      flexCarouselSlides.css('left', 'auto');
    }

    // What happens when the toggleReverse var is called
    var toggleReverse = function(check) {
      percentageToScroll = 100 / settings.slidesVisible + '%';

      if(check === true) {
        flexCarouselSlides.css('transform', 'translateX(-' + percentageToScroll + ')');
      } else {
        flexCarouselSlides.css('transform', 'translateX(' + percentageToScroll + ')');
      }
    }

    // What happens when the toggleAnimate var is called
    var toggleAnimate = function() {
      flexCarouselSlides.toggleClass('flexCarousel-animate');
    }

    // Sets the order CSS property for all the slides
    var setOrder = function(direction) {

      // If the order amount is going to decrease or increase
      if(direction === 'left') {
        flexCarouselSlide.each(function() {

          // Sets the order property for all slides
          var convertedOrder = parseInt($(this).css('order'));

          // Increase the order property value
          var orderIncrease = convertedOrder + 1;

          // If the order property of the slide is the same as the total amount of slides, set the value to 1, else increase the value
          if(convertedOrder === flexCarouselSlide.length) {
            $(this).css('order', '1');
          } else {
            $(this).css('order', orderIncrease);
          }
        });
      } else if(direction === 'right') {
        flexCarouselSlide.each(function() {

          // Sets the order property for all slides
          var convertedOrder = parseInt($(this).css('order'));

          // Decrease the order property value
          var orderDecrease = convertedOrder - 1;

          // If the order property of the slide is 1, set the value to total amount of slides, else decrease the value
          if(convertedOrder === 1) {
            $(this).css('order', flexCarouselSlide.length);
          } else {
            $(this).css('order', orderDecrease);
          }
        });
      }
    }

    if(settings.arrows) {
      if(settings.slidesVisible !== flexCarouselSlide.length) {
        // Adds the prev and next div elements to the carousel element
        $('.flexCarousel').prepend('<div class="flexCarousel-prev"><span class="flexCarousel-icon">' + settings.prevArrow + '</span></div>');
        $('.flexCarousel').append('<div class="flexCarousel-next"><span class="flexCarousel-icon">' + settings.nextArrow + '</span></div>');

        var flexCarouselNext = $('.flexCarousel-next');
        var flexCarouselPrev = $('.flexCarousel-prev');

        // Adds the active class to the next element as this should always be visible if the arrows are enabled
        flexCarouselNext.addClass('is-active');

        // If the loop is set, the prev element must be always active
        if(settings.loop == true) {
          flexCarouselPrev.addClass('is-active');
        }

        if(settings.arrowsOverlay) {

          // Adds the overlay class for relative positiing
          $('.flexCarousel').addClass('flexCarousel-has-overlay');

          // The whole prev and next div elements should move the slide when clicked on
          flexCarouselPrev.click(onLeftClick);
          flexCarouselNext.click(onRightClick);
        } else {

          // Only the icons inside the prev and next div elements should be clickable when there is no overlay
          $('.flexCarousel-prev .flexCarousel-icon').click(onLeftClick);
          $('.flexCarousel-next .flexCarousel-icon').click(onRightClick);
        }

        if(settings.arrowsOverlay && settings.circles) {
          if(settings.circlesOverlay === false) {
            flexCarouselNext.css('height', '92%');
            flexCarouselPrev.css('height', '92%');
          }
        }
      }
    }

    var checkLoop = function() {
      if(settings.arrows) {
        if(settings.loop == false) {

          // If there is no loop, when the first child has the order: 2; property, the prev div element should be hidden
          if($('.flexCarousel-slide:first-child').css('order') === '2') {
            flexCarouselPrev.removeClass('is-active');
          } else {
            flexCarouselPrev.addClass('is-active');
          }

          // If there is no loop, when the last child has the order: 2; property, the next div element should be hidden
          if($('.flexCarousel-slide:last-child').css('order') === '2') {
            flexCarouselNext.removeClass('is-active');
          } else {
            flexCarouselNext.addClass('is-active');
          }
        }
      }
    }

    if(settings.circles) {
      $('.flexCarousel-container').append('<div class="flexCarousel-thumbnails"></div>');

      var circles = flexCarouselSlide.length / settings.slidesVisible;

      for(var i=0; i < circles; i++){
        $('.flexCarousel-thumbnails').append('<div class="flexCarousel-thumbnail"><span class="flexCarousel-icon"><i class="fas fa-circle fa-xs"></i></span></div>');
      }

      // Add active states for clicking on the circles
      $('.flexCarousel-thumbnail').click(function() {
        $(this).addClass('flexCarousel-is-active');
        $('.flexCarousel-thumbnail').not($(this)).removeClass('flexCarousel-is-active');
      });

      // Add the thumbnail wrapping element if circles is true
      if(settings.circlesOverlay) {

        // Set the overlay classes if circlesOverlay is true
        $('.flexCarousel-container').addClass('flexCarousel-has-overlay');
        $('.flexCarousel-thumbnails').addClass('flexCarousel-is-overlay');
      }
    }

    flexCarouselSlide.each(function() {
      // Adds a min width propety where the value is caculated by dividing 100% by the amount of slides visible
      flexCarouselSlide.css('min-width', 'calc(100% / ' + settings.slidesVisible + ')');

      // Each slides order property value is the slides visisble amount plus one
      var index = $(this).index() + settings.slidesVisible + 1;
      $(this).css('order', index);

      // The first childs order property value is the slides visisble amount plus one so that it is always the first slide visible
      $('.flexCarousel-slide:first-child').css('order', settings.slidesVisible + 1);

      // Variable that holds the amount of slides below the amount that is visible
      var slidesLeftAmount = flexCarouselSlide.slice( flexCarouselSlide.length-settings.slidesVisible, flexCarouselSlide.length );

      // For each of the slides that are below the amount that is visible, increase the order property value by 1
      i = 1;
      slidesLeftAmount.each(function() {
        $(this).css('order', i++);
      });
    });

    if(settings.autoplay) {

      // If the autoplay is enabled, use the autoplaySpeed value whether it is defined
      setInterval(function() {
        onRightClick();
      }, settings.autoplaySpeed);
    }

    // Set a fixed height if a value is given
    if(settings.height) {
      $('.flexCarousel').css('height', settings.height);
    }
  };
}(jQuery));
