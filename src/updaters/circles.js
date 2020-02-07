export default function (fc) {
    const circles = fc._selector.querySelector('.fc-container').querySelectorAll('.fc-circle');

    for (let index = 0; index < circles.length; index += 1) {
        circles[index].classList.remove('fc-is-active');
    }

    const index = Math.floor(fc._currentPage / fc._options.slidesScrolling);

    circles[index].classList.add('fc-is-active');
}
