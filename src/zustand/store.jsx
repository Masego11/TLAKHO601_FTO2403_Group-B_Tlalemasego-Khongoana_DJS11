import { create } from "zustand";

const usePodcastsStore = create((set, get) => ({
    podcasts: JSON.parse(localStorage.getItem("podcasts")) || [],
    genres: JSON.parse(localStorage.getItem("genres")) || [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    shows: [],
    currentEpisode: null,
    listenedEpisodes: JSON.parse(localStorage.getItem("listenedEpisodes")) || [],
    error: null,

    // Fetches all podcasts
    fetchPodcasts: async () => {
        try {
            let podcasts = JSON.parse(localStorage.getItem('podcasts'));
            if (!podcasts || podcasts.length === 0) {
                const response = await fetch('https://podcast-api.netlify.app');
                podcasts = await response.json();
                podcasts.sort((a, b) => a.title.localeCompare(b.title));
                localStorage.setItem("podcasts", JSON.stringify(podcasts));
            }
            set({ podcasts, error: null });
        } catch (error) {
            set({ podcasts: null, error });
            console.error("Error fetching podcasts", error);
        }
    },

    // Fetch genre details by ID
    fetchGenresById: async (ids) => {
        try {
            const responses = await Promise.all(
                ids.map(id => fetch(`https://podcast-api.netlify.app/genre/${id}`))
            );
            responses.forEach(response => {
                if (!response.ok) {
                    throw new Error(`Error fetching genre: ${response.statusText}`);
                }
            });
            const genresData = await Promise.all(responses.map(response => response.json()));
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

    // Method to set the current episode
    setCurrentEpisode: (episode) => {
        set((state) => {
            const updatedListened = [...state.listenedEpisodes, episode.id];
            localStorage.setItem("listenedEpisodes", JSON.stringify(updatedListened));
            return { currentEpisode: episode, listenedEpisodes: updatedListened };
        });
    },

    // Add favorite function
    addFavorite: (show) => {
        const { favorites } = get();
        const existingFavorite = favorites.find(fav => fav.id === show.id && fav.showId === show.showId && fav.seasonId === show.seasonId);
        if (!existingFavorite) {
            const updatedFavorites = [...favorites, { ...show, addedAt: new Date().toISOString() }];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            set({ favorites: updatedFavorites });
        }
    },

    // Remove favorite function
    removeFavorite: (id) => {
        const { favorites } = get();
        const updatedFavorites = favorites.filter(fav => fav.id !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        set({ favorites: updatedFavorites });
    },

    // Checks if show is in favorites
    isFavorite: (id) => {
        const { favorites } = get();
        return favorites.some(fav => fav.id === id);
    },

    // Clear all listening history
    resetListeningHistory: () => {
        localStorage.removeItem("listenedEpisodes");
        set({ listenedEpisodes: [] });
    },
}));

export default usePodcastsStore;