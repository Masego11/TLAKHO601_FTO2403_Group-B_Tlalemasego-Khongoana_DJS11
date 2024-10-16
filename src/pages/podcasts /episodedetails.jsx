import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePodcastsStore from "../../zustand/store";

const Episodes = () => {
    const { id, seasonId } = useParams();
    const { fetchShow, addFavorite, removeFavorite, isFavorite, setCurrentEpisode, listenedEpisodes } = usePodcastsStore();
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

    const handleFavoriteToggle = (episode) => {
        const currentStatus = favoriteStatuses[episode.episode];
        if (currentStatus) {
            removeFavorite(episode.episode);
        } else {
            addFavorite({
                id: episode.episode,
                title: episode.title,
                showId: id,
                seasonId: seasonId,
            });
        }
        setFavoriteStatuses((prev) => ({
            ...prev,
            [episode.episode]: !currentStatus,
        }));
    };

    const handlePlayEpisode = (episode) => {
        setCurrentEpisode(episode);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="episode-container">
            <h1>{seasonTitle}</h1>
            <img src={seasonImage} className="episode-image" alt={seasonTitle} />
            <ul className="episode-title">
                {episodes.map((episode) => (
                    <li key={episode.episode} className={listenedEpisodes.includes(episode.episode) ? "listened" : ""}>
                        <h2>{episode.title}</h2>
                        <p>{episode.description}</p>
                        <button onClick={() => handlePlayEpisode(episode)}>Play Episode</button>
                        <button onClick={() => handleFavoriteToggle(episode)}>
                            {favoriteStatuses[episode.episode] ? "Unfavorite" : "Favorite"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Episodes;