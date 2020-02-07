/*
 * flexCarousel.js v1.0.0
 * https://github.com/tomhrtly/flexCarousel.js
 *
 * Copyright 2020 Tom Hartley
 * Released under the MIT license
 *
 * Icons provided by Font Awesome: https://fontawesome.com
 */

import animate from './core/animate';
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

        this._activeBreakpoint = null;
        this._breakpoints = [];
        this._customEvents = {
            breakpoint: new CustomEvent('breakpoint.fc'),
            pageChanged: new CustomEvent('pageChanged.fc'),
            pageChanging: new CustomEvent('pageChanging.fc'),
        };
        this._options = extend(this._defaults, options);
        this._originalOptions = this._options;
        this._pageAmount = null;
        this._pageWidth = null;

        this._currentPage = this._options.initialPage;

        this._init();

        return this._selector;
    }

    _buildOptions() {
        autoplay(this);
        height(this);
    }

    _getLeftPage(index) {
        let slideOffset;

        if (this._options.slidesPerPage < this._pageAmount) {
            if (this._options.slidesPerPage >= this._options.slidesScrolling) {
                slideOffset = (this._pageWidth * this._options.slidesPerPage) * -1;
            }

            if (!this._options.infinite) {
                slideOffset = 0;
            }
        }

        return ((index * this._pageWidth) * -1) + slideOffset;
    }

    _init() {
        if (!this._selector.classList.contains('fc')) {
            this._selector.classList.add('fc');
            slides(this);
            arrows(this);
            circles(this);
            this._buildOptions();
            breakpoints(this);
        }
    }

    _reinit(options = {}) {
        destroy(this);
        this._options = extend(this._defaults, options);
        this._init();
        this._selector.dispatchEvent(this._customEvents.breakpoint);
    }

    _slideController(index) {
        let nextPage;

        if (index < 0) {
            if (this._pageAmount % this._options.slidesScrolling !== 0) {
                nextPage = this._pageAmount - (this._pageAmount % this._options.slidesScrolling);
            } else {
                nextPage = this._pageAmount + index;
            }
        } else if (index >= this._pageAmount) {
            if (this._pageAmount % this._options.slidesScrolling !== 0) {
                nextPage = 0;
            } else {
                nextPage = index - this._pageAmount;
            }
        } else {
            nextPage = index;
        }

        this._currentPage = nextPage;
        animate(this, this._getLeftPage(index));
    }
}
