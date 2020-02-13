function start(fc, event) {
    let touches;

    fc._interrupted = true;

    if (fc._touch.fingers !== 1 || fc._pageAmount <= fc._options.slidesPerPage) {
        fc._touch = {};
        return false;
    }

    if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
        const [first] = event.originalEvent;
        touches = first;
    }

    fc._touch.startX = fc._touch.curX = touches !== undefined ? touches.pageX : event.clientX;
    fc._touch.startY = fc._touch.curY = touches !== undefined ? touches.pageY : event.clientY;

    fc._dragging = true;
}

function move(fc, event) {

}

function end(fc, event) {

}

function controller(fc, event) {
    fc._touch.fingers = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;
    fc._touch.minSwipe = fc._selector.querySelector('.fc-slides').offsetWidth / fc._options.touchThreshold;

    if (event === 'touchstart' || event === 'mousedown') {
        start(fc, event);
    } else if (event === 'touchmove' || event === 'mousemove') {
        move(fc, event);
    } else if (event === 'touchend' || event === 'mouseup' || event === 'touchcancel' || event === 'mouseleave') {
        end(fc, event);
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
            container.addEventListener(element, () => {
                controller(fc, element);
            });
        });
    }
}
