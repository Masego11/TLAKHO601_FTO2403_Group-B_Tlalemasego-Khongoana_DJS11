//Creating a store for podcasts 
import { create } from "zustand";

const usePodcastsStore = create((set, get) => ({
    // initial state of store
    podcasts: JSON.parse(localStorage.getItem("podcasts")) || [],
    genres: JSON.parse(localStorage.getItem("genres")) || [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    error: null,
  
    //Fetches all podcasts
    fetchPodcasts: async() => {
        try{
            let podcasts = JSON.parse(localStorage.getItem('podcasts'));

            if(!podcasts || podcasts.length === 0) {
                const response = await fetch ('https://podcast-api.netlify.app');
                podcasts = await response.json();
                //sort podcasts in alphabetical order
                podcasts.sort((a, b) => a.title.localeCompare(b.title));
                localStorage.setItem("podcasts", JSON.stringify(podcasts));
            }
            set({ podcasts, error:null}) 
        } catch (error) {
            //If there's an error set podcasts to null and set error
            set({ podcasts: null, error });
            console.error("error fetching podcasts", error);
        }
    },

 
 // Fetch genre details by ID
 fetchGenresById: async (ids) => {
    try {
      // Fetch genres concurrently
      const responses = await Promise.all(
        ids.map(id => fetch(`https://podcast-api.netlify.app/genre/${id}`))
      );

      // Check if all responses are ok
      responses.forEach(response => {
        if (!response.ok) {
          throw new Error(`Error fetching genre: ${response.statusText}`);
        }
      });

      // Parse responses as JSON
      const genresData = await Promise.all(responses.map(response => response.json()));

      // Create a genres object with IDs as keys
      const genresObject = genresData.reduce((acc, genre) => {
        acc[genre.id] = genre;
        return acc;
      }, {});

      localStorage.setItem("genres", JSON.stringify(genresObject));
      set({ genres: genresObject, error: null });
    } catch (error) {
      set({ error: "Failed to fetch genres" });
      console.error("Error fetching genres", error);
    }
  },
    
    // back buttons
   
       // Fetches show details by ID
       fetchShow: async (id) => {
        try {
            const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching show: ", error);
        }
    },

    //Add favorite function to add podcasts to favorites array. and updates local storage 
    addFavorite: (podcast) => {
        const { favorites } = get();
        if (!favorites.find(fav => fav.id === podcast.id)) {
            const updatedFavorites = [...favorites, podcast];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            set({ favorites: updatedFavorites });
        }
    },
    //Remove favorite function to remove podcasts from favorites array by filtering it out using podcast ID
    removeFavorite: (id) => {
        const { favorites } = get();
        const updatedFavorites = favorites.filter(fav => fav.id !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        set({ favorites: updatedFavorites });
    },
    // Checks if podcast is in favorites 
    isFavorite: (id) => {
        const { favorites } = get();
        return favorites.some(fav => fav.id === id);
    }

  
    }));


export default usePodcastsStore