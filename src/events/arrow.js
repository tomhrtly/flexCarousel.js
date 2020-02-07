export default function (instance) {
    const nextButton = instance._options.appendArrows.querySelector('.fc-next');
    const prevButton = instance._options.appendArrows.querySelector('.fc-prev');

    nextButton.addEventListener('click', () => {
        instance._movePage('next');
    });

    prevButton.addEventListener('click', () => {
        instance._movePage('previous');
    });
}
