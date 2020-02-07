import responsive from '../updaters/responsive';
import move from '../core/move';
import transform from '../core/transform';

export default function (fc) {
    window.addEventListener('orientationchange', () => {
        responsive(fc);
        transform(fc);
    });

    fc._selector.onfocus = () => {
        if (document.activeElement === fc._selector) {
            document.onkeyup = (e) => {
                if (e.key === 'ArrowRight') {
                    move(fc, 'next');
                } else if (e.key === 'ArrowLeft') {
                    move(fc, 'previous');
                }
            };
        }
    };

    fc._selector.onblur = () => {
        document.onkeyup = () => {};
    };
}
