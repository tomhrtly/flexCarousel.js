import extend from '../utils/extend';
import destroy from '../core/destroy';

function reinit(fc, options = {}) {
    destroy(fc);
    fc._options = extend(fc._defaults, options);
    fc._init();
    fc._selector.dispatchEvent(fc._events.breakpoint);
}

export default function (fc) {
    let targetBreakpoint;

    fc._breakpoints.forEach((options, breakpoint) => {
        if (window.innerWidth >= breakpoint) {
            targetBreakpoint = breakpoint;
        }
    });

    if (targetBreakpoint) {
        if (fc._activeBreakpoint) {
            if (targetBreakpoint !== fc._activeBreakpoint) {
                fc._activeBreakpoint = targetBreakpoint;
                reinit(fc, fc._breakpoints[targetBreakpoint]);
            }
        } else {
            fc._activeBreakpoint = targetBreakpoint;
            reinit(fc, fc._breakpoints[targetBreakpoint]);
        }
    } else if (fc._activeBreakpoint !== null) {
        fc._activeBreakpoint = null;
        reinit(fc, fc._originalOptions);
    }
}
