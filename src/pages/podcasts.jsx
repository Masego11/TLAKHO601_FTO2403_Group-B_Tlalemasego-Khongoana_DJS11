import { useEffect } from "react";
import { Link } from "react-router-dom";
import useProductsStore from "../zustand/store";

function Podcasts() {
    const { podcasts, fetchPodcasts, error } = useProductsStore();

    useEffect(() => {
        if(!podcasts) {
            console.log("Fetching podcasts");
            fetchPodcasts();
        }
    }, [podcasts, fetchPodcasts]);
        if(error) {
            return <h1>An Error occured while loading podcasts: {error}</h1>;
    
}

return (
    <div>
        <h1>Podcasts</h1>
        <ul>
            {podcasts && podcasts.map((podcast) => (
            <li key={podcast.id}>
                <Link to={`/podcasts/${podcast.id}`}>{podcast.title}</Link>
            </li>
            ))}
        </ul>
    </div>
);
}

export default Podcasts