import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import usePodcastsStore from "../../zustand/store";

const PodcastDetails = () => {
    const { id } = useParams();
    const { fetchShow, addFavorite, removeFavorite, isFavorite } = usePodcastsStore();
    const [podcast, setPodcast] = useState(null);
    const [favoriteStatus, setFavoriteStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchShow(id);
                setPodcast(result);
                if (result) {
                    setFavoriteStatus(isFavorite(id));
                }
            } catch (error) {
                console.log("Error fetching podcast details:", error);
            } finally {
              setLoading(false); // Sets loading to false after fetching data
          }
        };
        fetchData();
    }, [id, fetchShow, isFavorite]);

    const toggleFavorite = () => {
        if (favoriteStatus) {
            removeFavorite(id); // Remove from favorites
        } else {
            addFavorite(podcast); // Add to favorites
        }
        setFavoriteStatus(!favoriteStatus); // Update local state
    };

    const handleSeasonChange = (e) => {
      const selectedSeasonId = e.target.value;
      // Navigate to the correct season's episodes
      navigate(`/podcasts/${id}/seasons/${selectedSeasonId}/episodes`);
  };
  // Show loading message while fetching
if (loading) {
    return <h2>Loading podcast details...</h2>; // Show loading message
}

if (!podcast) {
    return <h2>Podcast not found.</h2>;
}


    return (
        <div className='podcast-detail-container'>
            <Link to="/podcasts/" className="back-button">&larr; Back to podcasts</Link>
            <div className="podcast-detail">
                <h2>{podcast.title}</h2>
                <img src={podcast.image} alt={podcast.title} />
                <p>Last updated: {new Date(podcast.updated).toLocaleDateString()}</p>
                <p>{podcast.seasons?.length || 0} Seasons</p>

                <button onClick={toggleFavorite}>
                    {favoriteStatus ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>

                <h2>Seasons</h2>
                <select onChange={handleSeasonChange} defaultValue="">
                    <option value="" disabled>Select a season</option>
                    {podcast.seasons.map((season) => (
                        <option key={season.season} value={season.season}>
                          {/**Displaying episode count for each season */}
                            {season.title} ({season.episodes.length} Episodes)
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
     

export default PodcastDetails;