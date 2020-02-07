export default function (index) {
    const j = index % 10;
    const k = index % 100;

    if (j === 1 && k !== 11) {
        return `${index}st`;
    }

    if (j === 2 && k !== 12) {
        return `${index}nd`;
    }

    if (j === 3 && k !== 13) {
        return `${index}rd`;
    }

    return `${index}th`;
}
