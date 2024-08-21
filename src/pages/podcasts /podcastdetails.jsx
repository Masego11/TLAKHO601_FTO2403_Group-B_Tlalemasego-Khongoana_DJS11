import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePodcastsStore from "../../zustand/store";


function PodcastDetails() {

    const { id } = useParams();
    // function from store
    const { fetchShow, addFavorite, removeFavorite, isFavorite} = usePodcastsStore();
    const [ podcast, setPodcast] = useState(null); 
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [favoriteStatus, setFavoriteStatus] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // fetch product and update state of product
          const result = await fetchShow(id);
          setPodcast(result);
        } catch (error) {
          console.log("error fetching", error);
        }
      };
      // call function to initiate fetch
      fetchData();
      // rerun useEffect if productId or fetchSinglePrdocut changes
    }, [id, fetchShow]);

    //Check if the podcast is already a favorite when data loads 
    useEffect(() => {
        if (podcast) {
            setFavoriteStatus(isFavorite(id)); //Sets favorite status based on zustand store 
        }
    }, [ podcast, id, isFavorite]);

    //Function to toggle favorite status
    const toggleFavorite = () => {
        if (favoriteStatus) {
            removeFavorite(id);  // Remove from favorites
        } else {
            addFavorite(podcast);  // Add to favorites
        }
        setFavoriteStatus(!favoriteStatus);  // Update local state
    };   

    const handleSeasonChange = (e) => {
        const selectedSeasonId = e.target.value;
        const season = podcast?.seasons?.find((s) => String(s.id) === String(selectedSeasonId)); // Convert to strings for comparison
        setSelectedSeason(season);
    };

    return (
        <div className="podcast-detail-container">
            {/* Back button to podcasts */}
        <Link to="/" className="back-button">
               &larr; Back to podcasts
           </Link>

           {/*Podcast details */}
       {podcast ? (
           <div className="podcast-detail">
                <h2>{podcast.title}</h2>
                <img src={podcast.image} alt={podcast.title} />
                <p>Last updated: {new Date(podcast.updatedAt).toLocaleDateString()}</p>
                <p>{podcast.seasons?.length || 0 } Seasons</p>
                    {selectedSeason && <p>{selectedSeason.episodes?.length || 0 } Episodes</p>}

                 {/* Favorite Button */}
                 <button onClick={toggleFavorite}>
                        {favoriteStatus ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>

                {/* Seasons Selection */}
                <h2>Seasons</h2>
                <select onChange={handleSeasonChange} defaultValue="">
                        <option value="" disabled>
                            Select a season
                        </option>
                        {podcast.seasons?.map((season) => (
                            <option key={season.id} value={season.id}>
                                {season.title}
                            </option>
                        ))}
                    </select>

                 {/* Season Details */}
                 {selectedSeason && (
                        <div className="season-details">
                            <h3>Episodes in {selectedSeason.title}</h3>
                            <ul>
                                {selectedSeason.episodes?.map((episode) => (
                                    <li key={episode.id}>
                                        {episode.title}
                                        {/* Audio Player for Each Episode */}
                                        <audio controls>
                                            <source src="placeholder-audio.mp3" type="audio/mp3" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Persistent Audio Player */}
                    <audio controls className="persistent-audio-player">
                        <source src="placeholder-audio.mp3" type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                <button className="link-button">listen to this podcast</button>
           </div>
       ) : <h2>Loading...</h2>}
   </div>
        
    )
}
//Exporting home component
export default PodcastDetails
