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
   * flexCarousel.js v1.0.0
   * https://github.com/tomhrtly/flexCarousel.js
   *
   * Copyright 2019 Tom Hartley
   * Released under the MIT license
   *
   * Icons provided by Font Awesome: https://fontawesome.com
   */
  var FlexCarousel =
  /*#__PURE__*/
  function () {
    function FlexCarousel(selector) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, FlexCarousel);

      this.selectorName = selector.toString();
      this.selector = document.querySelector(selector);
      this.defaults = {
        appendArrows: this.selector,
        arrows: true,
        arrowsOverlay: true,
        autoplay: false,
        autoplaySpeed: 5000,
        circles: true,
        circlesOverlay: true,
        height: null,
        infinite: true,
        initialPage: 0,
        nextButton: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>',
        prevButton: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>',
        responsive: null,
        slidesPerPage: 1,
        slidesScrolling: 1,
        transition: 'slide',
        transitionSpeed: 250
      };
      this.activeBreakpoint = null;
      this.autoplayDirection = 'right';
      this.autoplayTimer = null;
      this.breakpoints = [];
      this.customEvents = {
        breakpoint: new CustomEvent('breakpoint'),
        slid: new CustomEvent('slid'),
        slide: new CustomEvent('slide')
      };
      this.options = FlexCarousel.extend(this.defaults, options);
      this.originalOptions = this.options;
      this.pageAmount = null;
      this.pageWidth = null;
      this.currentPage = this.options.initialPage;
      this.init();
    }

    _createClass(FlexCarousel, [{
      key: "addTransition",
      value: function addTransition() {
        var slides = this.selector.querySelector('.fc-slides');

        if (this.options.transition === 'slide') {
          slides.style.transition = "all ".concat(this.options.transitionSpeed, "ms ease-in-out 0s");
        }
      }
    }, {
      key: "animatePage",
      value: function animatePage(target) {
        var _this = this;

        this.addTransition();
        this.setTransform(Math.ceil(target));
        new Promise(function (resolve) {
          setTimeout(function () {
            _this.removeTransition();

            resolve(true);
          }, _this.options.transitionSpeed);
        }).then(function () {
          return _this.setTransform(_this.getLeftPage(_this.currentPage));
        });
      }
    }, {
      key: "autoplay",
      value: function autoplay() {
        var _this2 = this;

        var pause = false;
        var slide;
        document.addEventListener('visibilitychange', function () {
          pause = document.visibilityState !== 'visible';
        });

        if (this.autoplayTimer) {
          clearInterval(this.autoplayTimer);
        }

        if (this.options.autoplay) {
          this.autoplayTimer = setInterval(function () {
            if (!pause) {
              if (!_this2.options.infinite) {
                if (_this2.autoplayDirection === 'right') {
                  slide = 'next';

                  if (_this2.currentPage + 1 === _this2.pageAmount - 1) {
                    _this2.autoplayDirection = 'left';
                  }
                } else if (_this2.autoplayDirection === 'left') {
                  slide = 'previous';

                  if (_this2.currentPage === 1) {
                    _this2.autoplayDirection = 'right';
                  }
                }
              } else {
                slide = 'next';
              }

              _this2.movePage(slide);
            }
          }, this.options.autoplaySpeed);
          this.selector.addEventListener('mouseenter', function () {
            pause = true;
          });
          this.selector.addEventListener('mouseleave', function () {
            pause = false;
          });
          this.selector.addEventListener('focusin', function () {
            pause = true;
          });
          this.selector.addEventListener('focusout', function () {
            pause = false;
          });
        }
      }
    }, {
      key: "buildArrowEvents",
      value: function buildArrowEvents() {
        var _this3 = this;

        var nextButton = this.options.appendArrows.querySelector('.fc-next');
        var prevButton = this.options.appendArrows.querySelector('.fc-prev'); // Move to the next slide when clicking the next arrow

        nextButton.addEventListener('click', function () {
          _this3.movePage('next');
        }); // Move to the previous slide when clicking the previous arrow

        prevButton.addEventListener('click', function () {
          _this3.movePage('previous');
        });
      }
    }, {
      key: "buildArrows",
      value: function buildArrows() {
        var slides = this.selector.querySelector('.fc-slides');
        var slide = slides.querySelectorAll('.fc-slide');

        if (this.options.arrows) {
          // Only show the arrows if there are more slides then slidesPerPage option
          if (this.options.slidesPerPage < slide.length) {
            this.selector.classList.add('fc-has-arrows'); // Create arrow button

            var nextButton = document.createElement('button');
            nextButton.classList.add('fc-next');
            nextButton.setAttribute('aria-label', 'Next');
            nextButton.innerHTML = "<span class=\"fc-is-sr-only\">Next</span><span class=\"fc-icon\">".concat(this.options.nextButton, "</span>"); // Create prev button

            var prevButton = document.createElement('button');
            prevButton.classList.add('fc-prev');
            prevButton.setAttribute('aria-label', 'Previous');
            prevButton.innerHTML = "<span class=\"fc-is-sr-only\">Previous</span><span class=\"fc-icon\">".concat(this.options.prevButton, "</span>"); // Append next arrow to the selector

            this.options.appendArrows.appendChild(nextButton); // Prepend prev arrow to the selector

            this.options.appendArrows.insertBefore(prevButton, this.options.appendArrows.firstChild); // Add the overlay class if needed

            if (this.options.arrowsOverlay) {
              this.selector.classList.add('fc-has-arrows-overlay');
            }

            this.buildArrowEvents();
            this.updateArrows();
          }
        }
      }
    }, {
      key: "buildBreakpointEvent",
      value: function buildBreakpointEvent() {
        var _this4 = this;

        var timer;
        window.addEventListener('resize', function () {
          clearTimeout(timer);
          timer = setTimeout(function () {
            _this4.updateResponsive();
          }, 500);
        });
      }
    }, {
      key: "buildBreakpoints",
      value: function buildBreakpoints() {
        var _this5 = this;

        var breakpoints = [];

        if (this.options.responsive) {
          var previous = this.options;
          this.options.responsive.forEach(function (_ref) {
            var breakpoint = _ref.breakpoint,
                options = _ref.options;

            if (!breakpoints.includes(breakpoint)) {
              breakpoints.push(breakpoint);
              _this5.breakpoints[breakpoint] = FlexCarousel.extend(previous, options);
              previous = FlexCarousel.extend(previous, options);
            }
          });
        }

        this.buildBreakpointEvent();
        this.updateResponsive(false);
      }
    }, {
      key: "buildCircleEvents",
      value: function buildCircleEvents() {
        var _this6 = this;

        var circles = this.selector.querySelector('.fc-container').querySelectorAll('.fc-circle');
        circles.forEach(function (element, index) {
          element.addEventListener('click', function () {
            return _this6.movePage(index);
          });
        });
      }
    }, {
      key: "buildCircles",
      value: function buildCircles() {
        if (this.options.circles) {
          // Only show the arrows if there are more slides then slidesPerPage option
          if (this.options.slidesPerPage < this.pageAmount) {
            this.selector.classList.add('fc-has-circles'); // Create circles container

            var circles = document.createElement('ul');
            circles.classList.add('fc-circles');
            this.selector.querySelector('.fc-container').appendChild(circles);
            var option = this.options.slidesPerPage > this.options.slidesScrolling ? this.options.slidesScrolling : this.options.slidesPerPage;
            var amount = Math.ceil(this.pageAmount / option);

            for (var index = 0; index < amount; index += 1) {
              var li = document.createElement('li');
              var circle = document.createElement('button');
              circle.classList.add('fc-circle');
              circle.setAttribute('aria-label', "".concat(FlexCarousel.suffix(index + 1), " page"));
              var icon = document.createElement('span');
              icon.classList.add('fc-icon', 'fc-is-circle');
              var text = document.createElement('span');
              text.classList.add('fc-is-sr-only');
              text.innerHTML = index + 1;
              circle.appendChild(icon);
              circle.appendChild(text);
              li.appendChild(circle);
              circles.appendChild(li);
            }

            if (this.options.circlesOverlay) {
              this.selector.classList.add('fc-has-circles-overlay');
            }

            this.updateCircles();
            this.buildCircleEvents();
          }
        }
      }
    }, {
      key: "buildOptions",
      value: function buildOptions() {
        if (this.options.height) {
          this.selector.style.height = this.options.height;
        }

        this.autoplay();
      }
    }, {
      key: "buildSlideEvents",
      value: function buildSlideEvents() {
        var _this7 = this;

        window.addEventListener('orientationchange', function () {
          _this7.orientationChange();
        });

        this.selector.onfocus = function () {
          if (document.activeElement === _this7.selector) {
            document.onkeyup = function (e) {
              if (e.key === 'ArrowRight') {
                _this7.movePage('next');
              } else if (e.key === 'ArrowLeft') {
                _this7.movePage('previous');
              }
            };
          }
        };

        this.selector.onblur = function () {
          document.onkeyup = function () {};
        };
      }
    }, {
      key: "buildSlides",
      value: function buildSlides() {
        var ul = this.selector.querySelector('ul');
        ul.classList.add('fc-slides'); // Add the slide class to all child div elements

        for (var index = 0; index < ul.children.length; index += 1) {
          ul.children[index].classList.add('fc-slide');
        }

        this.selector.setAttribute('tabindex', '0'); // Wrap slides to reduce HTML markup

        this.selector.innerHTML = "<div class=\"fc-container\">".concat(this.selector.innerHTML, "</div>");
        var slides = this.selector.querySelector('.fc-slides');
        var allSlides = slides.querySelectorAll('.fc-slide');
        this.pageAmount = allSlides.length;

        if (this.options.slidesPerPage < this.pageAmount) {
          this.pageWidth = 100 / this.options.slidesPerPage; // Add the min-width CSS property to all slides

          for (var _index = 0; _index < this.pageAmount; _index += 1) {
            allSlides[_index].style.minWidth = "".concat(this.pageWidth, "%");
          }

          if (this.options.infinite) {
            // Clone and prepend/append slides
            var array = Array.from(allSlides);
            var prepend;
            var append;

            if (this.options.slidesPerPage >= this.options.slidesScrolling) {
              prepend = array.slice(this.pageAmount - this.options.slidesPerPage - 1, this.pageAmount).reverse();
              append = array.slice(0, this.options.slidesPerPage + 1);
            } else {
              prepend = array.slice(this.pageAmount - this.options.slidesPerPage, this.pageAmount).reverse();
              append = array.slice(0, this.options.slidesPerPage);
            }

            for (var _index2 = 0; _index2 < prepend.length; _index2 += 1) {
              var clone = prepend[_index2].cloneNode(true);

              clone.classList.add('fc-is-clone');
              slides.insertBefore(clone, slides.firstChild);
            }

            for (var _index3 = 0; _index3 < append.length; _index3 += 1) {
              var _clone = append[_index3].cloneNode(true);

              _clone.classList.add('fc-is-clone');

              slides.appendChild(_clone);
            }
          }

          this.setTransform(this.getLeftPage(this.currentPage));
        }

        this.buildSlideEvents();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _this8 = this;

        this.selector.querySelectorAll('.fc-slide.fc-is-clone').forEach(function (element) {
          _this8.selector.querySelector('.fc-slides').removeChild(element);
        });
        this.selector.querySelectorAll('.fc-slide').forEach(function (element) {
          element.removeAttribute('class');
          element.removeAttribute('style');
        });
        this.selector.querySelector('.fc-slides').removeAttribute('style');
        this.selector.querySelector('.fc-slides').removeAttribute('class');

        if (this.options.circles) {
          this.selector.querySelector('.fc-container').removeChild(this.selector.querySelector('.fc-circles'));
        }

        this.selector.innerHTML = this.selector.querySelector('.fc-container').innerHTML;
        this.selector.className = this.selectorName.replace('.', '');
        this.selector.removeAttribute('style');
      }
    }, {
      key: "getLeftPage",
      value: function getLeftPage(index) {
        var slideOffset;

        if (this.options.slidesPerPage < this.pageAmount) {
          if (this.options.slidesPerPage >= this.options.slidesScrolling) {
            slideOffset = this.pageWidth * (this.options.slidesPerPage + 1) * -1;
          } else {
            slideOffset = this.pageWidth * this.options.slidesPerPage * -1;
          }

          if (!this.options.infinite) {
            slideOffset = 0;
          }
        }

        return index * this.pageWidth * -1 + slideOffset;
      }
    }, {
      key: "init",
      value: function init() {
        if (!this.selector.classList.contains('fc')) {
          this.selector.classList.add('fc');
          this.buildSlides();
          this.buildArrows();
          this.buildCircles();
          this.buildOptions();
          this.buildBreakpoints();
        }
      }
    }, {
      key: "movePage",
      value: function movePage(index) {
        var _this9 = this;

        var unevenOffset = this.pageAmount % this.options.slidesScrolling !== 0;
        var indexOffset = unevenOffset ? 0 : (this.pageAmount - this.currentPage) % this.options.slidesScrolling;

        if (index === 'previous') {
          var slideOffset = indexOffset === 0 ? this.options.slidesScrolling : this.options.slidesPerPage - indexOffset;

          if (this.options.slidesPerPage < this.pageAmount) {
            this.slideController(this.currentPage - slideOffset);
          }
        } else if (index === 'next') {
          var _slideOffset = indexOffset === 0 ? this.options.slidesScrolling : indexOffset;

          if (this.options.slidesPerPage < this.pageAmount) {
            this.slideController(this.currentPage + _slideOffset);
          }
        } else {
          var page = index === 0 ? 0 : index * this.options.slidesScrolling;
          this.slideController(page);
        }

        if (this.options.arrows) {
          this.updateArrows();
        }

        if (this.options.circles) {
          this.updateCircles();
        }

        this.selector.dispatchEvent(this.customEvents.slide);
        setTimeout(function () {
          _this9.selector.dispatchEvent(_this9.customEvents.slid);
        }, this.options.transitionSpeed);
      }
    }, {
      key: "orientationChange",
      value: function orientationChange() {
        this.updateResponsive();
        this.setTransform();
      }
    }, {
      key: "reinit",
      value: function reinit() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.destroy();
        this.options = FlexCarousel.extend(this.defaults, options);
        this.init();
        this.selector.dispatchEvent(this.customEvents.breakpoint);
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
        var slides = this.selector.querySelector('.fc-slides');
        slides.style.transform = "translate3d(".concat(Math.ceil(position), "%, 0px, 0px)");
      }
    }, {
      key: "slideController",
      value: function slideController(index) {
        var nextPage;

        if (index < 0) {
          if (this.pageAmount % this.options.slidesScrolling !== 0) {
            nextPage = this.pageAmount - this.pageAmount % this.options.slidesScrolling;
          } else {
            nextPage = this.pageAmount + index;
          }
        } else if (index >= this.pageAmount) {
          if (this.pageAmount % this.options.slidesScrolling !== 0) {
            nextPage = 0;
          } else {
            nextPage = index - this.pageAmount;
          }
        } else {
          nextPage = index;
        }

        this.currentPage = nextPage;
        this.animatePage(this.getLeftPage(index));
      }
    }, {
      key: "updateArrows",
      value: function updateArrows() {
        var prevButton = this.options.appendArrows.querySelector('.fc-prev');
        var nextButton = this.options.appendArrows.querySelector('.fc-next');

        if (!this.options.infinite) {
          if (this.currentPage === 0) {
            prevButton.setAttribute('disabled', 'disabled');
          } else {
            prevButton.removeAttribute('disabled');
          }

          if (this.currentPage === this.pageAmount - 1) {
            nextButton.setAttribute('disabled', 'disabled');
          } else {
            nextButton.removeAttribute('disabled');
          }
        }
      }
    }, {
      key: "updateCircles",
      value: function updateCircles() {
        var circles = this.selector.querySelector('.fc-container').querySelectorAll('.fc-circle');

        for (var _index4 = 0; _index4 < circles.length; _index4 += 1) {
          circles[_index4].classList.remove('fc-is-active');
        }

        var index = Math.floor(this.currentPage / this.options.slidesScrolling);
        circles[index].classList.add('fc-is-active');
      }
    }, {
      key: "updateResponsive",
      value: function updateResponsive() {
        var targetBreakpoint;
        this.breakpoints.forEach(function (options, breakpoint) {
          if (window.innerWidth >= breakpoint) {
            targetBreakpoint = breakpoint;
          }
        });

        if (targetBreakpoint) {
          if (this.activeBreakpoint) {
            if (targetBreakpoint !== this.activeBreakpoint) {
              this.activeBreakpoint = targetBreakpoint;
              this.reinit(this.breakpoints[targetBreakpoint]);
            }
          } else {
            this.activeBreakpoint = targetBreakpoint;
            this.reinit(this.breakpoints[targetBreakpoint]);
          }
        } else if (this.activeBreakpoint !== null) {
          this.activeBreakpoint = null;
          this.reinit(this.originalOptions);
        }
      }
    }], [{
      key: "extend",
      value: function extend(defaults, options) {
        var extended = {};

        if (defaults) {
          var keys = Object.keys(defaults);
          keys.forEach(function (value) {
            if (Object.prototype.hasOwnProperty.call(defaults, value)) {
              extended[value] = defaults[value];
            }
          });
        }

        if (options) {
          var _keys = Object.keys(options);

          _keys.forEach(function (value) {
            if (Object.prototype.hasOwnProperty.call(options, value)) {
              extended[value] = options[value];
            }
          });
        }

        return extended;
      }
    }, {
      key: "suffix",
      value: function suffix(index) {
        var j = index % 10;
        var k = index % 100;

        if (j === 1 && k !== 11) {
          return "".concat(index, "st");
        }

        if (j === 2 && k !== 12) {
          return "".concat(index, "nd");
        }

        if (j === 3 && k !== 13) {
          return "".concat(index, "rd");
        }

        return "".concat(index, "th");
      }
    }]);

    return FlexCarousel;
  }();

  return FlexCarousel;

}());
//# sourceMappingURL=flexCarousel.js.map
