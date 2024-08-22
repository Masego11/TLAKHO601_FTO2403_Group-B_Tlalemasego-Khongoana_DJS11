
import React from 'react';
import usePodcastsStore from '../../zustand/store';

const FavoriteEpisodes = () => {
    const { favorites } = usePodcastsStore();

    return (
        <div>
            <h2>Favorite Episodes</h2>
            {favorites.length === 0 ? (
                <p>No favorite episodes found.</p>
            ) : (
                <ul>
                    {favorites.map((episode) => (
                        <li key={episode.id}>
                            <h3>{episode.title}</h3>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoriteEpisodes;