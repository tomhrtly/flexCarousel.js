export default function (fc, position) {
    fc._selector.querySelector('.fc-slides').style.transform = `translate3d(${Math.ceil(position)}px, 0px, 0px)`;
}
