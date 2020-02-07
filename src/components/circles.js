import suffix from '../utils/suffix';
import update from '../updaters/circles';
import event from '../events/circle';

export default function (instance) {
    if (instance._options.circles) {
        if (instance._options.slidesPerPage < instance._pageAmount) {
            instance._selector.classList.add('fc-has-circles');

            const element = document.createElement('ul');
            element.classList.add('fc-circles');

            instance._selector.querySelector('.fc-container').appendChild(element);

            const option = instance._options.slidesPerPage > instance._options.slidesScrolling ? instance._options.slidesScrolling : instance._options.slidesPerPage;
            const amount = Math.ceil(instance._pageAmount / option);

            for (let index = 0; index < amount; index += 1) {
                const li = document.createElement('li');

                const circle = document.createElement('button');
                circle.classList.add('fc-circle');
                circle.setAttribute('aria-label', `${suffix(index + 1)} page`);

                const icon = document.createElement('span');
                icon.classList.add('fc-icon', 'fc-is-circle');

                const text = document.createElement('span');
                text.classList.add('fc-is-sr-only');
                text.innerHTML = index + 1;

                circle.appendChild(icon);
                circle.appendChild(text);
                li.appendChild(circle);
                element.appendChild(li);
            }

            if (instance._options.circlesOverlay) {
                instance._selector.classList.add('fc-has-circles-overlay');
            }

            update(instance);
            event(instance);
        }
    }
}
