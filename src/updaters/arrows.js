export default function (fc) {
    const prevButton = fc._options.appendArrows.querySelector('.fc-prev');
    const nextButton = fc._options.appendArrows.querySelector('.fc-next');

    if (!fc._options.infinite) {
        if (fc._currentPage === 0) {
            prevButton.setAttribute('disabled', 'disabled');
        } else {
            prevButton.removeAttribute('disabled');
        }

        if (fc._currentPage === fc._pageAmount - 1) {
            nextButton.setAttribute('disabled', 'disabled');
        } else {
            nextButton.removeAttribute('disabled');
        }
    }
}
