/*
 * flexCarousel.js v0.0.3
 * https://github.com/tomhrtly/flexCarousel.js
 *
 * Copyright 2018 Tom Hartley
 * Released under the MIT license
 */

(function ($) {
  $.fn.flexCarousel = function(options) {
    var settings = $.extend({
      arrows:           true,
      arrowsOverlay:    true,
      autoplay:         false,
      autoplaySpeed:    5000,
      height:           null,
      loop:             true,
      nextArrow:        '<i class="fas fa-angle-right"></i>',
      prevArrow:        '<i class="fas fa-angle-left"></i>',
      slidesVisible:    1,
      transition:       'slide',
    }, options);


    /**
     * Global variables
     *
     * @since 0.0.1
     */

    var flexCarousel =            $(this);
    var flexCarouselContainer =   $(this).find('.fc-container');
    var flexCarouselSlides =      $(this).find('.fc-slides');
    var flexCarouselSlide =       $(this).find('div').addClass('fc-slide');

    flexCarousel.addClass('fc');
    flexCarouselSlide.wrapAll('<div class="fc-container"><div class="fc-slides ' + slidesClasses() + '" /></div>');


    /**
     * Returns the CSS classes needed for the different transitions.
     *
     * @since 0.0.3
     */

    function slidesClasses() {
      if(settings.transition === 'slide') {
        return 'fc-animate';
      } else {
        return '';
      }
    }


    /**
     * Functions to call when the prev arrow var has been called.
     *
     * @since 0.0.1
     */

    var onPrevClick = function() {
      setTimeout(toggleAnimate, 50);
      toggleReverse(true);
      setOrder('left');
      checkLoop();
      toggleAnimate();
    }


    /**
     * Functions to call when the next arrow var has been called.
     *
     * @since 0.0.1
     */

    var onNextClick = function() {
      setTimeout(toggleAnimate, 50);
      toggleReverse(false);
      setOrder('right');
      checkLoop();
      toggleAnimate();
    }


    /**
     * Percentage to use for slide transition.
     *
     * @since 0.0.1
     */

    var percentageToSlide = 100 / settings.slidesVisible + '%';


    /**
     * Toggle reverse variable to check if the slides are reversing or not.
     *
     * @param string
     *
     * @since 0.0.1
     */

    var toggleReverse = function(check) {
      if(settings.transition === 'slide') {
        if(check === true) {
          $('.fc-slides').css('transform', 'translateX(-' + percentageToSlide + ')');
        } else {
          $('.fc-slides').css('transform', 'translateX(' + percentageToSlide + ')');
        }
      }
    }


    /**
     * Toggle animate variable to toggle the animate class when moving the slides.
     *
     * @since 0.0.1
     */

    var toggleAnimate = function() {
      if(settings.transition === 'slide') {
        $('.fc-slides').toggleClass('fc-animate');
      }
    }


    /**
     * Variable to check which direction the slides are to move and to change the CSS order property value accordingly.
     *
     * @param string
     *
     * @since 0.0.1
     */

    var setOrder = function(direction) {
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
      } else if(direction === 'right') {
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


    /**
     * Removes the arrows if the amount of slides visible is the same as the total amount of slides.
     *
     * @since 0.0.2
     */

    if(settings.slidesVisible === flexCarouselSlide.length) {
      $('.fc-slides').css('left', 'auto');
    }

    if(settings.arrows) {


      /**
       * If the total amount of slides is not the same as the amount of slides visible.
       */

      if(settings.slidesVisible !== flexCarouselSlide.length) {


        /**
         * Prepends and appends the arrows to the parent container.
         */

        flexCarousel.prepend('<div class="fc-prev"><span class="fc-icon">' + settings.prevArrow + '</span></div>');
        flexCarousel.append('<div class="fc-next"><span class="fc-icon">' + settings.nextArrow + '</span></div>');


        /**
         * Variable to hold the next and prev arrows in the carousel container to prevent multiple carousel conflicts.
         *
         * @since 0.0.3
         */

        var flexCarouselNext = $(this).find('.fc-next');
        var flexCarouselPrev = $(this).find('.fc-prev');


        /**
         * By default, both arrows are visible.
         */

        flexCarouselNext.addClass('fc-is-active');
        flexCarouselPrev.addClass('fc-is-active');

        if(settings.loop == false) {
          flexCarouselPrev.removeClass('fc-is-active');
        }

        if(settings.arrowsOverlay) {

          /**
           * Adds the overlay CSS class to the carousel container.
           */

          flexCarousel.addClass('fc-has-overlay');


          /**
           * Call the correct variables for when the arrows get clicked.
           */

          flexCarouselPrev.click(onPrevClick);
          flexCarouselNext.click(onNextClick);
        } else {


          /**
           * Only the icons inside the arrows respective containers should be clickable when there is no overlay.
           */

          $('.fc-prev .fc-icon').click(onPrevClick);
          $('.fc-next .fc-icon').click(onNextClick);
        }
      }
    }

    var checkLoop = function() {
      if(settings.arrows) {
        if(settings.loop == false) {


          /**
           * Removes the prev arrow on the first slide if there is no loop
           *
           * @since 0.0.3
           */

          if($('.fc-slide:first-child').css('order') === '2') {
            flexCarouselPrev.removeClass('fc-is-active');
          } else {
            flexCarouselPrev.addClass('fc-is-active');
          }


          /**
           * Removes the next arrow on the last slide if there is no loop
           *
           * @since 0.0.3
           */

          if($('.fc-slide:last-child').css('order') === '2') {
            flexCarouselNext.removeClass('fc-is-active');
          } else {
            flexCarouselNext.addClass('fc-is-active');
          }
        }
      }
    }

    flexCarouselSlide.each(function() {
      flexCarouselSlide.css('min-width', 'calc(100% / ' + settings.slidesVisible + ')');

      var index = $(this).index() + settings.slidesVisible + 1;
      $(this).css('order', index);

      var slidesLeftAmount = flexCarouselSlide.slice( flexCarouselSlide.length-settings.slidesVisible, flexCarouselSlide.length );

      i = 1;
      slidesLeftAmount.each(function() {
        $(this).css('order', i++);
      });
    });

    if(settings.autoplay) {


      /**
       * Use the autoplaySpeed setting to determine the delay duration.
       */

      setInterval(function() {
        onNextClick();
      }, settings.autoplaySpeed);
    }

    if(settings.height) {
      flexCarousel.css('height', settings.height);
    }

    if(settings.transition === 'slide') {
      $('.fc-slides').css('transform', 'translateX(' + percentageToSlide + ')');
    }
  };
}(jQuery));
