/*
 * flexCarousel.js v0.0.3
 * https://github.com/tomhrtly/flexCarousel.js
 *
 * Copyright 2018 Tom Hartley
 * Released under the MIT license
 *
 * Icons provided by Font Awesome: https://fontawesome.com
 */

(function($, window, document, Math, undefined) {
  $.fn.flexCarousel = function(options) {
    options = $.extend({
      // Defaults
      arrows:           true,
      arrowsOverlay:    true,
      autoplay:         false,
      autoplaySpeed:    5000,
      circles:          true,
      circlesOverlay:   true,
      height:           null,
      loop:             true,
      nextArrow:        '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>',
      prevArrow:        '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>',
      slidesVisible:    1,
      transition:       'slide',
    }, options);

    var flexCarousel            = $(this);
    var flexCarouselSlide       = $(this).find('div').addClass('fc-slide');

    flexCarousel.addClass('fc');
    flexCarouselSlide.wrapAll('<div class="fc-container"><div class="fc-slides ' + slidesClasses() + '" /></div>');

    var flexCarouselSlides      = $(this).find('.fc-slides');
    var flexCarouselContainer   = $(this).find('.fc-container');

    var percentageToSlide       = 100 / options.slidesVisible + '%';

    // CSS classes for different transitions
    function slidesClasses() {
      if(options.transition === 'slide') {
        return 'fc-animate';
      }
    }

    function moveSlide(direction) {
      if(direction === 'next') {
        setTimeout(transition, 50);
        transition();
        changeOrder('decrease');
      } else {
        setTimeout(transition, 50);
        transition();
        changeOrder('increase');
      }
    }

    function changeOrder(amount) {
      // Checks is the carousel is moving forward or backward and updates the order property value
      if(amount === 'increase') {
        flexCarouselSlide.each(function() {
          var convertedOrder = parseInt($(this).css('order'));
          var orderIncrease = convertedOrder + 1;

          if(convertedOrder === flexCarouselSlide.length) {
            $(this).css('order', '1');
          } else {
            $(this).css('order', orderIncrease);
          }
        });

        // Determine whether the carousel is going forward or backward
        if(options.transition === 'slide') {
          flexCarouselSlides.css('transform', 'translateX(-' + percentageToSlide + ')');
        }
      } else {
        flexCarouselSlide.each(function() {
          var convertedOrder = parseInt($(this).css('order'));
          var orderDecrease = convertedOrder - 1;

          if(convertedOrder === 1) {
            $(this).css('order', flexCarouselSlide.length);
          } else {
            $(this).css('order', orderDecrease);
          }
        });

        // Determine whether the carousel is going forward or backward
        if(options.transition === 'slide') {
          flexCarouselSlides.css('transform', 'translateX(' + percentageToSlide + ')');
        }
      }

      // Check loop
      if(options.arrows && options.loop == false) {
        // If there is no loop, the previous arrow should be hidden on the first slide
        if(flexCarouselSlide.first().hasClass('fc-is-active')) {
          flexCarouselPrev.removeClass('fc-is-active');
        } else {
          flexCarouselPrev.addClass('fc-is-active');
        }

        // If there is no loop, the next arrow should be hidden on the left slide
        if(flexCarouselSlide.last().hasClass('fc-is-active')) {
          flexCarouselNext.removeClass('fc-is-active');
        } else {
          flexCarouselNext.addClass('fc-is-active');
        }
      }
    }

    // Toggles the animate class for slide transition
    var transition = function() {
      if(options.transition === 'slide') {
        flexCarouselSlides.toggleClass('fc-animate');
      }
    }

    if(options.slidesVisible > '1') {
      var slides = flexCarouselSlide.slice(0, options.slidesVisible);
      slides.addClass('fc-is-active')
    } else {
      flexCarouselSlide.first().addClass('fc-is-active');
    }

    // Sets the left property to default value so that all slides are visible
    if(options.slidesVisible >= flexCarouselSlide.length) {
      flexCarouselSlides.css('left', 'auto');
    } else {
      // Slides have to be moved to the left with the value of the slide width
      flexCarouselSlides.css('left', '-' + percentageToSlide);
    }

    if(options.arrows) {
      if(options.slidesVisible < flexCarouselSlide.length) {

        // Adds the arrows
        flexCarousel.prepend('<div class="fc-prev"><span class="fc-icon">' + options.prevArrow + '</span></div>');
        flexCarousel.append('<div class="fc-next"><span class="fc-icon">' + options.nextArrow + '</span></div>');

        var flexCarouselNext = flexCarousel.find('.fc-next');
        var flexCarouselPrev = flexCarousel.find('.fc-prev');

        // By default, the arrows are visible
        flexCarouselNext.addClass('fc-is-active');
        flexCarouselPrev.addClass('fc-is-active');

        if(options.arrowsOverlay) {
          flexCarousel.addClass('fc-has-overlay');
          flexCarouselPrev.click(function(){ moveSlide('prev'); });
          flexCarouselNext.click(function(){ moveSlide('next'); });
        } else {
          flexCarousel.find('.fc-prev .fc-icon').click(function(){ moveSlide('prev'); });
          flexCarousel.find('.fc-next .fc-icon').click(function(){ moveSlide('next'); });
        }

        // If there is no loop, the previous arrow should be hidden on the first slide
        if(options.loop == false) {
          flexCarouselPrev.removeClass('fc-is-active');
        }
      }
    }

    if(options.circles) {
      flexCarouselContainer.append('<div class="fc-circles" />');
    }

    var flexCarouselCircles = $(this).find('.fc-circles');

    flexCarouselSlide.each(function() {
      var index = $(this).index();

      // If all slides are visible, the order property is not necessary
      if(flexCarouselSlide.length > options.slidesVisible) {
        // Give the last slide an order value of 1
        $(this).last().css('order', 1);

        // The rest of the slides, increment by 1 starting at 2
        var slides = flexCarouselSlide.slice( 0, flexCarouselSlide.length - 1 );

        i = 2;
        slides.each(function() {
          $(this).css('order', i++);
        });

        var image = $(this).find('img');
        var imageCaption = image.data('caption');

        // Wrap the images and use data attribute for captions for cleaner HTML markup
        image.wrap('<figure class="fc-image"></figure>');

        if(imageCaption) {
          image.after('<figcaption>' + imageCaption + '</figcaption>');
        }

        $(this).css('min-width', 'calc(100% / ' + options.slidesVisible + ')');
      }

      flexCarouselCircles.append('<div class="fc-circle"><span class="fc-icon fc-is-circle"></span></div>');
    });

    if(options.circles) {
      var flexCarouselCircle = $(this).find('.fc-circle');

      flexCarouselCircle.first().addClass('fc-is-active');

      // Add active states for clicking on the circles
      flexCarouselCircle.click(function() {
        $(this).addClass('fc-is-active');
        flexCarouselCircle.not($(this)).removeClass('fc-is-active');
      });

      // Add the circle wrapping element if circles is true
      if(options.circlesOverlay) {

        // Set the overlay classes if circlesOverlay is true
        flexCarouselContainer.addClass('fc-has-overlay');
        flexCarouselCircles.addClass('fc-is-overlay');
      }
    }

    // Use the autoplay speed setting to set the speed.
    if(options.autoplay) {
      setInterval(function() { moveSlide('next'); }, options.autoplaySpeed);
    }

    if(options.height) {
      flexCarousel.css('height', options.height);
    }

    if(options.transition === 'slide') {
      flexCarouselSlides.css('transform', 'translateX(' + percentageToSlide + ')');
    }
  };
})(jQuery, window, document, Math);
