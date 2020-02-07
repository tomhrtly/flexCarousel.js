export default function (instance) {
    const prevButton = instance._options.appendArrows.querySelector('.fc-prev');
    const nextButton = instance._options.appendArrows.querySelector('.fc-next');

    if (!instance._options.infinite) {
        if (instance._currentPage === 0) {
            prevButton.setAttribute('disabled', 'disabled');
        } else {
            prevButton.removeAttribute('disabled');
        }

        if (instance._currentPage === instance._pageAmount - 1) {
            nextButton.setAttribute('disabled', 'disabled');
        } else {
            nextButton.removeAttribute('disabled');
        }
    }
}
