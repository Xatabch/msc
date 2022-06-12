import React, { useState } from 'react';

import usePlayer from '../../hooks/usePlayer';
import useTracks from '../../hooks/useTracks';

import styles from './styles.css';

export default function Radio() {
    const tracks = useTracks();
    const [currentTrack, setCurrentTrack] = useState('');
    const { play, pause, load, isPlay } = usePlayer();

    return (
        <div className={styles.radioPage}>
            <div className={styles.controls}>
                <div className={styles.prev} onClick={async () => {
                    const nextTrack = tracks.pop();
                    setCurrentTrack(nextTrack);
                    tracks.unshift(nextTrack);

                    await load(`http://localhost:8000/track/${nextTrack}`);
                    await play();
                }}>
                    <svg width="63" height="42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 25.33c-3.333-1.924-3.333-6.736 0-8.66L24 7.144c3.333-1.925 7.5.48 7.5 4.33v19.052c0 3.85-4.167 6.255-7.5 4.33L7.5 25.33Z" fill="#292929"/><path d="M28.5 25.33c-3.333-1.924-3.333-6.736 0-8.66L45 7.144c3.333-1.925 7.5.48 7.5 4.33v19.052c0 3.85-4.167 6.255-7.5 4.33L28.5 25.33Z" fill="#292929"/></svg>
                </div>
                { !isPlay ?
                    (<div className={styles.play} onClick={async () => {
                        let nextTrack;

                        if (!currentTrack) {
                            nextTrack = tracks.shift();
                            setCurrentTrack(nextTrack);
                            tracks.push(nextTrack);
                            await load(`http://localhost:8000/track/${nextTrack}`);
                        } else {
                            nextTrack = currentTrack;
                        }

                        await play();
                    }}>
                        <svg width="43" height="49" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.5 20.17c3.333 1.924 3.333 6.736 0 8.66L8.25 47.45c-3.333 1.924-7.5-.482-7.5-4.33V5.88c0-3.849 4.167-6.254 7.5-4.33L40.5 20.17Z" fill="#292929"/></svg>
                    </div>) : 
                    (<div className={styles.pause} onClick={async () => {
                        await pause();
                    }}>
                        <svg width="38" height="49" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="13.818" height="48.364" rx="5" fill="#292929"/><rect x="24.182" width="13.818" height="48.364" rx="5" fill="#292929"/></svg>
                    </div>)
                }
                <div className={styles.next} onClick={async () => {
                    const nextTrack = tracks.shift();
                    setCurrentTrack(nextTrack);
                    tracks.push(nextTrack);

                    await load(`http://localhost:8000/track/${nextTrack}`);
                    await play();
                }}>
                    <svg width="63" height="42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M55.5 16.67c3.333 1.924 3.333 6.736 0 8.66L39 34.856c-3.333 1.925-7.5-.48-7.5-4.33V11.474c0-3.85 4.167-6.255 7.5-4.33l16.5 9.526Z" fill="#292929"/><path d="M34.5 16.67c3.333 1.924 3.333 6.736 0 8.66L18 34.856c-3.333 1.925-7.5-.48-7.5-4.33V11.474c0-3.85 4.167-6.255 7.5-4.33l16.5 9.526Z" fill="#292929"/></svg>
                </div>
            </div>
        </div>
    )
}