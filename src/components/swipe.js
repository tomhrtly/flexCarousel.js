function start(fc, event) {
    let touches;

    if (fc._touch.fingers !== 1 || fc._pageAmount <= fc._options.slidesPerPage) {
        fc._touch = {};
        return false;
    }

    if (event.touches) {
        touches = event.touches.length;
    }

    fc._touch.startX = touches !== undefined ? touches.pageX : event.clientX;
    fc._touch.startY = touches !== undefined ? touches.pageY : event.clientY;
    fc._dragging = true;

    return true;
}

function controller(fc, event) {
    fc._touch.fingers = event.touches !== undefined ? event.touches.length : 1;
    fc._touch.minSwipe = fc._selector.querySelector('.fc-slides').offsetWidth / fc._options.touchThreshold;

    if (event.type === 'touchstart' || event.type === 'mousedown') {
        start(fc, event);
    }
}

export default function (fc) {
    if (fc._options.swipe) {
        const container = fc._selector.querySelector('.fc-container');
        const events = [
            'touchstart',
            'touchmove',
            'touchend',
            'touchcancel',
            'mousedown',
            'mousemove',
            'mouseup',
            'mouseleave',
        ];

        events.forEach((element) => {
            container.addEventListener(element, (event) => {
                controller(fc, event);
            });
        });
    }
}
