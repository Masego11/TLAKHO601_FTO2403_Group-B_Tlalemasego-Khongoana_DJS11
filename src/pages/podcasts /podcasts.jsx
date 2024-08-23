import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePodcastsStore from "../../zustand/store";

function Podcasts() {
    const { podcasts, fetchPodcasts } = usePodcastsStore();
    const [sortOrder, setSortOrder] = useState('titleAsc'); // 'titleAsc', 'titleDesc', 'descriptionAsc', 'descriptionDesc'

    useEffect(() => {
        if (podcasts.length === 0) {
            console.log("Fetching podcasts");
            fetchPodcasts();
        }
    }, [podcasts, fetchPodcasts]);

    const sortPodcasts = (podcasts) => {
        switch (sortOrder) {
            case 'titleAsc':
                return [...podcasts].sort((a, b) => a.title.localeCompare(b.title));
            case 'titleDesc':
                return [...podcasts].sort((a, b) => b.title.localeCompare(a.title));
            case 'firtsUpdated':
                return [...podcasts].sort((a, b) => new Date(a.updated) - new Date(b.updated));
            case 'lastUpdated':
                return [...podcasts].sort((a, b) => new Date(b.updated) - new Date(a.updated));
            default:
                return podcasts;
        }
    };

    const sortedPodcasts = sortPodcasts(podcasts);

    return (
        <div className="podcast-list-container">
            <h1>Podcasts</h1>
            <div className="sort-buttons">
                <button onClick={() => setSortOrder('titleAsc')}>Sort by Title A-Z</button>
                <button onClick={() => setSortOrder('titleDesc')}>Sort by Title Z-A</button>
                <button onClick={() => setSortOrder('firstUpdated')}>Sort by First Updated</button>
                <button onClick={() => setSortOrder('lastUpdated')}>Sort by Last Updated</button>
            </div>
            <div className="podcast-list">
                {sortedPodcasts && sortedPodcasts.map((podcast) => (
                    <div key={podcast.id} className="podcast-tile">
                        <Link to={`/podcasts/${podcast.id}`}>
                            <img src={podcast.image} alt={podcast.title} />
                        </Link>
                        <h3>{podcast.title}</h3>
                        <p>Last updated: {new Date(podcast.updated).toLocaleDateString()}</p>
                        <p>{podcast.description}</p>
                        <Link to={`/podcasts/${podcast.id}`} className="link-button">Find out more</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Podcasts;
