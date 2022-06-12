import { useState, useEffect } from 'react';
let audio;

function usePlayer(src) {
    const [isPlay, setIsPlay] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        audio = document.createElement('audio');
        audio.src = src;
        audio.load();

        audio.addEventListener('durationchange', () => setDuration(audio.duration));
        audio.addEventListener('timeupdate', (e) => { setCurrentTime(e.timeStamp) });
        audio.addEventListener('play', () => setIsPlay(true));
        audio.addEventListener('pause', () => setIsPlay(false));
        audio.addEventListener('ended', () => setIsPlay(false));

        return () => {
            audio.removeEventListener('play', () => setIsPlay(true));
            audio.removeEventListener('pause', () => setIsPlay(false));
            audio.removeEventListener('ended', () => setIsPlay(false));

            audio.remove();
        }
    }, [src]);

    function play() {
        console.log(audio);
        audio.play();
    }

    function pause() {
        audio.pause();
    }

    return { play, pause, isPlay, duration, currentTime };
}

export default usePlayer;