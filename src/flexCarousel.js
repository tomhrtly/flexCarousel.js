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
    constructor(selector, options = null) {
        this.selector = document.querySelector(selector);

        function extend(object1, object2) {
            const extended = {};

            if (object1) {
                const object1Keys = Object.keys(object1);

                object1Keys.forEach((value) => {
                    if (Object.prototype.hasOwnProperty.call(object1, value)) {
                        extended[value] = object1[value];
                    }
                });
            }

            if (object2) {
                const object2Keys = Object.keys(object2);

                object2Keys.forEach((value) => {
                    if (Object.prototype.hasOwnProperty.call(object2, value)) {
                        extended[value] = object2[value];
                    }
                });
            }

            return extended;
        }

        this.defaults = {
            arrows: true,
            arrowsOverlay: true,
            autoplay: false,
            autoplaySpeed: 5000,
            circles: true,
            circlesOverlay: true,
            height: null,
            nextButton: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>',
            prevButton: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>',
            slidesPerPage: 1,
            slidesScrolling: 1,
            transition: 'slide',
            transitionSpeed: 250,
        };

        this.slideWidth = null;
        this.slideOffset = null;
        this.slideAmount = null;
        this.currentPage = 0;

        this.options = extend(this.defaults, options);
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

        if (this.options.autoplay) {
            setInterval(() => {
                if (!pause) {
                    this.movePage('next');
                }
            }, this.options.autoplaySpeed);

            this.selector.addEventListener('mouseenter', () => { pause = true; });
            this.selector.addEventListener('mouseleave', () => { pause = false; });
        }
    }

    buildArrowEvents() {
        const nextButton = this.selector.querySelector('.fc-next');
        const prevButton = this.selector.querySelector('.fc-prev');

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
                nextButton.classList.add('fc-next', 'fc-is-active', 'fc-button');
                nextButton.setAttribute('aria-label', 'Next');
                nextButton.innerHTML = `<span class="fc-is-sr-only">Next</span><span class="fc-icon">${this.options.nextButton}</span>`;

                // Create prev button
                const prevButton = document.createElement('button');
                prevButton.classList.add('fc-prev', 'fc-is-active', 'fc-button');
                prevButton.setAttribute('aria-label', 'Previous');
                prevButton.innerHTML = `<span class="fc-is-sr-only">Previous</span><span class="fc-icon">${this.options.prevButton}</span>`;

                // Append next arrow to the selector
                this.selector.appendChild(nextButton);

                // Prepend prev arrow to the selector
                this.selector.insertBefore(prevButton, this.selector.firstChild);

                // Add the overlay class if needed
                if (this.options.arrowsOverlay) {
                    this.selector.classList.add('fc-has-arrows-overlay');
                }

                this.buildArrowEvents();
            }
        }
    }

    buildCircleEvents() {
        const circles = this.selector.querySelectorAll('.fc-circle');

        circles.forEach((element, index) => {
            element.addEventListener('click', () => this.movePage(index));
        });
    }

    buildCircles() {
        const container = this.selector.querySelector('.fc-container');

        if (this.options.circles) {
            // Only show the arrows if there are more slides then slidesPerPage option
            if (this.options.slidesPerPage < this.slideAmount) {
                this.selector.classList.add('fc-has-circles');

                // Create circles container
                const circles = document.createElement('ul');
                circles.classList.add('fc-circles');

                // Append circles to the container
                container.appendChild(circles);

                const option = this.options.slidesPerPage > this.options.slidesScrolling ? this.options.slidesScrolling : this.options.slidesPerPage;
                const amount = Math.ceil(this.slideAmount / option);

                for (let i = 0; i < amount; i += 1) {
                    const li = document.createElement('li');

                    const circle = document.createElement('button');
                    circle.classList.add('fc-circle', 'fc-button');
                    circle.setAttribute('aria-label', `${FlexCarousel.suffix(i + 1)} page`);

                    const icon = document.createElement('span');
                    icon.classList.add('fc-icon', 'fc-is-circle');

                    const text = document.createElement('span');
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

    buildOptions() {
        if (this.options.height) {
            this.selector.style.height = this.options.height;
        }

        this.autoplay();
    }

    buildSlides() {
        const { children } = this.selector;

        children[0].classList.add('fc-slides');

        // Add the slide class to all child div elements
        for (let i = 0; i < children[0].children.length; i += 1) {
            children[0].children[i].classList.add('fc-slide');
        }

        // Wrap slides to reduce HTML markup
        this.selector.innerHTML = `<div class="fc-container">${this.selector.innerHTML}</div>`;

        const slides = this.selector.querySelector('.fc-slides');
        const allSlides = slides.querySelectorAll('.fc-slide');

        this.slideAmount = allSlides.length;

        if (this.options.slidesPerPage < this.slideAmount) {
            this.slideWidth = 100 / this.options.slidesPerPage;

            // Add the min-width CSS property to all slides
            for (let i = 0; i < this.slideAmount; i += 1) {
                allSlides[i].style.minWidth = `${this.slideWidth}%`;
            }

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

            for (let i = 0; i < prepend.length; i += 1) {
                const clone = prepend[i].cloneNode(true);
                clone.classList.add('fc-is-clone');
                slides.insertBefore(clone, slides.firstChild);
            }

            for (let i = 0; i < append.length; i += 1) {
                const clone = append[i].cloneNode(true);
                clone.classList.add('fc-is-clone');
                slides.appendChild(clone);
            }

            this.setTransform(this.getLeftPage(this.currentPage));
        }
    }

    getLeftPage(index) {
        if (this.options.slidesPerPage < this.slideAmount) {
            if (this.options.slidesPerPage >= this.options.slidesScrolling) {
                this.slideOffset = (this.slideWidth * (this.options.slidesPerPage + 1)) * -1;
            } else {
                this.slideOffset = (this.slideWidth * this.options.slidesPerPage) * -1;
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

        this.updateCircles();
    }

    removeTransition() {
        const slides = this.selector.querySelector('.fc-slides');

        if (this.options.transition === 'slide') {
            slides.style.transition = '';
        }
    }

    setTransform(position) {
        const obj = {};
        const slides = this.selector.querySelector('.fc-slides');

        obj.transform = `translate3d(${Math.ceil(position)}%, 0px, 0px)`;
        slides.style.transform = obj.transform;
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

    updateCircles() {
        const circle = this.selector.querySelectorAll('.fc-circle');

        for (let i = 0; i < circle.length; i += 1) {
            circle[i].classList.remove('fc-is-active');
        }

        const index = Math.floor(this.currentPage / this.options.slidesScrolling);

        circle[index].classList.add('fc-is-active');
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
