import responsive from '../updaters/responsive';

export default function (instance) {
    let timer;

    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            responsive(instance);
        }, 500);
    });
}
