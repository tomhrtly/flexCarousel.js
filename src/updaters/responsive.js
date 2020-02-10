import destroy from '../core/destroy';
import extend from '../utils/extend';

function reinit(options = {}) {
    destroy(this);
    this._options = extend(this._defaults, options);
    this._init();
    this._selector.dispatchEvent(this._customEvents.breakpoint);
}

export default function (fc) {
    fc._originalOptions = fc._options;

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
                reinit(fc._breakpoints[targetBreakpoint]);
            }
        } else {
            fc._activeBreakpoint = targetBreakpoint;
            reinit(fc._breakpoints[targetBreakpoint]);
        }
    } else if (fc._activeBreakpoint !== null) {
        fc._activeBreakpoint = null;
        reinit(fc._originalOptions);
    }
}
