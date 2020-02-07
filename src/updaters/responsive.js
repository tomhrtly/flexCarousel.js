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
                fc._reinit(fc._breakpoints[targetBreakpoint]);
            }
        } else {
            fc._activeBreakpoint = targetBreakpoint;
            fc._reinit(fc._breakpoints[targetBreakpoint]);
        }
    } else if (fc._activeBreakpoint !== null) {
        fc._activeBreakpoint = null;
        fc._reinit(fc._originalOptions);
    }
}
