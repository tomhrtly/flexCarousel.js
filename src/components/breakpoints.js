import event from '../events/breakpoint';
import extend from '../utils/extend';
import update from '../updaters/responsive';

export default function (fc) {
    fc._breakpoints = [];

    const breakpoints = [];

    if (fc._options.responsive) {
        let previous = fc._options;

        fc._options.responsive.forEach(({ breakpoint, options }) => {
            if (!breakpoints.includes(breakpoint)) {
                breakpoints.push(breakpoint);

                fc._breakpoints[breakpoint] = extend(previous, options);
                previous = extend(previous, options);
            }
        });
    }

    event(fc);
    update(fc);
}
