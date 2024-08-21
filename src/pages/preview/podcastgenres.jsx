import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usePodcastsStore from '../../zustand/store'; 

const Genres = () => {
  const { genres, fetchGenresById, error } = usePodcastsStore((state) => ({
    genres: state.genres,
    fetchGenresById: state.fetchGenresById,
    error: state.error,
  }));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const genreIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
    setLoading(true);
    fetchGenresById(genreIds).finally(() => setLoading(false));
  }, [fetchGenresById]);

  const handleGenreClick = (id) => {
    navigate(`genres/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='genres-list-container'>
      <h1 className='genres-title'>Genres</h1>
      <div className='genres-list'>
        {Object.values(genres).map((genre) => (
          <div key={genre.id} className='genre-tile'>
            <Link to={`genres/${genre.id}`} className="genre-link">
              <h3>{genre.title}</h3>
              <p>{genre.description}</p>
            </Link>
            <button 
              onClick={() => handleGenreClick(genre.id)} 
              className="link-button">
              Explore {genre.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;