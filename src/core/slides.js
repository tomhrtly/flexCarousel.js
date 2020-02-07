import events from '../events/slide';
import transform from './transform';
import leftPage from './leftPage';

export default function (instance) {
    const ul = instance._selector.querySelector('ul');
    ul.classList.add('fc-slides');

    for (let index = 0; index < ul.children.length; index += 1) {
        ul.children[index].classList.add('fc-slide');
    }

    instance._selector.setAttribute('tabindex', '0');
    instance._selector.innerHTML = `<div class="fc-container">${instance._selector.innerHTML}</div>`;

    const slides = instance._selector.querySelector('.fc-slides');
    const allSlides = slides.querySelectorAll('.fc-slide');

    instance._pageAmount = allSlides.length;

    if (instance._options.slidesPerPage < instance._pageAmount) {
        instance._pageWidth = 100 / instance._options.slidesPerPage;

        for (let index = 0; index < instance._pageAmount; index += 1) {
            allSlides[index].style.minWidth = `${instance._pageWidth}%`;
        }

        if (instance._options.infinite) {
            const array = Array.from(allSlides);
            let prepend;
            let append;

            if (instance._options.slidesPerPage >= instance._options.slidesScrolling) {
                prepend = array.slice(instance._pageAmount - instance._options.slidesPerPage, instance._pageAmount).reverse();
                append = array.slice(0, instance._options.slidesPerPage);
            }

            for (let index = 0; index < prepend.length; index += 1) {
                const clone = prepend[index].cloneNode(true);
                clone.classList.add('fc-is-clone');
                slides.insertBefore(clone, slides.firstChild);
            }

            for (let index = 0; index < append.length; index += 1) {
                const clone = append[index].cloneNode(true);
                clone.classList.add('fc-is-clone');
                slides.appendChild(clone);
            }
        }

        transform(instance, leftPage(instance, instance._currentPage));
    }

    events(instance);
}
