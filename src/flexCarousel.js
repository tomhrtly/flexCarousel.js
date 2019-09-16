/*
 * flexCarousel.js v0.3.0
 * https://github.com/tomhrtly/flexCarousel.js
 *
 * Copyright 2019 Tom Hartley
 * Released under the MIT license
 *
 * Icons provided by Font Awesome: https://fontawesome.com
 */

class FlexCarousel {
    constructor(selector, options = {}) {
        this.selectorName = selector.toString();
        this.selector = document.querySelector(selector);

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
            responsive: null,
            slidesPerPage: 1,
            slidesScrolling: 1,
            transition: 'slide',
            transitionSpeed: 250,
        };

        this.autoplayDirection = 'right';
        this.breakpoints = [];
        this.currentPage = 0;
        this.slideAmount = null;
        this.slideOffset = null;
        this.slideWidth = null;

        this.options = FlexCarousel.extend(this.defaults, options);
        this.init();
    }

    addTransition() {
        const slides = this.selector.querySelector('.fc-slides');

        if (this.options.transition === 'slide') {
            slides.style.transition = `all ${this.options.transitionSpeed}ms ease-in-out 0s`;
        }
    }

    animatePage(target) {
        this.addTransition();
        this.setTransform(Math.ceil(target));

        new Promise((resolve) => {
            setTimeout(() => {
                this.removeTransition();
                resolve(true);
            }, this.options.transitionSpeed);
        }).then(() => this.setTransform(this.getLeftPage(this.currentPage)));
    }

    autoplay() {
        let pause = false;
        let slide;

        if (this.options.autoplay) {
            setInterval(() => {
                if (!pause) {
                    if (!this.options.infinite) {
                        if (this.autoplayDirection === 'right') {
                            slide = 'next';

                            if ((this.currentPage + 1) === (this.slideAmount - 1)) {
                                this.autoplayDirection = 'left';
                            }
                        } else if (this.autoplayDirection === 'left') {
                            slide = 'previous';

                            if (this.currentPage === 1) {
                                this.autoplayDirection = 'right';
                            }
                        }
                    } else {
                        slide = 'next';
                    }
                    this.movePage(slide);
                }
            }, this.options.autoplaySpeed);

            this.selector.addEventListener('mouseenter', () => { pause = true; });
            this.selector.addEventListener('mouseleave', () => { pause = false; });
        }
    }

    buildArrowEvents() {
        const nextButton = this.options.appendArrows.querySelector('.fc-next');
        const prevButton = this.options.appendArrows.querySelector('.fc-prev');

        // Move to the next slide when clicking the next arrow
        nextButton.addEventListener('click', () => {
            this.movePage('next');
        });

        // Move to the previous slide when clicking the previous arrow
        prevButton.addEventListener('click', () => {
            this.movePage('previous');
        });
    }

    buildArrows() {
        const slides = this.selector.querySelector('.fc-slides');
        const slide = slides.querySelectorAll('.fc-slide');

        if (this.options.arrows) {
            // Only show the arrows if there are more slides then slidesPerPage option
            if (this.options.slidesPerPage < slide.length) {
                this.selector.classList.add('fc-has-arrows');

                // Create arrow button
                const nextButton = document.createElement('button');
                nextButton.classList.add('fc-next', 'fc-button');
                nextButton.setAttribute('aria-label', 'Next');
                nextButton.innerHTML = `<span class="fc-is-sr-only">Next</span><span class="fc-icon">${this.options.nextButton}</span>`;

                // Create prev button
                const prevButton = document.createElement('button');
                prevButton.classList.add('fc-prev', 'fc-button');
                prevButton.setAttribute('aria-label', 'Previous');
                prevButton.innerHTML = `<span class="fc-is-sr-only">Previous</span><span class="fc-icon">${this.options.prevButton}</span>`;

                // Append next arrow to the selector
                this.options.appendArrows.appendChild(nextButton);

                // Prepend prev arrow to the selector
                this.options.appendArrows.insertBefore(prevButton, this.options.appendArrows.firstChild);

                // Add the overlay class if needed
                if (this.options.arrowsOverlay) {
                    this.selector.classList.add('fc-has-arrows-overlay');
                }

                this.buildArrowEvents();
                this.updateArrows();
            }
        }
    }

    buildBreakpoints() {
        const breakpoints = [];

        if (this.options.responsive) {
            let previous = this.options;

            this.options.responsive.forEach(({ breakpoint, options }) => {
                if (!breakpoints.includes(breakpoint)) {
                    breakpoints.push(breakpoint);

                    this.breakpoints[breakpoint] = FlexCarousel.extend(previous, options);
                    previous = FlexCarousel.extend(previous, options);
                }
            });
        }

        this.updateResponsive();
    }

    buildCircleEvents() {
        const circles = this.options.appendCircles.querySelectorAll('.fc-circle');

        circles.forEach((element, index) => {
            element.addEventListener('click', () => this.movePage(index));
        });
    }

    buildCircles() {
        if (this.options.circles) {
            // Only show the arrows if there are more slides then slidesPerPage option
            if (this.options.slidesPerPage < this.slideAmount) {
                this.selector.classList.add('fc-has-circles');

                // Create circles container
                const circles = document.createElement('ul');
                circles.classList.add('fc-circles');

                this.options.appendCircles.appendChild(circles);

                const option = this.options.slidesPerPage > this.options.slidesScrolling ? this.options.slidesScrolling : this.options.slidesPerPage;
                const amount = Math.ceil(this.slideAmount / option);

                for (let index = 0; index < amount; index += 1) {
                    const li = document.createElement('li');

                    const circle = document.createElement('button');
                    circle.classList.add('fc-circle', 'fc-button');
                    circle.setAttribute('aria-label', `${FlexCarousel.suffix(index + 1)} page`);

                    const icon = document.createElement('span');
                    icon.classList.add('fc-icon', 'fc-is-circle');

                    const text = document.createElement('span');
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

    buildOptions() {
        if (this.options.height) {
            this.selector.style.height = this.options.height;
        }

        this.autoplay();
    }

    buildSlides() {
        const ul = this.selector.querySelector('ul');

        ul.classList.add('fc-slides');

        // Add the slide class to all child div elements
        for (let index = 0; index < ul.children.length; index += 1) {
            ul.children[index].classList.add('fc-slide');
        }

        // Wrap slides to reduce HTML markup
        this.selector.innerHTML = `<div class="fc-container">${this.selector.innerHTML}</div>`;

        if (!this.options.appendCircles) {
            this.options.appendCircles = this.selector.querySelector('.fc-container');
        }

        const slides = this.selector.querySelector('.fc-slides');
        const allSlides = slides.querySelectorAll('.fc-slide');

        this.slideAmount = allSlides.length;

        if (this.options.slidesPerPage < this.slideAmount) {
            this.slideWidth = 100 / this.options.slidesPerPage;

            // Add the min-width CSS property to all slides
            for (let index = 0; index < this.slideAmount; index += 1) {
                allSlides[index].style.minWidth = `${this.slideWidth}%`;
            }

            if (this.options.infinite) {
                // Clone and prepend/append slides
                const array = Array.from(allSlides);
                let prepend;
                let append;

                if (this.options.slidesPerPage >= this.options.slidesScrolling) {
                    prepend = array.slice(this.slideAmount - this.options.slidesPerPage - 1, this.slideAmount).reverse();
                    append = array.slice(0, this.options.slidesPerPage + 1);
                } else {
                    prepend = array.slice(this.slideAmount - this.options.slidesPerPage, this.slideAmount).reverse();
                    append = array.slice(0, this.options.slidesPerPage);
                }

                for (let index = 0; index < prepend.length; index += 1) {
                    const clone = prepend[index].cloneNode(true);
                    clone.classList.add('fc-is-clone');
                    slides.insertBefore(clone, slides.firstChild);
                }

                for (let index = 0; index < append.length; index += 1) {
                    const clone = append[index].cloneNode(true);
                    clone.classList.add('fc-is-clone');
                    slides.appendChild(clone);
                }
            }

            this.setTransform(this.getLeftPage(this.currentPage));
        }
    }

    destroy() {
        this.selector.querySelectorAll('.fc-slide.fc-is-clone').forEach((element) => {
            this.selector.querySelector('.fc-slides').removeChild(element);
        });

        this.selector.querySelectorAll('.fc-slide').forEach((element) => {
            element.className = '';
            element.style.minWidth = '';
        });

        this.selector.querySelector('.fc-slides').style.transform = '';
        this.selector.querySelector('.fc-slides').className = '';
        this.selector.innerHTML = this.selector.querySelector('.fc-container').innerHTML;
        this.selector.removeChild(this.selector.querySelector('.fc-circles'));

        this.selector.className = this.selectorName.replace('.', '');
        this.selector.removeAttribute('style');

        this.currentPage = 0;
    }

    getLeftPage(index) {
        if (this.options.slidesPerPage < this.slideAmount) {
            if (this.options.slidesPerPage >= this.options.slidesScrolling) {
                this.slideOffset = (this.slideWidth * (this.options.slidesPerPage + 1)) * -1;
            } else {
                this.slideOffset = (this.slideWidth * this.options.slidesPerPage) * -1;
            }

            if (!this.options.infinite) {
                this.slideOffset = 0;
            }
        }

        return ((index * this.slideWidth) * -1) + this.slideOffset;
    }

    init() {
        if (!this.selector.classList.contains('fc')) {
            this.selector.classList.add('fc');
            this.buildSlides();
            this.buildArrows();
            this.buildCircles();
            this.buildOptions();
            this.buildBreakpoints();
        }
    }

    movePage(index) {
        const unevenOffset = (this.slideAmount % this.options.slidesScrolling !== 0);
        const indexOffset = unevenOffset ? 0 : (this.slideAmount - this.currentPage) % this.options.slidesScrolling;

        if (index === 'previous') {
            const slideOffset = indexOffset === 0 ? this.options.slidesScrolling : this.options.slidesPerPage - indexOffset;

            if (this.options.slidesPerPage < this.slideAmount) {
                this.slideController(this.currentPage - slideOffset);
            }
        } else if (index === 'next') {
            const slideOffset = indexOffset === 0 ? this.options.slidesScrolling : indexOffset;

            if (this.options.slidesPerPage < this.slideAmount) {
                this.slideController(this.currentPage + slideOffset);
            }
        } else {
            const page = index === 0 ? 0 : index * this.options.slidesScrolling;
            this.slideController(page);
        }

        this.updateArrows();
        this.updateCircles();
    }

    removeTransition() {
        const slides = this.selector.querySelector('.fc-slides');

        if (this.options.transition === 'slide') {
            slides.style.transition = '';
        }
    }

    setTransform(position) {
        const slides = this.selector.querySelector('.fc-slides');
        slides.style.transform = `translate3d(${Math.ceil(position)}%, 0px, 0px)`;
    }

    slideController(index) {
        let nextPage;

        if (index < 0) {
            if (this.slideAmount % this.options.slidesScrolling !== 0) {
                nextPage = this.slideAmount - (this.slideAmount % this.options.slidesScrolling);
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

    updateArrows() {
        const prevButton = this.options.appendArrows.querySelector('.fc-prev');
        const nextButton = this.options.appendArrows.querySelector('.fc-next');

        if (!this.options.infinite) {
            if (this.currentPage === 0) {
                prevButton.setAttribute('disabled', 'disabled');
            } else {
                prevButton.removeAttribute('disabled');
            }

            if (this.currentPage === this.slideAmount - 1) {
                nextButton.setAttribute('disabled', 'disabled');
            } else {
                nextButton.removeAttribute('disabled');
            }
        }
    }

    updateCircles() {
        const circle = this.options.appendCircles.querySelectorAll('.fc-circle');

        for (let index = 0; index < circle.length; index += 1) {
            circle[index].classList.remove('fc-is-active');
        }

        const index = Math.floor(this.currentPage / this.options.slidesScrolling);

        circle[index].classList.add('fc-is-active');
    }

    updateResponsive() {
        let currentBreakpoint;

        window.addEventListener('resize', () => {
            this.breakpoints.forEach((options, breakpoint) => {
                if (window.innerWidth >= breakpoint) {
                    currentBreakpoint = breakpoint;
                } else if (window.innerWidth < currentBreakpoint) {
                    currentBreakpoint = null;
                }
            });

            if (currentBreakpoint) {
                this.options = this.breakpoints[currentBreakpoint];
            }
        });
    }

    static extend(defaults, options) {
        const extended = {};

        if (defaults) {
            const keys = Object.keys(defaults);

            keys.forEach((value) => {
                if (Object.prototype.hasOwnProperty.call(defaults, value)) {
                    extended[value] = defaults[value];
                }
            });
        }

        if (options) {
            const keys = Object.keys(options);

            keys.forEach((value) => {
                if (Object.prototype.hasOwnProperty.call(options, value)) {
                    extended[value] = options[value];
                }
            });
        }

        return extended;
    }

    static suffix(index) {
        const j = index % 10;
        const k = index % 100;

        if (j === 1 && k !== 11) {
            return `${index}st`;
        }

        if (j === 2 && k !== 12) {
            return `${index}nd`;
        }

        if (j === 3 && k !== 13) {
            return `${index}rd`;
        }

        return `${index}th`;
    }
}

export default FlexCarousel;
