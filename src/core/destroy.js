export default function (fc) {
    fc._selector.querySelectorAll('.fc-slide.fc-is-clone').forEach((element) => {
        fc._selector.querySelector('.fc-slides').removeChild(element);
    });

    fc._selector.querySelectorAll('.fc-slide').forEach((element) => {
        element.removeAttribute('class');
        element.removeAttribute('style');
    });

    fc._selector.querySelector('.fc-slides').removeAttribute('style');
    fc._selector.querySelector('.fc-slides').removeAttribute('class');

    if (fc._options.circles) {
        fc._selector.querySelector('.fc-container').removeChild(fc._selector.querySelector('.fc-circles'));
    }

    fc._selector.innerHTML = fc._selector.querySelector('.fc-container').innerHTML;

    fc._selector.className = fc._selectorName.replace('.', '');
    fc._selector.removeAttribute('style');
    fc._selector.removeAttribute('tabindex');
}
