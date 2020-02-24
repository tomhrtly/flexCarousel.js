import transform from './transform';
import leftPage from './leftPage';

export default function (fc) {
    const container = fc._selector.querySelector('.fc-container').clientWidth;
    const slides = fc._selector.querySelector('.fc-slides');
    const pageAmount = slides.querySelectorAll('.fc-slide').length;

    slides.style.width = `${pageAmount * container}px`;
    fc._pageWidth = container / fc._options.slidesPerPage;

    for (let index = 0; index < pageAmount; index += 1) {
        slides.querySelectorAll('.fc-slide')[index].style.width = `${fc._pageWidth}px`;
    }

    transform(fc, leftPage(fc, fc._currentPage));
}
