import { useState, useEffect } from 'react'

export default function useTracks() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/track-list')
            .then(response => response.json())
            .then(data => {
                setTracks(data.tracks);
            });
    }, []);

    return tracks;
}