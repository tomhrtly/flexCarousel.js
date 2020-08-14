export default function (fc, position) {
    fc._selector.querySelector('.fc-slides').style.transform = `translate3d(${position}%, 0px, 0px)`;
}
