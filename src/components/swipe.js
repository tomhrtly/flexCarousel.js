import leftPage from '../core/leftPage';
import transform from '../core/transform';
import movePage from '../core/move';

let active = false;

function direction(fc) {
    const xDist = fc._touch.startX - fc._touch.curX;
    const yDist = fc._touch.startY - fc._touch.curY;
    let swipeAngle = Math.round((Math.atan2(yDist, xDist) * 180) / Math.PI);

    if (swipeAngle < 0) {
        swipeAngle = 360 - Math.abs(swipeAngle);
    }

    if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
        return 'left';
    }

    if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
        return 'left';
    }

    if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
        return 'right';
    }

    return true;
}

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

    return true;
}

function move(fc, event) {
    set(fc, event);

    fc._touch.swipeLength = Math.round(Math.sqrt((fc._touch.curX - fc._touch.startX) ** 2));

    if (fc._touch.swipeLength) {
        event.preventDefault();
    }

    transform(fc, leftPage(fc, fc._currentPage) + fc._touch.swipeLength * (fc._touch.curX > fc._touch.startX ? 1 : -1));
    return true;
}

function end(fc) {
    if (fc._touch.swipeLength >= fc._touch.minSwipe) {
        if (direction() === 'left' || direction() === 'down') {
            movePage(fc, 3);
        } else if (direction() === 'right' || direction() === 'up') {
            movePage(fc, 2);
        }
    } else if (fc._touch.startX !== fc._touch.curX) {
        movePage(fc, fc._currentPage);
    }

    fc._touch = {};
    return true;
}

function swipe(fc, event) {
    fc._touch.fingers = event.touches !== undefined ? event.touches.length : 1;
    fc._touch.minSwipe = fc._selector.querySelector('.fc-slides').offsetWidth / fc._options.touchThreshold;

    if (event.type === 'touchstart' || event.type === 'mousedown') {
        active = true;

        if (active) {
            start(fc, event);
        }
    } else if ((event.type === 'touchmove' || event.type === 'mousemove') && active) {
        move(fc, event);
    } else if ((event.type === 'touchcancel' || event.type === 'mouseleave') && active) {
        end(fc);
        active = false;
    }
}

export default function (fc) {
    if (fc._options.swipe) {
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
            fc._selector.querySelector('.fc-container').addEventListener(element, (event) => {
                swipe(fc, event);
            });
        });
    }
}
