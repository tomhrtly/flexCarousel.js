import arrows from '../updaters/arrows';
import circles from '../updaters/circles';
import controller from './controller';

export default function (instance, index) {
    const unevenOffset = (instance._pageAmount % instance._options.slidesScrolling !== 0);
    const indexOffset = unevenOffset ? 0 : (instance._pageAmount - instance._currentPage) % instance._options.slidesScrolling;

    if (index === 'previous') {
        const slideOffset = indexOffset === 0 ? instance._options.slidesScrolling : instance._options.slidesPerPage - indexOffset;

        if (instance._options.slidesPerPage < instance._pageAmount) {
            controller(instance, instance._currentPage - slideOffset);
        }
    } else if (index === 'next') {
        const slideOffset = indexOffset === 0 ? instance._options.slidesScrolling : indexOffset;

        if (instance._options.slidesPerPage < instance._pageAmount) {
            controller(instance, instance._currentPage + slideOffset);
        }
    } else {
        const page = index === 0 ? 0 : index * instance._options.slidesScrolling;
        controller(instance, page);
    }

    if (instance._options.arrows) {
        arrows(instance);
    }

    if (instance._options.circles) {
        circles(instance);
    }

    instance._selector.dispatchEvent(instance._customEvents.pageChanging);

    setTimeout(() => {
        instance._selector.dispatchEvent(instance._customEvents.pageChanged);
    }, instance._options.transitionSpeed);
}
