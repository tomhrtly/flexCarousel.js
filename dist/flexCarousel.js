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

      this.selector = document.querySelector(selector);

      function extend(object1, object2) {
        var extended = {};

        if (object1) {
          var object1Keys = Object.keys(object1);
          object1Keys.forEach(function (value) {
            if (Object.prototype.hasOwnProperty.call(object1, value)) {
              extended[value] = object1[value];
            }
          });
        }

        if (object2) {
          var object2Keys = Object.keys(object2);
          object2Keys.forEach(function (value) {
            if (Object.prototype.hasOwnProperty.call(object2, value)) {
              extended[value] = object2[value];
            }
          });
        }

        return extended;
      }

      this.defaults = {
        appendArrows: this.selector,
        appendCircles: null,
        arrows: true,
        arrowsOverlay: true,
        autoplay: false,
        autoplaySpeed: 5000,
        circles: true,
        circlesOverlay: true,
        height: null,
        infinite: true,
        nextButton: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>',
        prevButton: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>',
        slidesPerPage: 1,
        slidesScrolling: 1,
        transition: 'slide',
        transitionSpeed: 250
      };
      this.slideWidth = null;
      this.slideOffset = null;
      this.slideAmount = null;
      this.currentPage = 0;
      this.options = extend(this.defaults, options);
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

        if (this.options.autoplay) {
          setInterval(function () {
            if (!pause) {
              _this2.movePage('next');
            }
          }, this.options.autoplaySpeed);
          this.selector.addEventListener('mouseenter', function () {
            pause = true;
          });
          this.selector.addEventListener('mouseleave', function () {
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
            nextButton.classList.add('fc-next', 'fc-button');
            nextButton.setAttribute('aria-label', 'Next');
            nextButton.innerHTML = "<span class=\"fc-is-sr-only\">Next</span><span class=\"fc-icon\">".concat(this.options.nextButton, "</span>"); // Create prev button

            var prevButton = document.createElement('button');
            prevButton.classList.add('fc-prev', 'fc-button');
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
      key: "buildCircleEvents",
      value: function buildCircleEvents() {
        var _this4 = this;

        var circles = this.options.appendCircles.querySelectorAll('.fc-circle');
        circles.forEach(function (element, index) {
          element.addEventListener('click', function () {
            return _this4.movePage(index);
          });
        });
      }
    }, {
      key: "buildCircles",
      value: function buildCircles() {
        if (this.options.circles) {
          // Only show the arrows if there are more slides then slidesPerPage option
          if (this.options.slidesPerPage < this.slideAmount) {
            this.selector.classList.add('fc-has-circles'); // Create circles container

            var circles = document.createElement('ul');
            circles.classList.add('fc-circles');
            this.options.appendCircles.appendChild(circles);
            var option = this.options.slidesPerPage > this.options.slidesScrolling ? this.options.slidesScrolling : this.options.slidesPerPage;
            var amount = Math.ceil(this.slideAmount / option);

            for (var i = 0; i < amount; i += 1) {
              var li = document.createElement('li');
              var circle = document.createElement('button');
              circle.classList.add('fc-circle', 'fc-button');
              circle.setAttribute('aria-label', "".concat(FlexCarousel.suffix(i + 1), " page"));
              var icon = document.createElement('span');
              icon.classList.add('fc-icon', 'fc-is-circle');
              var text = document.createElement('span');
              text.classList.add('fc-is-sr-only');
              text.innerHTML = i + 1;
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
      key: "buildSlides",
      value: function buildSlides() {
        var ul = this.selector.querySelector('ul');
        ul.classList.add('fc-slides'); // Add the slide class to all child div elements

        for (var index = 0; index < ul.children.length; index += 1) {
          ul.children[index].classList.add('fc-slide');
        } // Wrap slides to reduce HTML markup


        this.selector.innerHTML = "<div class=\"fc-container\">".concat(this.selector.innerHTML, "</div>");

        if (!this.options.appendCircles) {
          this.options.appendCircles = this.selector.querySelector('.fc-container');
        }

        var slides = this.selector.querySelector('.fc-slides');
        var allSlides = slides.querySelectorAll('.fc-slide');
        this.slideAmount = allSlides.length;

        if (this.options.slidesPerPage < this.slideAmount) {
          this.slideWidth = 100 / this.options.slidesPerPage; // Add the min-width CSS property to all slides

          for (var _index = 0; _index < this.slideAmount; _index += 1) {
            allSlides[_index].style.minWidth = "".concat(this.slideWidth, "%");
          }

          if (this.options.infinite) {
            // Clone and prepend/append slides
            var array = Array.from(allSlides);
            var prepend;
            var append;

            if (this.options.slidesPerPage >= this.options.slidesScrolling) {
              prepend = array.slice(this.slideAmount - this.options.slidesPerPage - 1, this.slideAmount).reverse();
              append = array.slice(0, this.options.slidesPerPage + 1);
            } else {
              prepend = array.slice(this.slideAmount - this.options.slidesPerPage, this.slideAmount).reverse();
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
      }
    }, {
      key: "getLeftPage",
      value: function getLeftPage(index) {
        if (this.options.slidesPerPage < this.slideAmount) {
          if (this.options.slidesPerPage >= this.options.slidesScrolling) {
            this.slideOffset = this.slideWidth * (this.options.slidesPerPage + 1) * -1;
          } else {
            this.slideOffset = this.slideWidth * this.options.slidesPerPage * -1;
          }

          if (!this.options.infinite) {
            this.slideOffset = 0;
          }
        }

        return index * this.slideWidth * -1 + this.slideOffset;
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
        }
      }
    }, {
      key: "movePage",
      value: function movePage(index) {
        var unevenOffset = this.slideAmount % this.options.slidesScrolling !== 0;
        var indexOffset = unevenOffset ? 0 : (this.slideAmount - this.currentPage) % this.options.slidesScrolling;

        if (index === 'previous') {
          var slideOffset = indexOffset === 0 ? this.options.slidesScrolling : this.options.slidesPerPage - indexOffset;

          if (this.options.slidesPerPage < this.slideAmount) {
            this.slideController(this.currentPage - slideOffset);
          }
        } else if (index === 'next') {
          var _slideOffset = indexOffset === 0 ? this.options.slidesScrolling : indexOffset;

          if (this.options.slidesPerPage < this.slideAmount) {
            this.slideController(this.currentPage + _slideOffset);
          }
        } else {
          var page = index === 0 ? 0 : index * this.options.slidesScrolling;
          this.slideController(page);
        }

        this.updateArrows();
        this.updateCircles();
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
        obj.transform = "translate3d(".concat(Math.ceil(position), "%, 0px, 0px)");
        slides.style.transform = obj.transform;
      }
    }, {
      key: "slideController",
      value: function slideController(index) {
        var nextPage;

        if (index < 0) {
          if (this.slideAmount % this.options.slidesScrolling !== 0) {
            nextPage = this.slideAmount - this.slideAmount % this.options.slidesScrolling;
          } else {
            nextPage = this.slideAmount + index;
          }
        } else if (index >= this.slideAmount) {
          if (this.slideAmount % this.options.slidesScrolling !== 0) {
            nextPage = 0;
          } else {
            nextPage = index - this.slideAmount;
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
            prevButton.removeAttribute('disabled', 'disabled');
          }

          if (this.currentPage === this.slideAmount - 1) {
            nextButton.setAttribute('disabled', 'disabled');
          } else {
            nextButton.removeAttribute('disabled', 'disabled');
          }
        }
      }
    }, {
      key: "updateCircles",
      value: function updateCircles() {
        var circle = this.options.appendCircles.querySelectorAll('.fc-circle');

        for (var _index4 = 0; _index4 < circle.length; _index4 += 1) {
          circle[_index4].classList.remove('fc-is-active');
        }

        var index = Math.floor(this.currentPage / this.options.slidesScrolling);
        circle[index].classList.add('fc-is-active');
      }
    }], [{
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
