import { BrowserRouter,Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components /layout";
import About from "./pages/about";
import Podcasts from "./pages/podcasts /podcasts";
import GenreDetails from "./pages/preview/genredetails";
import PreviewLayout from "./components /previewlayout";
import Genres from "./pages/preview/podcastgenres";
import PodcastDetails from "./pages/podcasts /podcastdetails";
import Episodes from "./pages/podcasts /episodedetails";
import "./index.css"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="podcasts" element={<Podcasts />} />
          <Route path="podcasts/:id" element={<PodcastDetails />} />
          {/* Updated route to handle episode navigation properly */}
          <Route path="podcasts/:id/seasons/:seasonId/episodes" element={<Episodes />} />
          <Route path="about" element={<About />} />
          <Route path="preview" element={<PreviewLayout />}>
            <Route index element={<Genres />} />
            <Route path="genres/:id" element={<GenreDetails />} /> 
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
