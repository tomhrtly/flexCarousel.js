export default function (instance, index) {
    let slideOffset;

    if (instance._options.slidesPerPage < instance._pageAmount) {
        if (instance._options.slidesPerPage >= instance._options.slidesScrolling) {
            slideOffset = (instance._pageWidth * instance._options.slidesPerPage) * -1;
        }

        if (!instance._options.infinite) {
            slideOffset = 0;
        }
    }

    return ((index * instance._pageWidth) * -1) + slideOffset;
}
