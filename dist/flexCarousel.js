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

  function defaults (instance) {
    return {
      appendArrows: instance._selector,
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
  }

  function destroy (instance) {
    instance._selector.querySelectorAll('.fc-slide.fc-is-clone').forEach(function (element) {
      instance._selector.querySelector('.fc-slides').removeChild(element);
    });

    instance._selector.querySelectorAll('.fc-slide').forEach(function (element) {
      element.removeAttribute('class');
      element.removeAttribute('style');
    });

    instance._selector.querySelector('.fc-slides').removeAttribute('style');

    instance._selector.querySelector('.fc-slides').removeAttribute('class');

    if (instance._options.circles) {
      instance._selector.querySelector('.fc-container').removeChild(instance._selector.querySelector('.fc-circles'));
    }

    instance._selector.innerHTML = instance._selector.querySelector('.fc-container').innerHTML;
    instance._selector.className = instance._selectorName.replace('.', '');

    instance._selector.removeAttribute('style');
  }

  function update (instance) {
    instance._originalOptions = instance._options;
    var targetBreakpoint;

    instance._breakpoints.forEach(function (options, breakpoint) {
      if (window.innerWidth >= breakpoint) {
        targetBreakpoint = breakpoint;
      }
    });

    if (targetBreakpoint) {
      if (instance._activeBreakpoint) {
        if (targetBreakpoint !== instance._activeBreakpoint) {
          instance._activeBreakpoint = targetBreakpoint;

          instance._reinit(instance._breakpoints[targetBreakpoint]);
        }
      } else {
        instance._activeBreakpoint = targetBreakpoint;

        instance._reinit(instance._breakpoints[targetBreakpoint]);
      }
    } else if (instance._activeBreakpoint !== null) {
      instance._activeBreakpoint = null;

      instance._reinit(instance._originalOptions);
    }
  }

  function update$1 (instance) {
    var prevButton = instance._options.appendArrows.querySelector('.fc-prev');

    var nextButton = instance._options.appendArrows.querySelector('.fc-next');

    if (!instance._options.infinite) {
      if (instance._currentPage === 0) {
        prevButton.setAttribute('disabled', 'disabled');
      } else {
        prevButton.removeAttribute('disabled');
      }

      if (instance._currentPage === instance._pageAmount - 1) {
        nextButton.setAttribute('disabled', 'disabled');
      } else {
        nextButton.removeAttribute('disabled');
      }
    }
  }

  function update$2 (instance) {
    var circles = instance._selector.querySelector('.fc-container').querySelectorAll('.fc-circle');

    for (var _index = 0; _index < circles.length; _index += 1) {
      circles[_index].classList.remove('fc-is-active');
    }

    var index = Math.floor(instance._currentPage / instance._options.slidesScrolling);
    circles[index].classList.add('fc-is-active');
  }

  function transform (instance, position) {
    instance._selector.querySelector('.fc-slides').style.transform = "translate3d(".concat(Math.ceil(position), "%, 0px, 0px)");
  }

  function leftPage (instance, index) {
    var slideOffset;

    if (instance._options.slidesPerPage < instance._pageAmount) {
      if (instance._options.slidesPerPage >= instance._options.slidesScrolling) {
        slideOffset = instance._pageWidth * instance._options.slidesPerPage * -1;
      }

      if (!instance._options.infinite) {
        slideOffset = 0;
      }
    }

    return index * instance._pageWidth * -1 + slideOffset;
  }

  function animate (instance, target) {
    var slides = instance._selector.querySelector('.fc-slides');

    if (instance._options.transition === 'slide') {
      slides.style.transition = "all ".concat(instance._options.transitionSpeed, "ms ease-in-out 0s");
    }

    transform(instance, Math.ceil(target));
    new Promise(function (resolve) {
      setTimeout(function () {
        if (instance._options.transition === 'slide') {
          slides.style.transition = '';
        }

        resolve(true);
      }, instance._options.transitionSpeed);
    }).then(function () {
      return transform(instance, leftPage(instance, instance._currentPage));
    });
  }

  function controller (instance, index) {
    var nextPage;

    if (index < 0) {
      if (instance._pageAmount % instance._options.slidesScrolling !== 0) {
        nextPage = instance._pageAmount - instance._pageAmount % instance._options.slidesScrolling;
      } else {
        nextPage = instance._pageAmount + index;
      }
    } else if (index >= instance._pageAmount) {
      if (instance._pageAmount % instance._options.slidesScrolling !== 0) {
        nextPage = 0;
      } else {
        nextPage = index - instance._pageAmount;
      }
    } else {
      nextPage = index;
    }

    instance._currentPage = nextPage;
    animate(instance, leftPage(instance, index));
  }

  function move (instance, index) {
    var unevenOffset = instance._pageAmount % instance._options.slidesScrolling !== 0;
    var indexOffset = unevenOffset ? 0 : (instance._pageAmount - instance._currentPage) % instance._options.slidesScrolling;

    if (index === 'previous') {
      var slideOffset = indexOffset === 0 ? instance._options.slidesScrolling : instance._options.slidesPerPage - indexOffset;

      if (instance._options.slidesPerPage < instance._pageAmount) {
        controller(instance, instance._currentPage - slideOffset);
      }
    } else if (index === 'next') {
      var _slideOffset = indexOffset === 0 ? instance._options.slidesScrolling : indexOffset;

      if (instance._options.slidesPerPage < instance._pageAmount) {
        controller(instance, instance._currentPage + _slideOffset);
      }
    } else {
      var page = index === 0 ? 0 : index * instance._options.slidesScrolling;
      controller(instance, page);
    }

    if (instance._options.arrows) {
      update$1(instance);
    }

    if (instance._options.circles) {
      update$2(instance);
    }

    instance._selector.dispatchEvent(instance._customEvents.pageChanging);

    setTimeout(function () {
      instance._selector.dispatchEvent(instance._customEvents.pageChanged);
    }, instance._options.transitionSpeed);
  }

  function events (instance) {
    window.addEventListener('orientationchange', function () {
      update(instance);
      transform(instance);
    });

    instance._selector.onfocus = function () {
      if (document.activeElement === instance._selector) {
        document.onkeyup = function (e) {
          if (e.key === 'ArrowRight') {
            move(instance, 'next');
          } else if (e.key === 'ArrowLeft') {
            move(instance, 'previous');
          }
        };
      }
    };

    instance._selector.onblur = function () {
      document.onkeyup = function () {};
    };
  }

  function slides (instance) {
    var ul = instance._selector.querySelector('ul');

    ul.classList.add('fc-slides');

    for (var index = 0; index < ul.children.length; index += 1) {
      ul.children[index].classList.add('fc-slide');
    }

    instance._selector.setAttribute('tabindex', '0');

    instance._selector.innerHTML = "<div class=\"fc-container\">".concat(instance._selector.innerHTML, "</div>");

    var slides = instance._selector.querySelector('.fc-slides');

    var allSlides = slides.querySelectorAll('.fc-slide');
    instance._pageAmount = allSlides.length;

    if (instance._options.slidesPerPage < instance._pageAmount) {
      instance._pageWidth = 100 / instance._options.slidesPerPage;

      for (var _index = 0; _index < instance._pageAmount; _index += 1) {
        allSlides[_index].style.minWidth = "".concat(instance._pageWidth, "%");
      }

      if (instance._options.infinite) {
        var array = Array.from(allSlides);
        var prepend;
        var append;

        if (instance._options.slidesPerPage >= instance._options.slidesScrolling) {
          prepend = array.slice(instance._pageAmount - instance._options.slidesPerPage, instance._pageAmount).reverse();
          append = array.slice(0, instance._options.slidesPerPage);
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

      transform(instance, leftPage(instance, instance._currentPage));
    }

    events(instance);
  }

  function events$1 (instance) {
    var nextButton = instance._options.appendArrows.querySelector('.fc-next');

    var prevButton = instance._options.appendArrows.querySelector('.fc-prev');

    nextButton.addEventListener('click', function () {
      move(instance, 'next');
    });
    prevButton.addEventListener('click', function () {
      move(instance, 'previous');
    });
  }

  function arrows (instance) {
    var slides = instance._selector.querySelector('.fc-slides');

    var slide = slides.querySelectorAll('.fc-slide');

    if (instance._options.arrows) {
      if (instance._options.slidesPerPage < slide.length) {
        instance._selector.classList.add('fc-has-arrows');

        var nextButton = document.createElement('button');
        nextButton.classList.add('fc-next');
        nextButton.setAttribute('aria-label', 'Next');
        nextButton.innerHTML = "<span class=\"fc-is-sr-only\">Next</span><span class=\"fc-icon\">".concat(instance._options.nextButton, "</span>");
        var prevButton = document.createElement('button');
        prevButton.classList.add('fc-prev');
        prevButton.setAttribute('aria-label', 'Previous');
        prevButton.innerHTML = "<span class=\"fc-is-sr-only\">Previous</span><span class=\"fc-icon\">".concat(instance._options.prevButton, "</span>");

        instance._options.appendArrows.appendChild(nextButton);

        instance._options.appendArrows.insertBefore(prevButton, instance._options.appendArrows.firstChild);

        if (instance._options.arrowsOverlay) {
          instance._selector.classList.add('fc-has-arrows-overlay');
        }

        events$1(instance);
        update$1(instance);
      }
    }
  }

  function autoplay (instance) {
    instance._autoplayDirection = 'right';
    instance._autoplayTimer = null;
    var pause = false;
    var slide;
    document.addEventListener('visibilitychange', function () {
      pause = document.visibilityState !== 'visible';
    });

    if (instance._autoplayTimer) {
      clearInterval(instance._autoplayTimer);
    }

    if (instance._options.autoplay) {
      instance._autoplayTimer = setInterval(function () {
        if (!pause) {
          if (!instance._options.infinite) {
            if (instance._autoplayDirection === 'right') {
              slide = 'next';

              if (instance._currentPage + 1 === instance._pageAmount - 1) {
                instance._autoplayDirection = 'left';
              }
            } else if (instance._autoplayDirection === 'left') {
              slide = 'previous';

              if (instance._currentPage === 1) {
                instance._autoplayDirection = 'right';
              }
            }
          } else {
            slide = 'next';
          }

          instance._movePage(slide);
        }
      }, instance._options.autoplaySpeed);

      instance._selector.addEventListener('mouseenter', function () {
        pause = true;
      });

      instance._selector.addEventListener('mouseleave', function () {
        pause = false;
      });

      instance._selector.addEventListener('focusin', function () {
        pause = true;
      });

      instance._selector.addEventListener('focusout', function () {
        pause = false;
      });
    }
  }

  function event (instance) {
    var timer;
    window.addEventListener('resize', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        update(instance);
      }, 500);
    });
  }

  function extend (obj1, obj2) {
    var extended = {};

    if (obj1) {
      var keys = Object.keys(obj1);
      keys.forEach(function (value) {
        if (Object.prototype.hasOwnProperty.call(obj1, value)) {
          extended[value] = obj1[value];
        }
      });
    }

    if (obj2) {
      var _keys = Object.keys(obj2);

      _keys.forEach(function (value) {
        if (Object.prototype.hasOwnProperty.call(obj2, value)) {
          extended[value] = obj2[value];
        }
      });
    }

    return extended;
  }

  function breakpoints (instance) {
    instance._activeBreakpoint = null;
    instance._breakpoints = [];
    var breakpoints = [];

    if (instance._options.responsive) {
      var previous = instance._options;

      instance._options.responsive.forEach(function (_ref) {
        var breakpoint = _ref.breakpoint,
            options = _ref.options;

        if (!breakpoints.includes(breakpoint)) {
          breakpoints.push(breakpoint);
          instance._breakpoints[breakpoint] = extend(previous, options);
          previous = extend(previous, options);
        }
      });
    }

    event(instance);
    update(instance);
  }

  function suffix (index) {
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

  function event$1 (instance) {
    var circles = instance._selector.querySelector('.fc-container').querySelectorAll('.fc-circle');

    circles.forEach(function (element, index) {
      element.addEventListener('click', function () {
        return move(instance, index);
      });
    });
  }

  function circles (instance) {
    if (instance._options.circles) {
      if (instance._options.slidesPerPage < instance._pageAmount) {
        instance._selector.classList.add('fc-has-circles');

        var element = document.createElement('ul');
        element.classList.add('fc-circles');

        instance._selector.querySelector('.fc-container').appendChild(element);

        var option = instance._options.slidesPerPage > instance._options.slidesScrolling ? instance._options.slidesScrolling : instance._options.slidesPerPage;
        var amount = Math.ceil(instance._pageAmount / option);

        for (var index = 0; index < amount; index += 1) {
          var li = document.createElement('li');
          var circle = document.createElement('button');
          circle.classList.add('fc-circle');
          circle.setAttribute('aria-label', "".concat(suffix(index + 1), " page"));
          var icon = document.createElement('span');
          icon.classList.add('fc-icon', 'fc-is-circle');
          var text = document.createElement('span');
          text.classList.add('fc-is-sr-only');
          text.innerHTML = index + 1;
          circle.appendChild(icon);
          circle.appendChild(text);
          li.appendChild(circle);
          element.appendChild(li);
        }

        if (instance._options.circlesOverlay) {
          instance._selector.classList.add('fc-has-circles-overlay');
        }

        update$2(instance);
        event$1(instance);
      }
    }
  }

  function height (instance) {
    if (instance._options.height) {
      instance._selector.style.height = instance._options.height;
    }
  }

  var FlexCarousel =
  /*#__PURE__*/
  function () {
    function FlexCarousel(selector) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, FlexCarousel);

      this._selectorName = selector.toString();
      this._selector = document.querySelector(selector);
      this._defaults = defaults(this);
      this._options = extend(this._defaults, options);
      this._customEvents = {
        breakpoint: new CustomEvent('breakpoint.fc'),
        pageChanged: new CustomEvent('pageChanged.fc'),
        pageChanging: new CustomEvent('pageChanging.fc')
      };
      this._pageAmount = null;
      this._pageWidth = null;
      this._currentPage = this._options.initialPage;

      this._init();

      return this._selector;
    }

    _createClass(FlexCarousel, [{
      key: "_init",
      value: function _init() {
        if (!this._selector.classList.contains('fc')) {
          this._selector.classList.add('fc');

          slides(this);
          arrows(this);
          circles(this);
          autoplay(this);
          height(this);
          breakpoints(this);
        }
      }
    }, {
      key: "_reinit",
      value: function _reinit() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        destroy(this);
        this._options = extend(this._defaults, options);

        this._init();

        this._selector.dispatchEvent(this._customEvents.breakpoint);
      }
    }]);

    return FlexCarousel;
  }();

  return FlexCarousel;

}());
//# sourceMappingURL=flexCarousel.js.map
