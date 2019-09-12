var flexCarousel = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /*
   * flexCarousel.js v0.3.0
   * https://github.com/tomhrtly/flexCarousel.js
   *
   * Copyright 2018 Tom Hartley
   * Released under the MIT license
   *
   * Icons provided by Font Awesome: https://fontawesome.com
   */
  var FlexCarousel =
  /*#__PURE__*/
  function () {
    function FlexCarousel(selector, options) {
      _classCallCheck(this, FlexCarousel);

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

      function extend(defaults, options) {
        var extended = {};

        for (var prop in defaults) {
          if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
          }
        }

        for (var _prop in options) {
          if (Object.prototype.hasOwnProperty.call(options, _prop)) {
            extended[_prop] = options[_prop];
          }
        }

        return extended;
      }
    }

    _createClass(FlexCarousel, [{
      key: "addTransition",
      value: function addTransition() {
        var slides = this.selector.querySelector('.fc-slides');

        if (this.options.transition === 'slide') {
          slides.style.transition = 'all ' + this.options.transitionSpeed + 'ms ease-in-out 0s';
        }
      }
    }, {
      key: "animateSlide",
      value: function animateSlide(target) {
        var _this = this;

        this.addTransition();
        this.setTransform(Math.ceil(target));
        new Promise(function (resolve) {
          setTimeout(function () {
            _this.removeTransition();

            resolve(true);
          }, _this.options.transitionSpeed);
        }).then(function () {
          return _this.setTransform(_this.getLeftSlide(_this.currentSlide));
        });
      }
    }, {
      key: "buildArrowEvents",
      value: function buildArrowEvents() {
        var _this2 = this;

        var nextArrow = this.selector.querySelector('.fc-next');
        var prevArrow = this.selector.querySelector('.fc-prev');

        if (this.options.arrows) {
          // Move to the next slide when clicking the next arrow
          nextArrow.addEventListener('click', function () {
            _this2.moveSlide('next');
          }); // Move to the previous slide when clicking the previous arrow

          prevArrow.addEventListener('click', function () {
            _this2.moveSlide('previous');
          });
        }
      }
    }, {
      key: "buildArrows",
      value: function buildArrows() {
        var slides = this.selector.querySelector('.fc-slides');
        var slide = slides.querySelectorAll('.fc-slide');

        if (this.options.arrows) {
          // Only show the arrows if there are more slides then slidesVisible option
          if (this.options.slidesVisible < slide.length) {
            this.selector.classList.add('fc-arrows'); // Create arrow button

            var nextArrow = document.createElement('button');
            nextArrow.classList.add('fc-next', 'fc-is-active');
            nextArrow.innerHTML = '<span class="fc-icon">' + this.options.nextArrow + '</span>'; // Create prev button

            var prevArrow = document.createElement('button');
            prevArrow.classList.add('fc-prev', 'fc-is-active');
            prevArrow.innerHTML = '<span class="fc-icon">' + this.options.prevArrow + '</span>'; // Append next arrow to the selector

            this.selector.appendChild(nextArrow); // Prepend prev arrow to the selector

            this.selector.insertBefore(prevArrow, this.selector.firstChild); // Add the overlay class if needed

            if (this.options.arrowsOverlay) {
              this.selector.classList.add('fc-arrows-overlay');
            }

            this.buildArrowEvents();
          }
        }
      }
    }, {
      key: "buildCircles",
      value: function buildCircles() {
        var slides = this.selector.querySelector('.fc-slides');
        var allSlides = slides.querySelectorAll('.fc-slide');
        var container = this.selector.querySelector('.fc-container');
        var circles = this.selector.querySelector('.fc-circles');

        if (this.options.circles) {
          // Only show the arrows if there are more slides then slidesVisible option
          if (this.options.slidesVisible < allSlides.length) {
            this.selector.classList.add('fc-circles'); // Create circles container

            var _circles = document.createElement('div');

            _circles.classList.add('fc-circles'); // Append circles to the container


            container.appendChild(_circles);

            for (var i = 0; i < allSlides.length; i++) {
              var circle = document.createElement('div');
              circle.classList.add('fc-circle');
              var icon = document.createElement('span');
              icon.classList.add('fc-icon', 'fc-is-circle');
              circle.appendChild(icon);

              _circles.appendChild(circle);
            }

            if (this.options.circlesOverlay) {
              this.selector.classList.add('fc-circles-overlay');
            }
          }
        }
      }
    }, {
      key: "buildOptions",
      value: function buildOptions() {
        if (this.options.height) {
          this.selector.style.height = this.options.height;
        }
      }
    }, {
      key: "buildSlides",
      value: function buildSlides() {
        var children = this.selector.children; // Add the slide class to all child div elements

        for (var i = 0; i < children.length; i++) {
          children[i].classList.add('fc-slide');
        } // Wrap slides to reduce HTML markup


        this.selector.innerHTML = '<div class="fc-container"><div class="fc-slides">' + this.selector.innerHTML + '</div></div>';
        var slides = this.selector.querySelector('.fc-slides');
        var allSlides = slides.querySelectorAll('.fc-slide');
        this.slideAmount = allSlides.length;

        if (this.options.slidesVisible < this.slideAmount) {
          this.slideWidth = 100 / this.options.slidesVisible; // Add the min-width CSS property to all slides

          for (var _i = 0; _i < this.slideAmount; _i++) {
            allSlides[_i].style.minWidth = this.slideWidth + '%';
          } // Clone and prepend/append slides


          var array = Array.from(allSlides);
          var prepend = array.slice(this.slideAmount - this.options.slidesVisible, this.slideAmount).reverse();
          var append = array.slice(0, this.options.slidesVisible);

          for (var _i2 = 0; _i2 < prepend.length; _i2++) {
            var clone = prepend[_i2].cloneNode(true);

            clone.classList.add('fc-is-clone');
            slides.insertBefore(clone, slides.firstChild);
          }

          for (var _i3 = 0; _i3 < append.length; _i3++) {
            var _clone = append[_i3].cloneNode(true);

            _clone.classList.add('fc-is-clone');

            slides.appendChild(_clone);
          }

          this.setTransform(this.getLeftSlide(this.currentSlide));
        }
      }
    }, {
      key: "getLeftSlide",
      value: function getLeftSlide(index) {
        if (this.options.slidesVisible < this.slideAmount) {
          this.slideOffset = this.slideWidth * this.options.slidesVisible * -1;
        }

        return index * this.slideWidth * -1 + this.slideOffset;
      }
    }, {
      key: "init",
      value: function init() {
        // Check if the selector has the "fc" initializer class
        if (!this.selector.classList.contains('fc')) {
          this.selector.classList.add('fc');
          this.buildSlides();
          this.buildArrows();
          this.buildCircles();
          this.buildOptions();
        }
      }
    }, {
      key: "moveSlide",
      value: function moveSlide(index) {
        var unevenOffset = this.slideAmount % this.options.slidesScrolling !== 0;
        var indexOffset = unevenOffset ? 0 : (this.slideAmount - this.currentSlide) % this.options.slidesScrolling;

        if (index === 'previous') {
          var slideOffset = indexOffset === 0 ? this.options.slidesScrolling : this.options.slidesVisible - indexOffset;

          if (this.options.slidesVisible < this.slideAmount) {
            this.slideController(this.currentSlide - slideOffset);
          }
        } else if (index === 'next') {
          var _slideOffset = indexOffset === 0 ? this.options.slidesScrolling : indexOffset;

          if (this.options.slidesVisible < this.slideAmount) {
            this.slideController(this.currentSlide + _slideOffset);
          }
        }
      }
    }, {
      key: "removeTransition",
      value: function removeTransition() {
        var slides = this.selector.querySelector('.fc-slides');

        if (this.options.transition === 'slide') {
          slides.style.transition = '';
        }
      }
    }, {
      key: "setTransform",
      value: function setTransform(position) {
        var obj = {};
        var slides = this.selector.querySelector('.fc-slides');
        obj.transform = 'translate3d(' + Math.ceil(position) + '%' + ', 0px, 0px)';
        slides.style.transform = obj.transform;
      }
    }, {
      key: "slideController",
      value: function slideController(index) {
        var nextSlide;

        if (index < 0) {
          if (this.slideAmount % this.options.slidesScrolling !== 0) {
            nextSlide = this.slideAmount - this.slideAmount % this.options.slidesScrolling;
          } else {
            nextSlide = this.slideAmount + index;
          }
        } else if (index >= this.slideAmount) {
          if (this.slideAmount % this.options.slidesScrolling !== 0) {
            nextSlide = 0;
          } else {
            nextSlide = index - this.slideAmount;
          }
        } else {
          nextSlide = index;
        }

        this.currentSlide = nextSlide;
        this.animateSlide(this.getLeftSlide(index));
      }
    }]);

    return FlexCarousel;
  }();

  return FlexCarousel;

}());
//# sourceMappingURL=flexCarousel.js.map
