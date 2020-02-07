export default function (instance) {
    let targetBreakpoint;

    instance._breakpoints.forEach((options, breakpoint) => {
        if (window.innerWidth >= breakpoint) {
            targetBreakpoint = breakpoint;
        }
    });

    if (targetBreakpoint) {
        if (instance._activeBreakpoint) {
            if (targetBreakpoint !== instance._activeBreakpoint) {
                instance._activeBreakpoint = targetBreakpoint;
                instance._reinit(instance._breakpoints[targetBreakpoint]);
            }
        } else {
            instance._activeBreakpoint = targetBreakpoint;
            instance._reinit(instance._breakpoints[targetBreakpoint]);
        }
    } else if (instance._activeBreakpoint !== null) {
        instance._activeBreakpoint = null;
        instance._reinit(instance._originalOptions);
    }
}
