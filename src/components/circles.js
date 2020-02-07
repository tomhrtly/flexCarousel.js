import suffix from '../utils/suffix';

export default function (instance) {
    if (instance._options.circles) {
        if (instance._options.slidesPerPage < instance._pageAmount) {
            instance._selector.classList.add('fc-has-circles');

            const circles = document.createElement('ul');
            circles.classList.add('fc-circles');

            instance._selector.querySelector('.fc-container').appendChild(circles);

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
                circles.appendChild(li);
            }

            if (instance._options.circlesOverlay) {
                instance._selector.classList.add('fc-has-circles-overlay');
            }

            instance._updateCircles();
            instance._buildCircleEvents();
        }
    }
}
