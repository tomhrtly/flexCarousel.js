import events from '../events/arrow';
import update from '../updaters/arrows';

export default function (instance) {
    const slides = instance._selector.querySelector('.fc-slides');
    const slide = slides.querySelectorAll('.fc-slide');

    if (instance._options.arrows) {
        if (instance._options.slidesPerPage < slide.length) {
            instance._selector.classList.add('fc-has-arrows');

            const nextButton = document.createElement('button');
            nextButton.classList.add('fc-next');
            nextButton.setAttribute('aria-label', 'Next');
            nextButton.innerHTML = `<span class="fc-is-sr-only">Next</span><span class="fc-icon">${instance._options.nextButton}</span>`;

            const prevButton = document.createElement('button');
            prevButton.classList.add('fc-prev');
            prevButton.setAttribute('aria-label', 'Previous');
            prevButton.innerHTML = `<span class="fc-is-sr-only">Previous</span><span class="fc-icon">${instance._options.prevButton}</span>`;

            instance._options.appendArrows.appendChild(nextButton);
            instance._options.appendArrows.insertBefore(prevButton, instance._options.appendArrows.firstChild);

            if (instance._options.arrowsOverlay) {
                instance._selector.classList.add('fc-has-arrows-overlay');
            }

            events(instance);
            update(instance);
        }
    }
}
