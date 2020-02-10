import arrows from '../updaters/arrows';
import circles from '../updaters/circles';
import transform from './transform';
import leftPage from './leftPage';

function animate(fc, target) {
    const slides = fc._selector.querySelector('.fc-slides');

    if (fc._options.transition === 'slide') {
        slides.style.transition = `all ${fc._options.transitionSpeed}ms ease-in-out 0s`;
    }

    transform(fc, Math.ceil(target));

    new Promise((resolve) => {
        setTimeout(() => {
            if (fc._options.transition === 'slide') {
                slides.style.transition = '';
            }

            resolve(true);
        }, fc._options.transitionSpeed);
    }).then(() => transform(fc, leftPage(fc, fc._currentPage)));
}

function controller(fc, index) {
    let nextPage;

    if (index < 0) {
        if (fc._pageAmount % fc._options.slidesScrolling !== 0) {
            nextPage = fc._pageAmount - (fc._pageAmount % fc._options.slidesScrolling);
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

export default function (fc, index) {
    const unevenOffset = (fc._pageAmount % fc._options.slidesScrolling !== 0);
    const indexOffset = unevenOffset ? 0 : (fc._pageAmount - fc._currentPage) % fc._options.slidesScrolling;

    if (index === 'previous') {
        const slideOffset = indexOffset === 0 ? fc._options.slidesScrolling : fc._options.slidesPerPage - indexOffset;

        if (fc._options.slidesPerPage < fc._pageAmount) {
            controller(fc, fc._currentPage - slideOffset);
        }
    } else if (index === 'next') {
        const slideOffset = indexOffset === 0 ? fc._options.slidesScrolling : indexOffset;

        if (fc._options.slidesPerPage < fc._pageAmount) {
            controller(fc, fc._currentPage + slideOffset);
        }
    } else {
        const page = index === 0 ? 0 : index * fc._options.slidesScrolling;
        controller(fc, page);
    }

    if (fc._options.arrows) {
        arrows(fc);
    }

    if (fc._options.circles) {
        circles(fc);
    }

    fc._selector.dispatchEvent(fc._customEvents.pageChanging);

    setTimeout(() => {
        fc._selector.dispatchEvent(fc._customEvents.pageChanged);
    }, fc._options.transitionSpeed);
}
