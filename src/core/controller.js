import animate from './animate';
import leftPage from './leftPage';

export default function (instance, index) {
    let nextPage;

    if (index < 0) {
        if (instance._pageAmount % instance._options.slidesScrolling !== 0) {
            nextPage = instance._pageAmount - (instance._pageAmount % instance._options.slidesScrolling);
        } else {
            nextPage = instance._pageAmount + index;
        }
    } else if (index >= instance._pageAmount) {
        if (instance._pageAmount % instance._options.slidesScrolling !== 0) {
            nextPage = 0;
        } else {
            nextPage = index - instance._pageAmount;
        }
    } else {
        nextPage = index;
    }

    instance._currentPage = nextPage;
    animate(instance, leftPage(instance, index));
}
