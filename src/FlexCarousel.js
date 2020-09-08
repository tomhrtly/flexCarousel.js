/*
 * FlexCarousel.js v1.2.0
 * https://github.com/tomhrtly/FlexCarousel.js
 *
 * Copyright 2020 Tom Hartley
 * Released under the MIT license
 *
 * Icons provided by Font Awesome: https://fontawesome.com
 */

import defaults from './core/defaults';
import slides from './core/slides';
import components from './components/index';
import extend from './utils/extend';
import custom from './events/custom';

export default class FlexCarousel {
    constructor(selector, options = {}) {
        this._selectorName = selector.toString();
        this._selector = document.querySelector(selector);

        this._defaults = defaults(this);
        this._options = extend(this._defaults, options);
        this._originalOptions = this._options;

        this._events = custom;

        this._activeBreakpoint = null;
        this._pageAmount = null;
        this._pageWidth = null;
        this._currentPage = this._options.initialPage;

        this._init();
        return this._selector;
    }

    _init() {
        if (document.querySelector(this._selectorName) && !this._selector.classList.contains('fc')) {
            this._selector.classList.add('fc');
            slides(this);
            components.arrows(this);
            components.circles(this);
            components.autoplay(this);
            components.height(this);
            components.breakpoints(this);
        }
    }
}
