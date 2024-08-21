import { useState } from "react";
import usePodcastsStore from "../zustand/store";

//Fetch genres by ID
function Genres() {
  const { fetchGenresById } = usePodcastsStore();
  const [selectedGenre, setSelectedGenre] = useState(null);

  const genreIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleGenreClick = async (id) => {
    const genre = await fetchGenresById(id);
    setSelectedGenre(genre);
  };

  return (
    <div className="genres-list">
      <h2>Genres</h2>
      <ul>
        {genreIds.map((id) => (
          <li key={id} className="genre-item">
            <button onClick={() => handleGenreClick(id)}>Genre {id}</button>
          </li>
        ))}
      </ul>

      {selectedGenre && (
        <div className="selected-genre">
          <h3>{selectedGenre.title}</h3>
          {/* Display additional genre details here */}
        </div>
      )}
    </div>
  );
}

export default Genres;
