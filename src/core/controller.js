import animate from './animate';
import leftPage from './leftPage';

export default function (fc, index) {
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
