//The layout component provides a wrapper for the  application's pages. 
// Imports
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

// Structure of components 
function Layout() {
    return (
        <div className="site-wrapper">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

// Exporting Layout Component
export default Layout