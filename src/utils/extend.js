export default function (obj1, obj2) {
    const extended = {};

    if (obj1) {
        const keys = Object.keys(obj1);

        keys.forEach((value) => {
            if (Object.prototype.hasOwnProperty.call(obj1, value)) {
                extended[value] = obj1[value];
            }
        });
    }

    if (obj2) {
        const keys = Object.keys(obj2);

        keys.forEach((value) => {
            if (Object.prototype.hasOwnProperty.call(obj2, value)) {
                extended[value] = obj2[value];
            }
        });
    }

    return extended;
}
