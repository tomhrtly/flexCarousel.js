export default function (instance) {
    const circles = instance._selector.querySelector('.fc-container').querySelectorAll('.fc-circle');

    circles.forEach((element, index) => {
        element.addEventListener('click', () => instance._movePage(index));
    });
}
