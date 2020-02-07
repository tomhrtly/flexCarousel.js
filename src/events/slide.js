import responsive from '../updaters/responsive';
import move from '../core/move';
import transform from '../core/transform';

export default function (instance) {
    window.addEventListener('orientationchange', () => {
        responsive(instance);
        transform(instance);
    });

    instance._selector.onfocus = () => {
        if (document.activeElement === instance._selector) {
            document.onkeyup = (e) => {
                if (e.key === 'ArrowRight') {
                    move(instance, 'next');
                } else if (e.key === 'ArrowLeft') {
                    move(instance, 'previous');
                }
            };
        }
    };

    instance._selector.onblur = () => {
        document.onkeyup = () => {};
    };
}
