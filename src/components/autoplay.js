export default function (fc) {
    fc._autoplayDirection = 'right';
    fc._autoplayTimer = null;

    let pause = false;
    let slide;

    document.addEventListener('visibilitychange', () => {
        pause = document.visibilityState !== 'visible';
    });

    if (fc._autoplayTimer) {
        clearInterval(fc._autoplayTimer);
    }

    if (fc._options.autoplay) {
        fc._autoplayTimer = setInterval(() => {
            if (!pause) {
                if (!fc._options.infinite) {
                    if (fc._autoplayDirection === 'right') {
                        slide = 'next';

                        if ((fc._currentPage + 1) === (fc._pageAmount - 1)) {
                            fc._autoplayDirection = 'left';
                        }
                    } else if (fc._autoplayDirection === 'left') {
                        slide = 'previous';

                        if (fc._currentPage === 1) {
                            fc._autoplayDirection = 'right';
                        }
                    }
                } else {
                    slide = 'next';
                }
                fc._movePage(slide);
            }
        }, fc._options.autoplaySpeed);

        fc._selector.addEventListener('mouseenter', () => { pause = true; });
        fc._selector.addEventListener('mouseleave', () => { pause = false; });
        fc._selector.addEventListener('focusin', () => { pause = true; });
        fc._selector.addEventListener('focusout', () => { pause = false; });
    }
}
