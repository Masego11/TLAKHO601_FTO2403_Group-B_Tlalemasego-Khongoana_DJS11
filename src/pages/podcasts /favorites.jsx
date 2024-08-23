import { useState } from 'react';
import usePodcastsStore from '../../zustand/store';

const FavoriteEpisodes = () => {
    const { favorites } = usePodcastsStore();
    const [sortOrder, setSortOrder] = useState('dateDesc'); // 'dateAsc', 'titleAsc', 'titleDesc'

    const sortFavorites = (favorites) => {
        switch (sortOrder) {
            case 'dateAsc':
                return [...favorites].sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
            case 'dateDesc':
                return [...favorites].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
            case 'titleAsc':
                return [...favorites].sort((a, b) => a.title.localeCompare(b.title));
            case 'titleDesc':
                return [...favorites].sort((a, b) => b.title.localeCompare(a.title));
            default:
                return favorites;
        }
    };

    const sortedFavorites = sortFavorites(favorites);

    return (
        <div>
            <h2>Favorite Episodes</h2>
            <div className='sort-buttons'>
                <button onClick={() => setSortOrder('titleAsc')}>Sort by Title A-Z</button>
                <button onClick={() => setSortOrder('titleDesc')}>Sort by Title Z-A</button>
                <button onClick={() => setSortOrder('dateAsc')}>Sort by Earliest Added</button>
                <button onClick={() => setSortOrder('dateDesc')}>Sort by Latest Added</button>
            </div>
            {sortedFavorites.length === 0 ? (
                <p>No favorite episodes found.</p>
            ) : (
                sortedFavorites.map((episode) => (
                    <div key={episode.id}>
                        <h3>{episode.title}</h3>
                        <p>Show: {episode.seasonTitle} (Season {episode.seasonId})</p>
                        <p>Added on: {new Date(episode.addedAt).toLocaleString()}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default FavoriteEpisodes;