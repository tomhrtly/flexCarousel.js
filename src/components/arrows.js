import events from '../events/arrow';
import update from '../updaters/arrows';

export default function (fc) {
    const slides = fc._selector.querySelector('.fc-slides');
    const slide = slides.querySelectorAll('.fc-slide');

    if (fc._options.arrows) {
        if (fc._options.slidesPerPage < slide.length) {
            fc._selector.classList.add('fc-has-arrows');

            const nextButton = document.createElement('button');
            nextButton.classList.add('fc-next');
            nextButton.setAttribute('aria-label', 'Next');
            nextButton.innerHTML = `<span class="fc-is-sr-only">Next</span><span class="fc-icon">${fc._options.nextButton}</span>`;

            const prevButton = document.createElement('button');
            prevButton.classList.add('fc-prev');
            prevButton.setAttribute('aria-label', 'Previous');
            prevButton.innerHTML = `<span class="fc-is-sr-only">Previous</span><span class="fc-icon">${fc._options.prevButton}</span>`;

            fc._options.appendArrows.appendChild(nextButton);
            fc._options.appendArrows.insertBefore(prevButton, fc._options.appendArrows.firstChild);

            if (fc._options.arrowsOverlay) {
                fc._selector.classList.add('fc-has-arrows-overlay');
            }

            events(fc);
            update(fc);
        }
    }
}
