import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import usePodcastsStore from '../../zustand/store'; 

const GenreDetails = () => {
  const { id } = useParams();
  const { genres, fetchGenresById, error } = usePodcastsStore((state) => ({
    genres: state.genres,
    fetchGenresById: state.fetchGenresById,
    error: state.error,
  }));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!genres[id]) {
      fetchGenresById([id]).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, genres, fetchGenresById]);

  const genre = genres[id];

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  if (!genre) {
    return <h1>No genre found</h1>;
  }

  return (
    <section>
      <Link to="" relative="path" className="back-button">
        &larr; <span>Back to all genres</span>
      </Link>
      <div className="genre-detail-layout-container">
        <div className="genre-detail">
          <div className="genre-detail-info-text">
            <h3>{genre.title}</h3>
            <p>{genre.description}</p>
          </div>
        </div>
        <h3>Shows</h3>
        {genre.shows && genre.shows.length > 0 ? (
          <ul>
            {genre.shows.map((showId) => (
              <li key={showId}>
                <Link to={`/podcast/${showId}`}>Show ID: {showId}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No shows available for this genre.</p>
        )}
      </div>
    </section>
  );
};

export default GenreDetails;