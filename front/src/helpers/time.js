function formatTimeFromSeconds(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);

    return `${minutes}:${seconds}`;
}

function formatTimeFromMilliseconds(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export {
    formatTimeFromSeconds,
    formatTimeFromMilliseconds
}