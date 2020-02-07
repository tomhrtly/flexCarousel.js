import responsive from '../updaters/responsive';

export default function (fc) {
    let timer;

    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            responsive(fc);
        }, 500);
    });
}
