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

  function defaults (fc) {
    return {
      appendArrows: fc._selector,
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
      swipe: false,
      touchThreshold: 5,
      transition: 'slide',
      transitionSpeed: 250
    };
  }

  function extend (obj1, obj2) {
    var extended = {};

    if (obj1) {
      Object.keys(obj1).forEach(function (value) {
        if (Object.prototype.hasOwnProperty.call(obj1, value)) {
          extended[value] = obj1[value];
        }
      });
    }

    if (obj2) {
      Object.keys(obj2).forEach(function (value) {
        if (Object.prototype.hasOwnProperty.call(obj2, value)) {
          extended[value] = obj2[value];
        }
      });
    }

    return extended;
  }

  function destroy (fc) {
    fc._selector.querySelectorAll('.fc-slide.fc-is-clone').forEach(function (element) {
      fc._selector.querySelector('.fc-slides').removeChild(element);
    });

    fc._selector.querySelectorAll('.fc-slide').forEach(function (element) {
      element.removeAttribute('class');
      element.removeAttribute('style');
    });

    fc._selector.querySelector('.fc-slides').removeAttribute('style');

    fc._selector.querySelector('.fc-slides').removeAttribute('class');

    if (fc._options.circles) {
      fc._selector.querySelector('.fc-container').removeChild(fc._selector.querySelector('.fc-circles'));
    }

    fc._selector.innerHTML = fc._selector.querySelector('.fc-container').innerHTML;
    fc._selector.className = fc._selectorName.replace('.', '');

    fc._selector.removeAttribute('style');

    fc._selector.removeAttribute('tabindex');
  }

  function reinit(fc) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    destroy(fc);
    fc._options = extend(fc._defaults, options);

    fc._init();

    fc._selector.dispatchEvent(fc._events.breakpoint);
  }

  function update (fc) {
    var targetBreakpoint;

    fc._breakpoints.forEach(function (options, breakpoint) {
      if (window.innerWidth >= breakpoint) {
        targetBreakpoint = breakpoint;
      }
    });

    if (targetBreakpoint) {
      if (fc._activeBreakpoint) {
        if (targetBreakpoint !== fc._activeBreakpoint) {
          fc._activeBreakpoint = targetBreakpoint;
          reinit(fc, fc._breakpoints[targetBreakpoint]);
        }
      } else {
        fc._activeBreakpoint = targetBreakpoint;
        reinit(fc, fc._breakpoints[targetBreakpoint]);
      }
    } else if (fc._activeBreakpoint !== null) {
      fc._activeBreakpoint = null;
      reinit(fc, fc._originalOptions);
    }
  }

  function update$1 (fc) {
    var prevButton = fc._options.appendArrows.querySelector('.fc-prev');

    var nextButton = fc._options.appendArrows.querySelector('.fc-next');

    if (!fc._options.infinite) {
      if (fc._currentPage === 0) {
        prevButton.setAttribute('disabled', 'disabled');
      } else {
        prevButton.removeAttribute('disabled');
      }

      if (fc._currentPage === fc._pageAmount - 1) {
        nextButton.setAttribute('disabled', 'disabled');
      } else {
        nextButton.removeAttribute('disabled');
      }
    }
  }

  function update$2 (fc) {
    var circles = fc._selector.querySelector('.fc-container').querySelectorAll('.fc-circle');

    for (var index = 0; index < circles.length; index += 1) {
      circles[index].classList.remove('fc-is-active');
    }

    circles[Math.floor(fc._currentPage / fc._options.slidesScrolling)].classList.add('fc-is-active');
  }

  function transform (fc, position) {
    fc._selector.querySelector('.fc-slides').style.transform = "translate3d(".concat(Math.ceil(position), "px, 0px, 0px)");
  }

  function leftPage (fc, index) {
    var slideOffset;

    if (fc._options.slidesPerPage < fc._pageAmount) {
      if (fc._options.slidesPerPage >= fc._options.slidesScrolling) {
        slideOffset = fc._pageWidth * fc._options.slidesPerPage * -1;
      }

      if (!fc._options.infinite) {
        slideOffset = 0;
      }
    }

    return index * fc._pageWidth * -1 + slideOffset;
  }

  function animate(fc, target) {
    var slides = fc._selector.querySelector('.fc-slides');

    if (fc._options.transition === 'slide') {
      slides.style.transition = "all ".concat(fc._options.transitionSpeed, "ms ease-in-out 0s");
    }

    transform(fc, Math.ceil(target));
    new Promise(function (resolve) {
      setTimeout(function () {
        if (fc._options.transition === 'slide') {
          slides.style.transition = '';
        }

        resolve(true);
      }, fc._options.transitionSpeed);
    }).then(function () {
      return transform(fc, leftPage(fc, fc._currentPage));
    });
  }

  function controller(fc, index) {
    var nextPage;

    if (index < 0) {
      if (fc._pageAmount % fc._options.slidesScrolling !== 0) {
        nextPage = fc._pageAmount - fc._pageAmount % fc._options.slidesScrolling;
      } else {
        nextPage = fc._pageAmount + index;
      }
    } else if (index >= fc._pageAmount) {
      if (fc._pageAmount % fc._options.slidesScrolling !== 0) {
        nextPage = 0;
      } else {
        nextPage = index - fc._pageAmount;
      }
    } else {
      nextPage = index;
    }

    fc._currentPage = nextPage;
    animate(fc, leftPage(fc, index));
  }
  function controller$1 (fc, index) {
    var unevenOffset = fc._pageAmount % fc._options.slidesScrolling !== 0;
    var indexOffset = unevenOffset ? 0 : (fc._pageAmount - fc._currentPage) % fc._options.slidesScrolling;

    if (index === 'previous') {
      var slideOffset = indexOffset === 0 ? fc._options.slidesScrolling : fc._options.slidesPerPage - indexOffset;

      if (fc._options.slidesPerPage < fc._pageAmount) {
        controller(fc, fc._currentPage - slideOffset);
      }
    } else if (index === 'next') {
      var _slideOffset = indexOffset === 0 ? fc._options.slidesScrolling : indexOffset;

      if (fc._options.slidesPerPage < fc._pageAmount) {
        controller(fc, fc._currentPage + _slideOffset);
      }
    } else {
      controller(fc, index === 0 ? 0 : index * fc._options.slidesScrolling);
    }

    if (fc._options.arrows) {
      update$1(fc);
    }

    if (fc._options.circles) {
      update$2(fc);
    }

    fc._selector.dispatchEvent(fc._events.pageChanging);

    setTimeout(function () {
      fc._selector.dispatchEvent(fc._events.pageChanged);
    }, fc._options.transitionSpeed);
  }

  function events (fc) {
    window.addEventListener('orientationchange', function () {
      update(fc);
      transform(fc);
    });

    fc._selector.onfocus = function () {
      if (document.activeElement === fc._selector) {
        document.onkeyup = function (e) {
          if (e.key === 'ArrowRight') {
            controller$1(fc, 'next');
          } else if (e.key === 'ArrowLeft') {
            controller$1(fc, 'previous');
          }
        };
      }
    };

    fc._selector.onblur = function () {
      document.onkeyup = function () {};
    };
  }

  function sizes (fc) {
    var container = fc._selector.querySelector('.fc-container').clientWidth;

    var slides = fc._selector.querySelector('.fc-slides');

    var pageAmount = slides.querySelectorAll('.fc-slide').length;
    slides.style.width = "".concat(pageAmount * container, "px");
    fc._pageWidth = container / fc._options.slidesPerPage;

    for (var index = 0; index < pageAmount; index += 1) {
      slides.querySelectorAll('.fc-slide')[index].style.width = "".concat(fc._pageWidth, "px");
    }

    transform(fc, leftPage(fc, fc._currentPage));
  }

  function slides (fc) {
    var ul = fc._selector.querySelector('ul');

    ul.classList.add('fc-slides');

    for (var index = 0; index < ul.children.length; index += 1) {
      ul.children[index].classList.add('fc-slide');
    }

    fc._selector.setAttribute('tabindex', '0');

    fc._selector.innerHTML = "<div class=\"fc-container\">".concat(fc._selector.innerHTML, "</div>");

    var slides = fc._selector.querySelector('.fc-slides');

    var allSlides = slides.querySelectorAll('.fc-slide');
    fc._pageAmount = allSlides.length;

    if (fc._options.slidesPerPage < fc._pageAmount) {
      if (fc._options.infinite) {
        var array = Array.from(allSlides);
        var prepend;
        var append;

        if (fc._options.slidesPerPage >= fc._options.slidesScrolling) {
          prepend = array.slice(fc._pageAmount - fc._options.slidesPerPage, fc._pageAmount).reverse();
          append = array.slice(0, fc._options.slidesPerPage);
        }

        for (var _index = 0; _index < prepend.length; _index += 1) {
          var clone = prepend[_index].cloneNode(true);

          clone.classList.add('fc-is-clone');
          slides.insertBefore(clone, slides.firstChild);
        }

        for (var _index2 = 0; _index2 < append.length; _index2 += 1) {
          var _clone = append[_index2].cloneNode(true);

          _clone.classList.add('fc-is-clone');

          slides.appendChild(_clone);
        }
      }

      sizes(fc);
      var timer;
      window.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          sizes(fc);
        }, 500);
      });
    }

    events(fc);
  }

  function events$1 (fc) {
    fc._options.appendArrows.querySelector('.fc-next').addEventListener('click', function () {
      controller$1(fc, 'next');
    });

    fc._options.appendArrows.querySelector('.fc-prev').addEventListener('click', function () {
      controller$1(fc, 'previous');
    });
  }

  function arrows (fc) {
    var slides = fc._selector.querySelector('.fc-slides');

    var slide = slides.querySelectorAll('.fc-slide');

    if (fc._options.arrows) {
      if (fc._options.slidesPerPage < slide.length) {
        fc._selector.classList.add('fc-has-arrows');

        var nextButton = document.createElement('button');
        nextButton.classList.add('fc-next');
        nextButton.setAttribute('aria-label', 'Next');
        nextButton.innerHTML = "<span class=\"fc-is-sr-only\">Next</span><span class=\"fc-icon\">".concat(fc._options.nextButton, "</span>");
        var prevButton = document.createElement('button');
        prevButton.classList.add('fc-prev');
        prevButton.setAttribute('aria-label', 'Previous');
        prevButton.innerHTML = "<span class=\"fc-is-sr-only\">Previous</span><span class=\"fc-icon\">".concat(fc._options.prevButton, "</span>");

        fc._options.appendArrows.appendChild(nextButton);

        fc._options.appendArrows.insertBefore(prevButton, fc._options.appendArrows.firstChild);

        if (fc._options.arrowsOverlay) {
          fc._selector.classList.add('fc-has-arrows-overlay');
        }

        events$1(fc);
        update$1(fc);
      }
    }
  }

  function autoplay (fc) {
    fc._autoplayDirection = 'right';
    fc._autoplayTimer = null;
    var pause = false;
    var slide;
    document.addEventListener('visibilitychange', function () {
      pause = document.visibilityState !== 'visible';
    });

    if (fc._autoplayTimer) {
      clearInterval(fc._autoplayTimer);
    }

    if (fc._options.autoplay) {
      fc._autoplayTimer = setInterval(function () {
        if (!pause) {
          if (!fc._options.infinite) {
            if (fc._autoplayDirection === 'right') {
              slide = 'next';

              if (fc._currentPage + 1 === fc._pageAmount - 1) {
                fc._autoplayDirection = 'left';
              }
            } else if (fc._autoplayDirection === 'left') {
              slide = 'previous';

              if (fc._currentPage === 1) {
                fc._autoplayDirection = 'right';
              }
            }
          } else {
            slide = 'next';
          }

          controller$1(fc, slide);
        }
      }, fc._options.autoplaySpeed);

      fc._selector.addEventListener('mouseenter', function () {
        pause = true;
      });

      fc._selector.addEventListener('mouseleave', function () {
        pause = false;
      });

      fc._selector.addEventListener('focusin', function () {
        pause = true;
      });

      fc._selector.addEventListener('focusout', function () {
        pause = false;
      });
    }
  }

  function event (fc) {
    var timer;
    window.addEventListener('resize', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        update(fc);
      }, 500);
    });
  }

  function breakpoints (fc) {
    fc._breakpoints = [];
    var breakpoints = [];

    if (fc._options.responsive) {
      var previous = fc._options;

      fc._options.responsive.forEach(function (_ref) {
        var breakpoint = _ref.breakpoint,
            options = _ref.options;

        if (!breakpoints.includes(breakpoint)) {
          breakpoints.push(breakpoint);
          fc._breakpoints[breakpoint] = extend(previous, options);
          previous = extend(previous, options);
        }
      });
    }

    event(fc);
    update(fc);
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

  function event$1 (fc) {
    var circles = fc._selector.querySelector('.fc-container').querySelectorAll('.fc-circle');

    circles.forEach(function (element, index) {
      element.addEventListener('click', function () {
        return controller$1(fc, index);
      });
    });
  }

  function circles (fc) {
    if (fc._options.circles) {
      if (fc._options.slidesPerPage < fc._pageAmount) {
        fc._selector.classList.add('fc-has-circles');

        var element = document.createElement('ul');
        element.classList.add('fc-circles');

        fc._selector.querySelector('.fc-container').appendChild(element);

        var option = fc._options.slidesPerPage > fc._options.slidesScrolling ? fc._options.slidesScrolling : fc._options.slidesPerPage;
        var amount = Math.ceil(fc._pageAmount / option);

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

        if (fc._options.circlesOverlay) {
          fc._selector.classList.add('fc-has-circles-overlay');
        }

        update$2(fc);
        event$1(fc);
      }
    }
  }

  function height (fc) {
    if (fc._options.height) {
      fc._selector.style.height = fc._options.height;
    }
  }

  function direction(fc) {
    var xDist = fc._touch.startX - fc._touch.curX;
    var yDist = fc._touch.startY - fc._touch.curY;
    var swipeAngle = Math.round(Math.atan2(yDist, xDist) * 180 / Math.PI);

    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }

    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return 'left';
    }

    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return 'left';
    }

    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return 'right';
    }

    return true;
  }

  function set(fc, event) {
    var touches;

    if (event.touches && event.touches.length) {
      touches = event.touches;
    }

    fc._touch.curX = touches ? touches[0].pageX : event.clientX;
    fc._touch.curY = touches ? touches[0].pageY : event.clientY;
  }

  function start(fc, event) {
    set(fc, event);
    fc._touch.startX = fc._touch.curX;
    fc._touch.startY = fc._touch.curY;

    if (fc._touch.fingers !== 1 || fc._pageAmount <= fc._options.slidesPerPage) {
      fc._touch = {};
      return false;
    }

    return true;
  }

  function move(fc, event) {
    set(fc, event);
    fc._touch.swipeLength = Math.round(Math.sqrt(Math.pow(fc._touch.curX - fc._touch.startX, 2)));

    if (fc._touch.swipeLength) {
      event.preventDefault();
    }

    transform(fc, leftPage(fc, fc._currentPage) + fc._touch.swipeLength * (fc._touch.curX > fc._touch.startX ? 1 : -1));
    return true;
  }

  function end(fc) {
    if (fc._touch.swipeLength >= fc._touch.minSwipe) {
      if (direction() === 'left' || direction() === 'down') {
        controller$1(fc, 3);
      } else if (direction() === 'right' || direction() === 'up') {
        controller$1(fc, 2);
      }
    } else if (fc._touch.startX !== fc._touch.curX) {
      controller$1(fc, fc._currentPage);
    }

    fc._touch = {};
    return true;
  }

  function swipe(fc, event) {
    fc._touch.fingers = event.touches !== undefined ? event.touches.length : 1;
    fc._touch.minSwipe = fc._selector.querySelector('.fc-slides').offsetWidth / fc._options.touchThreshold;

    if (event.type === 'touchstart' || event.type === 'mousedown') {
      start(fc, event);
    } else if (event.type === 'touchmove' || event.type === 'mousemove') {
      move(fc, event);
    } else if (event.type === 'touchcancel' || event.type === 'mouseleave') {
      end(fc);
    }
  }

  function swipe$1 (fc) {
    if (fc._options.swipe) {
      var container = fc._selector.querySelector('.fc-container');

      var events = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'mousedown', 'mousemove', 'mouseup', 'mouseleave'];
      events.forEach(function (element) {
        container.addEventListener(element, function (event) {
          swipe(fc, event);
        });
      });
    }
  }

  var suffix$1 = '.fc';
  var custom = {
    breakpoint: new CustomEvent("breakpoint".concat(suffix$1)),
    pageChanged: new CustomEvent("pageChanged".concat(suffix$1)),
    pageChanging: new CustomEvent("pageChanging".concat(suffix$1))
  };

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
      this._activeBreakpoint = null;
      this._currentPage = this._options.initialPage;
      this._events = custom;
      this._originalOptions = this._options;
      this._pageAmount = '';
      this._pageWidth = '';
      this._touch = {};

      this._init();

      return this._selector;
    }

    _createClass(FlexCarousel, [{
      key: "_init",
      value: function _init() {
        if (!this._selector.classList.contains('fc')) {
          this._selector.classList.add('fc');

          slides(this);
          autoplay(this);
          arrows(this);
          circles(this);
          height(this);
          breakpoints(this);
          swipe$1(this);
        }
      }
    }]);

    return FlexCarousel;
  }();

  return FlexCarousel;

}());
//# sourceMappingURL=flexCarousel.js.map
