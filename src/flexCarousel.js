/*
 * flexCarousel.js v0.0.3
 * https://github.com/tomhrtly/flexCarousel.js
 *
 * Copyright 2018 Tom Hartley
 * Released under the MIT license
 */

(function($, window, document, Math, undefined) {
  $.fn.flexCarousel = function(options) {
    var FC = $.fn.flexCarousel;

    var options = $.extend({
      // Defaults
      arrows:           true,
      arrowsOverlay:    true,
      autoplay:         false,
      autoplaySpeed:    5000,
      circles:          true,
      circlesOverlay:   true,
      height:           null,
      loop:             true,
      mouseDrag:        false,
      nextArrow:        '<i class="fas fa-angle-right"></i>',
      prevArrow:        '<i class="fas fa-angle-left"></i>',
      slidesVisible:    1,
      transition:       'slide',
    }, options);

    var flexCarousel            = $(this);
    var flexCarouselContainer   = $(this).find('.fc-container');
    var flexCarouselSlide       = $(this).find('div').addClass('fc-slide');

    flexCarousel.addClass('fc');
    flexCarouselSlide.wrapAll('<div class="fc-container"><div class="fc-slides ' + slidesClasses() + '" /></div>');

    var flexCarouselSlides      = $(this).find('.fc-slides');
    var flexCarouselCircles     = $(this).find('.fc-circles');
    var flexCarouselCircle      = $(this).find('.fc-circle');

    // CSS classes for different transitions
    function slidesClasses() {
      if(options.transition === 'slide') {
        return 'fc-animate';
      }
    }

    // Functions for previous click
    var onPrevClick = function() {
      setTimeout(transition, 50);
      isReverse(true);
      direction('left');
      checkLoop();
      transition();
    }

    // Functions for next click
    var onNextClick = function() {
      setTimeout(transition, 50);
      isReverse(false);
      direction('right');
      checkLoop();
      transition();
    }

    // Percentage to slide is width of each slide
    var percentageToSlide = 100 / options.slidesVisible + '%';

    // Determine whether the carousel is going forward or backward
    var isReverse = function(check) {
      if(options.transition === 'slide') {
        if(check === true) {
          flexCarouselSlides.css('transform', 'translateX(-' + percentageToSlide + ')');
        } else {
          flexCarouselSlides.css('transform', 'translateX(' + percentageToSlide + ')');
        }
      }
    }

    var checkLoop = function() {
      if(options.arrows) {
        if(options.loop == false) {

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
    }

    // Toggles the animate class for slide transition
    var transition = function() {
      if(options.transition === 'slide') {
        flexCarouselSlides.toggleClass('fc-animate');
      }
    }

    // Checks is the carousel is moving forward or backward and updates the order property value
    var direction = function(direction) {
      if(direction === 'left') {
        flexCarouselSlide.each(function() {
          var convertedOrder = parseInt($(this).css('order'));
          var orderIncrease = convertedOrder + 1;

          if(convertedOrder === flexCarouselSlide.length) {
            $(this).css('order', '1');
          } else {
            $(this).css('order', orderIncrease);
          }
        });
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
      }
    }

    if(options.slidesVisible > '1') {
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
          flexCarouselPrev.click(onPrevClick);
          flexCarouselNext.click(onNextClick);
        } else {
          flexCarousel.find('.fc-prev .fc-icon').click(onPrevClick);
          flexCarousel.find('.fc-next .fc-icon').click(onNextClick);
        }

        // If there is no loop, the previous arrow should be hidden on the first slide
        if(options.loop == false) {
          flexCarouselPrev.removeClass('fc-is-active');
        }
      }
    }

    flexCarouselSlide.each(function() {
      var index = $(this).index();
      console.log(index);

      // Sets the width for each slide determined by how many slides visible there are
      $(this).css('min-width', 'calc(100% / ' + options.slidesVisible + ')');

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

        if(options.circles) {
          flexCarouselCircles.append('<div class="fc-circle"><span class="fc-icon fc-is-circle"></span></div>');

          i = 1;
          flexCarouselCircle.each(function() {
            $(this).attr('data-slide', i++);
          });
        }
      }
    });

    if(options.circles) {
      flexCarouselContainer.append('<div class="fc-circles"></div>');

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
      setInterval(function() {
        onNextClick();
      }, options.autoplaySpeed);
    }

    if(options.height) {
      flexCarousel.css('height', options.height);
    }

    if(options.transition === 'slide') {
      flexCarouselSlides.css('transform', 'translateX(' + percentageToSlide + ')');
    }
  };
})(jQuery, window, document, Math);
