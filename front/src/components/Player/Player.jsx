import React from 'react';
import usePlayer from '../../hooks/usePlayer.js';

import styles from './styles.css';

import { formatTimeFromSeconds, formatTimeFromMilliseconds } from '../../helpers/time.js';

export default function Player({ track }) {
    const url = `http://localhost:8000/track/${track}`
    const { play, pause, isPlay, duration, currentTime } = usePlayer(url);

    return (
        <div className={styles.player}>
            <div className={styles.progress}>
                <span className={styles.currentTime}>{ formatTimeFromMilliseconds(currentTime) }</span>
                <span className={styles.duration}>{ formatTimeFromSeconds(duration) }</span>
            </div>
            <div className={styles.controls}>
                { !isPlay ?
                    (<span className={styles.play} onClick={play}>
                        <svg width="24" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 14 0 27.856V.144L24 14Z" fill="#000"/></svg>
                    </span>) :
                    (<span className={styles.pause} onClick={pause}>
                        <svg width="22" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="M0 0h8v28H0zM14 0h8v28h-8z"/></svg>
                    </span>)
                }
                <h3 className={styles.trackName}>{ track }</h3>
            </div>
        </div>
    )
}