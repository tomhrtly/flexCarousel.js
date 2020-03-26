import update from '../updaters/responsive';

export default function (fc) {
    let timer;

    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            update(fc);
        }, 500);
    });
}
