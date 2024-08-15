import { BrowserRouter,Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components /layout";
import About from "./pages/about";
import Podcasts from "./pages/podcasts /podcasts";
import PreviewLayout from "./components /previewlayout";
import Dashboard from "./pages/preview/dashboard";
import PodcastDetails from "./pages/podcasts /podcastdetails";
import "./index.css"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="podcasts" element={<Podcasts />} />
        <Route path="podcasts/:id" element={<PodcastDetails />} />

        <Route path="preview" element={<PreviewLayout />}>
            <Route index element={<Dashboard />} />
           
    
        </Route>
        </Route>
      
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
