export default function (instance) {
    const circles = instance._selector.querySelector('.fc-container').querySelectorAll('.fc-circle');

    for (let index = 0; index < circles.length; index += 1) {
        circles[index].classList.remove('fc-is-active');
    }

    const index = Math.floor(instance._currentPage / instance._options.slidesScrolling);

    circles[index].classList.add('fc-is-active');
}
