import move from '../core/move';

export default function (fc) {
    const circles = fc._selector.querySelector('.fc-container').querySelectorAll('.fc-circle');

    circles.forEach((element, index) => {
        element.addEventListener('click', () => move(fc, index));
    });
}
