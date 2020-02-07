export default function (instance) {
    instance._autoplayDirection = 'right';
    instance._autoplayTimer = null;

    let pause = false;
    let slide;

    document.addEventListener('visibilitychange', () => {
        pause = document.visibilityState !== 'visible';
    });

    if (instance._autoplayTimer) {
        clearInterval(instance._autoplayTimer);
    }

    if (instance._options.autoplay) {
        instance._autoplayTimer = setInterval(() => {
            if (!pause) {
                if (!instance._options.infinite) {
                    if (instance._autoplayDirection === 'right') {
                        slide = 'next';

                        if ((instance._currentPage + 1) === (instance._pageAmount - 1)) {
                            instance._autoplayDirection = 'left';
                        }
                    } else if (instance._autoplayDirection === 'left') {
                        slide = 'previous';

                        if (instance._currentPage === 1) {
                            instance._autoplayDirection = 'right';
                        }
                    }
                } else {
                    slide = 'next';
                }
                instance._movePage(slide);
            }
        }, instance._options.autoplaySpeed);

        instance._selector.addEventListener('mouseenter', () => { pause = true; });
        instance._selector.addEventListener('mouseleave', () => { pause = false; });
        instance._selector.addEventListener('focusin', () => { pause = true; });
        instance._selector.addEventListener('focusout', () => { pause = false; });
    }
}
