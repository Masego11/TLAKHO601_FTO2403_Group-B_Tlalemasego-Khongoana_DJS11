//The layout component provides a wrapper for the  application's pages. 
// Imports
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AudioPlayer from "./AudioPlayer";

function Layout() {
    

    return (
        <div className="site-wrapper">
            <Header />
            {<AudioPlayer />}
            <main>
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
}

export default Layout;