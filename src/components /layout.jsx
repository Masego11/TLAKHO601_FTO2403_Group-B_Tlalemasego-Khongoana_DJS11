//Main layout component for the app. 
// Imports
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import AudioPlayer from "./AudioPlayer";

//header tag renders 
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