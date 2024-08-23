//Creating a store for podcasts 
import { create } from "zustand";

const usePodcastsStore = create((set, get) => ({
    // initial state of store
    podcasts: JSON.parse(localStorage.getItem("podcasts")) || [],
    genres: JSON.parse(localStorage.getItem("genres")) || [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    shows: [],
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

      // Creates genres object with IDs as keys
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
    
       // Fetches show details by ID
       fetchShow: async (id) => {
        try {
            let show = JSON.parse(localStorage.getItem(`show-${id}`));
    
            if (!show) {
                const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
                if (!response.ok) throw new Error('Failed to fetch show');
                show = await response.json();
    
                localStorage.setItem(`show-${id}`, JSON.stringify(show));
            }
    
            set((state) => {
                const updatedShows = state.shows.map((s) =>
                    s.id === id ? show : s
                );
                return { shows: updatedShows.length > 0 ? updatedShows : [...state.shows, show] };
            });
    
            return show;
        } catch (error) {
            console.error("Error fetching show:", error);
            set({ error: `Failed to fetch show with ID ${id}` });
            throw error;
        }
    },

    //Add favorite function to add show to favorites array. and updates local storage 
    addFavorite: (show) => {
        const { favorites } = get();
        const existingFavorite = favorites.find(fav => fav.id === show.id && fav.showId === show.showId && fav.seasonId === show.seasonId);

        if (!existingFavorite) {
            const updatedFavorites = [
                ...favorites, 
                { ...show, addedAt: new Date().toISOString() }
            ];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            set({ favorites: updatedFavorites });
        }
    },
    //Remove favorite function to remove shows from favorites array by filtering it out using show ID
    removeFavorite: (id) => {
        const { favorites } = get();
        const updatedFavorites = favorites.filter(fav => fav.id !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        set({ favorites: updatedFavorites });
    },
    // Checks if shows is in favorites 
    isFavorite: (id) => {
        const { favorites } = get();
        return favorites.some(fav => fav.id === id);
    }

  
    }));


export default usePodcastsStore