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
                podcasts.sort((a, b) => a.name.localeCompare(b.name));
                localStorage.setItem("podcasts", JSON.stringify(podcasts));
                set({ podcasts, error:null}) 
            }
        } catch (error) {
            //If there's an error set podcasts to null and set error
            set({ podcasts: null, error });
            console.error("error fetching podcasts", error);
        }
    },

}));

export default useProductsStore