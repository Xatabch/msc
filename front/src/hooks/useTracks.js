import { useState, useEffect } from 'react'

export default function useTracks() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        fetch(`${BACKEND_HOST}/track-list`)
            .then(response => response.json())
            .then(data => {
                setTracks(data.tracks);
            });
    }, []);

    return tracks;
}