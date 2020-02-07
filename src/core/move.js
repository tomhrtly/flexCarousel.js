import arrows from '../updaters/arrows';
import circles from '../updaters/circles';
import controller from './controller';

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
