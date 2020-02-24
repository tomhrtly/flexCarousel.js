import events from '../events/slide';
import sizes from './sizes';
import responsive from "../updaters/responsive";

export default function (fc) {
    const ul = fc._selector.querySelector('ul');
    ul.classList.add('fc-slides');

    for (let index = 0; index < ul.children.length; index += 1) {
        ul.children[index].classList.add('fc-slide');
    }

    fc._selector.setAttribute('tabindex', '0');
    fc._selector.innerHTML = `<div class="fc-container">${fc._selector.innerHTML}</div>`;

    const slides = fc._selector.querySelector('.fc-slides');
    const allSlides = slides.querySelectorAll('.fc-slide');

    fc._pageAmount = allSlides.length;

    if (fc._options.slidesPerPage < fc._pageAmount) {
        if (fc._options.infinite) {
            const array = Array.from(allSlides);
            let prepend;
            let append;

            if (fc._options.slidesPerPage >= fc._options.slidesScrolling) {
                prepend = array.slice(fc._pageAmount - fc._options.slidesPerPage, fc._pageAmount).reverse();
                append = array.slice(0, fc._options.slidesPerPage);
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

        sizes(fc);

        let timer;

        window.addEventListener('resize', () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                sizes(fc);
            }, 500);
        });
    }

    events(fc);
}
