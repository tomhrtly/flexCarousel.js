import transform from './transform';
import leftPage from './leftPage';

export default function (fc, target) {
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
