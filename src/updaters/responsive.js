import extend from '../utils/extend';

function destroy(fc) {
    fc._selector.querySelectorAll('.fc-slide.fc-is-clone').forEach((element) => {
        fc._selector.querySelector('.fc-slides').removeChild(element);
    });

    fc._selector.querySelectorAll('.fc-slide').forEach((element) => {
        element.removeAttribute('class');
        element.removeAttribute('style');
    });

    fc._selector.querySelector('.fc-slides').removeAttribute('style');
    fc._selector.querySelector('.fc-slides').removeAttribute('class');

    if (fc._options.circles) {
        fc._selector.querySelector('.fc-container').removeChild(fc._selector.querySelector('.fc-circles'));
    }

    fc._selector.innerHTML = fc._selector.querySelector('.fc-container').innerHTML;

    fc._selector.className = fc._selectorName.replace('.', '');
    fc._selector.removeAttribute('style');
}

function reinit(fc, options = {}) {
    destroy(fc);
    fc._options = extend(fc._defaults, options);
    fc._init();
    fc._selector.dispatchEvent(fc._events.breakpoint);
}

export default function (fc) {
    const original = fc._options;

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
        reinit(fc, original);
    }
}
