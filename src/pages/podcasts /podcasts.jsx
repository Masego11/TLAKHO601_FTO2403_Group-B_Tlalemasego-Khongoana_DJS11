import { useEffect } from "react";
import { Link } from "react-router-dom";
import usePodcastsStore from "../../zustand/store";

function Podcasts() {
    const { podcasts, fetchPodcasts} = usePodcastsStore();

    useEffect(() => {
        if(podcasts.length === 0) {
            console.log("Fetching podcasts");
            fetchPodcasts();
        }
    }, [podcasts, fetchPodcasts]);
       

return (
    <div className="podcast-list-container">
        <h1>Podcasts</h1>
        <div className="podcast-list">
            {podcasts && podcasts.map((podcast) => (
            <div key={podcast.id} className="podcast-tile">
                <Link to={`/podcasts/${podcast.id}`}>
                <img src={podcast.image}  alt={podcast.title} />
                </Link>
                    <h3>{podcast.title}</h3>
                    <p>{podcast.description}</p>
                <Link to={`/podcasts/${podcast.id}`} className="link-button">Find out more</Link>
            
            </div>
            ))} 
     </div>
    </div>
);
}

export default Podcasts
