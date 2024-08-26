import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import usePodcastsStore from "../../zustand/store";

const PodcastDetails = () => {
    const { id } = useParams();
    const { fetchShow, fetchGenresById, genres, error } = usePodcastsStore();
    const [podcast, setPodcast] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchShow(id);
                setPodcast(result);

                if (result.genres && Array.isArray(result.genres)) {
                    // Filter out undefined or invalid genre IDs
                    const genreIds = result.genres.filter(genre => genre && genre.id).map(genre => genre.id);
                    if (genreIds.length > 0) {
                        await fetchGenresById(genreIds);
                    }
                } else {
                    console.warn("No valid genres found for this podcast.");
                }
            } catch (error) {
                console.log("Error fetching podcast details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, fetchShow, fetchGenresById]);

    const handleSeasonChange = (e) => {
        const selectedSeasonId = e.target.value;
        navigate(`/podcasts/${id}/seasons/${selectedSeasonId}/episodes`);
    };

    if (loading) {
        return <h2>Loading podcast details...</h2>;
    }

    if (!podcast) {
        return <h2>Podcast not found.</h2>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='podcast-detail-container'>
            <Link to="/podcasts/" className="back-button">&larr; Back to podcasts</Link>
            <div className="podcast-detail">
                <h2>{podcast.title}</h2>
                <img src={podcast.image} alt={podcast.title} />
                <p>Last updated: {new Date(podcast.updated).toLocaleDateString()}</p>
                <p>{podcast.seasons?.length || 0} Seasons</p>
                <h2>Genres</h2>
<ul>
    {podcast.genres && podcast.genres.length > 0 ? (
        podcast.genres.map((genreId) => (
            <li key={genreId}>{genres[genreId]?.title || "Unknown Genre"}</li>
        ))
                 ) : (
        <li>Unknown Genre</li>
             )}     
                </ul>
                <h2>Seasons</h2>
                <select onChange={handleSeasonChange} defaultValue="">
                    <option value="" disabled>Select a season</option>
                    {podcast.seasons.map((season) => (
                        <option key={season.season} value={season.season}>
                            {season.title} ({season.episodes.length} Episodes)
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default PodcastDetails;