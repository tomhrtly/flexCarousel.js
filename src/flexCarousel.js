/*
 * flexCarousel.js v1.0.0
 * https://github.com/tomhrtly/flexCarousel.js
 *
 * Copyright 2020 Tom Hartley
 * Released under the MIT license
 *
 * Icons provided by Font Awesome: https://fontawesome.com
 */

import defaults from './core/defaults';
import slides from './core/slides';
import * as component from './components/index';
import extend from './utils/extend';
import custom from './events/custom';

export default class FlexCarousel {
    constructor(selector, options = {}) {
        this._selectorName = selector.toString();
        this._selector = document.querySelector(selector);

        this._defaults = defaults(this);
        this._options = extend(this._defaults, options);

        this._events = custom;

        this._currentPage = this._options.initialPage;
        this._dragging = false;
        this._pageAmount = '';
        this._pageWidth = '';
        this._scrolling = false;
        this._swiping = false;
        this._touch = {};

        this._init();
        return this._selector;
    }

    _init() {
        if (!this._selector.classList.contains('fc')) {
            this._selector.classList.add('fc');
            slides(this);
            component.autoplay(this);
            component.arrows(this);
            component.breakpoints(this);
            component.circles(this);
            component.height(this);
            component.swipe(this);
        }
    }
}
