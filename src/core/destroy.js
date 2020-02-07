export default function (instance) {
    instance._selector.querySelectorAll('.fc-slide.fc-is-clone').forEach((element) => {
        instance._selector.querySelector('.fc-slides').removeChild(element);
    });

    instance._selector.querySelectorAll('.fc-slide').forEach((element) => {
        element.removeAttribute('class');
        element.removeAttribute('style');
    });

    instance._selector.querySelector('.fc-slides').removeAttribute('style');
    instance._selector.querySelector('.fc-slides').removeAttribute('class');

    if (instance._options.circles) {
        instance._selector.querySelector('.fc-container').removeChild(instance._selector.querySelector('.fc-circles'));
    }

    instance._selector.innerHTML = instance._selector.querySelector('.fc-container').innerHTML;

    instance._selector.className = instance._selectorName.replace('.', '');
    instance._selector.removeAttribute('style');
}
