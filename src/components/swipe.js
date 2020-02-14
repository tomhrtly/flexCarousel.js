function set(fc, event) {
    let touches;

    if (event.touches && event.touches.length) {
        touches = event.touches;
    }

    fc._touch.curX = touches ? touches[0].pageX : event.clientX;
    fc._touch.curY = touches ? touches[0].pageY : event.clientY;
}

function start(fc, event) {
    set(fc, event);

    fc._touch.startX = fc._touch.curX;
    fc._touch.startY = fc._touch.curY;

    if (fc._touch.fingers !== 1 || fc._pageAmount <= fc._options.slidesPerPage) {
        fc._touch = {};
        return false;
    }

    fc._dragging = true;
    return true;
}

function move(fc, event) {
    if (!fc._dragging) {
        return false;
    }

    set(fc, event);

    fc._touch.swipeLength = Math.round(Math.sqrt((fc._touch.curX - fc._touch.startX) ** 2));

    if (!fc._swiping) {
        fc._scrolling = true;
        return false;
    }

    if (fc._touch.swipeLength > 4) {
        fc._swiping = true;
        event.preventDefault();
    }

    const positionOffset = (fc._touch.curX > fc._touch.startX ? 1 : -1);
    fc._touch.edgeHit = false;
}

function controller(fc, event) {
    fc._touch.fingers = event.touches !== undefined ? event.touches.length : 1;
    fc._touch.minSwipe = fc._selector.querySelector('.fc-slides').offsetWidth / fc._options.touchThreshold;

    if (event.type === 'touchstart' || event.type === 'mousedown') {
        start(fc, event);
    } else if (event.type === 'touchmove' || event.type === 'mousemove') {
        move(fc, event);
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
