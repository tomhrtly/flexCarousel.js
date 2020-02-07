import move from '../core/move';

export default function (fc) {
    const nextButton = fc._options.appendArrows.querySelector('.fc-next');
    const prevButton = fc._options.appendArrows.querySelector('.fc-prev');

    nextButton.addEventListener('click', () => {
        move(fc, 'next');
    });

    prevButton.addEventListener('click', () => {
        move(fc, 'previous');
    });
}
