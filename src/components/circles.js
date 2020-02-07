import suffix from '../utils/suffix';
import update from '../updaters/circles';
import event from '../events/circle';

export default function (fc) {
    if (fc._options.circles) {
        if (fc._options.slidesPerPage < fc._pageAmount) {
            fc._selector.classList.add('fc-has-circles');

            const element = document.createElement('ul');
            element.classList.add('fc-circles');

            fc._selector.querySelector('.fc-container').appendChild(element);

            const option = fc._options.slidesPerPage > fc._options.slidesScrolling ? fc._options.slidesScrolling : fc._options.slidesPerPage;
            const amount = Math.ceil(fc._pageAmount / option);

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

            if (fc._options.circlesOverlay) {
                fc._selector.classList.add('fc-has-circles-overlay');
            }

            update(fc);
            event(fc);
        }
    }
}
