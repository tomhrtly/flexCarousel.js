export default function (instance, position) {
    instance._selector.querySelector('.fc-slides').style.transform = `translate3d(${Math.ceil(position)}%, 0px, 0px)`;
}
