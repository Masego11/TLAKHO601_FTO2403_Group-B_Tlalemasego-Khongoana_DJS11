import { BrowserRouter,Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components /layout";
import Podcasts from "./pages/podcasts /podcasts";
import GenreDetails from "./pages/preview/genredetails";
import PreviewLayout from "./components /previewlayout";
import Genres from "./pages/preview/podcastgenres";
import PodcastDetails from "./pages/podcasts /podcastdetails";
import Episodes from "./pages/podcasts /episodedetails";
import FavoriteEpisodes from "./pages/podcasts /favorites";
import ResetHistory from "./components /ResetHistory";
import "./index.css"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="podcasts" element={<Podcasts />} />
          <Route path="podcasts/:id" element={<PodcastDetails />} />
          <Route path="podcasts/:id/seasons/:seasonId/episodes" element={<Episodes />} />
          <Route path="preview" element={<PreviewLayout />}>
            <Route index element={<Genres />} />
            <Route path="genres/:id" element={<GenreDetails />} />
            <Route path="favorites" element={<FavoriteEpisodes />} />
            <Route path="reset" element={<ResetHistory />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
