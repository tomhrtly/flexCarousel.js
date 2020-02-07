export default function (instance) {
    if (instance._options.height) {
        instance._selector.style.height = instance._options.height;
    }
}
