import move from '../core/move';

export default function (instance) {
    const nextButton = instance._options.appendArrows.querySelector('.fc-next');
    const prevButton = instance._options.appendArrows.querySelector('.fc-prev');

    nextButton.addEventListener('click', () => {
        move(instance, 'next');
    });

    prevButton.addEventListener('click', () => {
        move(instance, 'previous');
    });
}
