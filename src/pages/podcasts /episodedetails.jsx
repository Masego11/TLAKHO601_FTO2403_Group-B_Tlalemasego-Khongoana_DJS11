import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePodcastsStore from "../../zustand/store";

const Episodes = () => {
    const { id, seasonId } = useParams();
    const { fetchShow } = usePodcastsStore();
    const [episodes, setEpisodes] = useState([]);
    const [seasonTitle, setSeasonTitle] = useState("");
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
    }, [id, seasonId, fetchShow]);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div className="episodes-container">
            <h1>Episodes for {seasonTitle}</h1>
            {episodes.length > 0 ? (
                <ul className="episode-list">
                    {episodes.map((episode) => (
                        <li key={episode.episode} className="episode-item">
                            <h3>{episode.title}</h3>
                            <audio controls>
                                <source src="placeholder-audio.mp3" type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
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