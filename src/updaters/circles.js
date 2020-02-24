export default function (fc) {
    const circles = fc._selector.querySelector('.fc-container').querySelectorAll('.fc-circle');

    for (let index = 0; index < circles.length; index += 1) {
        circles[index].classList.remove('fc-is-active');
    }

    circles[Math.floor(fc._currentPage / fc._options.slidesScrolling)].classList.add('fc-is-active');
}
