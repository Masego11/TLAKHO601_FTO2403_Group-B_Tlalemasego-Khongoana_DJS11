//Creating a store for podcasts 
import { create } from "zustand";

const useProductsStore = create((set) => ({
    // initial state of store
    podcasts: JSON.parse(localStorage.getItem("podcasts")),
    error: null,
  

    fetchPodcasts: async() => {
        try{
            //Fetch allpodcasts
            let podcasts = JSON.parse(localStorage.getItem('podcasts'));
            if(!podcasts) {
                const response = await fetch ('https://podcast-api.netlify.app');
                podcasts = await response.json();
                //sort podcasts (A-Z)
                podcasts.sort((a, b) => a.title.localeCompare(b.title));
                localStorage.setItem("podcasts", JSON.stringify(podcasts));
                set({ podcasts, error:null}) 
            }
        } catch (error) {
            //If there's an error set podcasts to null and set error
            set({ podcasts: null, error });
            console.error("error fetching podcasts", error);
        }
    },

    //Fetch genre details by ID 
    fetchGenre: async(id) => {
        try{
            let genres = JSON.parse(localStorage.getItem('genres'));
            const genre = genres.find(g => g.id === id);

            if(!genre) {
                const response = await fetch (`https://podcast-api.netlify.app/genre/${id}`);
                const genreData = await response.json();
                genres.push(genreData);
    
                genres.sort((a, b) => a.title.localeCompare(b.title));
                localStorage.setItem("genres", JSON.stringify(genres));
                set({ genres }) 
            }
        } catch (error) {
            //If there's an error set error
            set({ error: "Failed to fetch genres" });
            console.error("error fetching genres", error);
        }
    },
    fetchShow: async (id) => {
        try {
          const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
          const showData = await response.json();
          set({ selectedShow: showData, error: null });
        } catch (error) {
          set({ error: 'Failed to fetch show' });
          console.error("Error fetching show:", error);
        }
      }
    }));


export default useProductsStore