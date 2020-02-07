export default function (instance) {
    window.addEventListener('orientationchange', () => {
        instance._updateResponsive();
        instance._setTransform();
    });

    instance._selector.onfocus = () => {
        if (document.activeElement === instance._selector) {
            document.onkeyup = (e) => {
                if (e.key === 'ArrowRight') {
                    instance._movePage('next');
                } else if (e.key === 'ArrowLeft') {
                    instance._movePage('previous');
                }
            };
        }
    };

    instance._selector.onblur = () => {
        document.onkeyup = () => {};
    };
}
