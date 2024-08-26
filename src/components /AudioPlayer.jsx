import {useRef} from "react";
import usePodcastsStore from "../zustand/store"; 


const AudioPlayer = () => {
    const { currentEpisode } = usePodcastsStore(state => ({ currentEpisode: state.currentEpisode }));
    const audioRef = useRef(null);

    if (!currentEpisode) {
        return null; // Render nothing if there's no current episode
    }
//Rendering of the componennt
    return (
        <div className="audio-player">
            <h3>Now Playing: {currentEpisode.title}</h3>
            <audio ref={audioRef} src={currentEpisode.file} controls />  
        </div>
    );
};

export default AudioPlayer;