import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePodcastsStore from "../../zustand/store";

const Episodes = () => {
    const { id, seasonId } = useParams();
    const { fetchShow, addFavorite, removeFavorite, isFavorite, setCurrentEpisode } = usePodcastsStore();
    const [episodes, setEpisodes] = useState([]);
    const [favoriteStatuses, setFavoriteStatuses] = useState({});
    const [seasonTitle, setSeasonTitle] = useState("");
    const [seasonImage, setSeasonImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                setLoading(true);
                const podcast = await fetchShow(id);
                const season = podcast.seasons.find((s) => s.season === Number(seasonId));
                if (season) {
                    setEpisodes(season.episodes);
                    setSeasonTitle(season.title);
                    setSeasonImage(season.image);

                    const statuses = {};
                    season.episodes.forEach((episode) => {
                        statuses[episode.episode] = isFavorite(episode.episode);
                    });
                    setFavoriteStatuses(statuses);
                } else {
                    setError("Season not found");
                }
            } catch (error) {
                console.error("Error fetching episodes:", error);
                setError("Failed to fetch episodes");
            } finally {
                setLoading(false);
            }
        };
        fetchEpisodes();
    }, [id, seasonId, fetchShow, isFavorite]);

    const toggleFavorite = (episode) => {
        const isFav = favoriteStatuses[episode.episode];
        if (isFav) {
            removeFavorite(episode.episode);
        } else {
            addFavorite({
                id: episode.episode,
                title: episode.title,
                showId: id,
                seasonId: seasonId,
                seasonTitle: seasonTitle,
            });
        }
        setFavoriteStatuses((prevStatuses) => ({
            ...prevStatuses,
            [episode.episode]: !isFav,
        }));
    };

    const handlePlayEpisode = (episode) => {
        setCurrentEpisode(episode); // Set the current episode in the global store
    };

    if (loading) {
        return <h2>Loading Episode details...</h2>;
    }
    
    if (error) {
        return <h2>Episodes not found.</h2>;
    }

    return (
        <div className="episodes-container">
            <Link to={`/podcasts/${id}`} className="back-button">Back to Show</Link>
            <h1>Episodes for {seasonTitle}</h1>
            {seasonImage && <img src={seasonImage} alt={seasonTitle} className="season-image" />} 
            {episodes.length > 0 ? (
                <ul className="episode-list">
                    {episodes.map((episode) => (
                        <li key={episode.episode} className="episode-item">
                            <h3>{episode.title}</h3>
                            <p>{episode.description}</p>
                            <button onClick={() => handlePlayEpisode(episode)}>
                                Play Episode
                            </button>
                            <button onClick={() => toggleFavorite(episode)}>
                                {favoriteStatuses[episode.episode] ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No episodes available for this season.</p>
            )}
        </div>
    );
};

export default Episodes;