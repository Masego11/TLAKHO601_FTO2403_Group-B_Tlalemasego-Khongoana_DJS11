import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePodcastsStore from "../../zustand/store";


function PodcastDetails() {

    const { id } = useParams();
    // function from store
    const { fetchShow } = usePodcastsStore();
    // local state for product, zustand and useState CAN be used togetherw
    const [podcast, setPodcast] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // fetch product and update state of product
          const result = await fetchShow(id);
          setPodcast(result);
        } catch (error) {
          console.log("error fetching", error);
        }
      };
      // call function to initiate fetch
      fetchData();
      // rerun useEffect if productId or fetchSinglePrdocut changes
    }, [id, fetchShow]);

    return (
        <div className="podcast-detail-container">
        <Link to="/" className="back-button">
               &larr; Back to podcasts
           </Link>
       {podcast ? (
           <div className="podcast-detail">
               <img src={podcast.image} alt={podcast.title} />
               <h2>{podcast.title}</h2>
               <p className="podcast-season">${podcast.season} Seasons</p>
               <p>{podcast.description}</p>
               <button className="link-button">listen to this podcast</button>
           </div>
       ) : <h2>Loading...</h2>}
   </div>
        
    )
}
//Exporting home component
export default PodcastDetails
