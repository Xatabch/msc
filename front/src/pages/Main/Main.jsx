import React, { useState } from 'react';
import Player from '../../components/Player/Player.jsx';

import useTracks from '../../hooks/useTracks.js';

import styles from './styles.css';

export default function Main() {
    const tracks = useTracks();
    const [ currentTrack, setCurrentTrack ] = useState('');

    return (
        <div>
            <div>
                { tracks.map((track, i) => (
                    <div className={styles.track} key={track} onClick={(e) => {
                        e.stopPropagation();
                        setCurrentTrack(e.currentTarget.getAttribute('data-name'));
                    }} data-name={track}>
                        <span className={styles.trackNumber}>{ i + 1 }</span>
                        <span className={styles.trackName}>{ track }</span>
                    </div>
                )) }
            </div>
            <Player track={currentTrack}/>
        </div>
    )
}