import event from '../events/breakpoint';
import extend from '../utils/extend';
import update from '../updaters/responsive';

export default function (instance) {
    const breakpoints = [];

    if (instance._options.responsive) {
        let previous = instance._options;

        instance._options.responsive.forEach(({ breakpoint, options }) => {
            if (!breakpoints.includes(breakpoint)) {
                breakpoints.push(breakpoint);

                instance._breakpoints[breakpoint] = extend(previous, options);
                previous = extend(previous, options);
            }
        });
    }

    event(instance);
    update(instance);
}
