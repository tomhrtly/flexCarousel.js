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
import destroy from './core/destroy';
import slides from './core/slides';
import arrows from './components/arrows';
import autoplay from './components/autoplay';
import breakpoints from './components/breakpoints';
import circles from './components/circles';
import height from './components/height';
import extend from './utils/extend';

export default class FlexCarousel {
    constructor(selector, options = {}) {
        this._selectorName = selector.toString();
        this._selector = document.querySelector(selector);
        this._defaults = defaults(this);
        this._options = extend(this._defaults, options);
        this._customEvents = {
            breakpoint: new CustomEvent('breakpoint.fc'),
            pageChanged: new CustomEvent('pageChanged.fc'),
            pageChanging: new CustomEvent('pageChanging.fc'),
        };
        this._pageAmount = null;
        this._pageWidth = null;
        this._currentPage = this._options.initialPage;
        this._init();

        return this._selector;
    }

    _init() {
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

    _reinit(options = {}) {
        destroy(this);
        this._options = extend(this._defaults, options);
        this._init();
        this._selector.dispatchEvent(this._customEvents.breakpoint);
    }
}
