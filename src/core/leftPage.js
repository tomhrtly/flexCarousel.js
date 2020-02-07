export default function (fc, index) {
    let slideOffset;

    if (fc._options.slidesPerPage < fc._pageAmount) {
        if (fc._options.slidesPerPage >= fc._options.slidesScrolling) {
            slideOffset = (fc._pageWidth * fc._options.slidesPerPage) * -1;
        }

        if (!fc._options.infinite) {
            slideOffset = 0;
        }
    }

    return ((index * fc._pageWidth) * -1) + slideOffset;
}
