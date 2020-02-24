import move from '../core/move';

export default function (fc) {
    fc._options.appendArrows.querySelector('.fc-next').addEventListener('click', () => {
        move(fc, 'next');
    });

    fc._options.appendArrows.querySelector('.fc-prev').addEventListener('click', () => {
        move(fc, 'previous');
    });
}
