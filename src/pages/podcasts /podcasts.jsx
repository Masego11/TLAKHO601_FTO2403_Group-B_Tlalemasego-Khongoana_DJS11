import { useEffect } from "react";
import { Link } from "react-router-dom";
import useProductsStore from "../../zustand/store";

function Podcasts() {
    const { podcasts, fetchPodcasts, error } = useProductsStore();

    useEffect(() => {
        if(!podcasts) {
            console.log("Fetching podcasts");
            fetchPodcasts();
        }
    }, [podcasts, fetchPodcasts]);
       

return (
    <div className="podcast-list-container">
        <h1>Podcasts</h1>
        {error && <p>Error: {error}</p>}
        <div className="podcast-list">
            {podcasts && podcasts.map((podcast) => (
            <div key={podcast.id} className="podcast-tile">
                <img src={podcast.imageUrl}  alt={podcast.title} />
                <div className="podcast-content-card">
                    <h2 className="podcast-card-title">{podcast.title}</h2>
                    <p className="podcast-card-description">{podcast.description}</p>
                <Link to={`/podcasts/${podcast.id}`} className="podcast-card-link">Find out more</Link>
            </div>
            </div>
            ))} 
     </div>
    </div>
);
}

export default Podcasts

