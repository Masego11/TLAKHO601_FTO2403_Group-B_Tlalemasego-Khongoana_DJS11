//The hostlayout component sets up a navigation bar specific to the host section and renders nested routes via the Outlet component
// Imports 
import { NavLink, Outlet } from "react-router-dom";

// Active styles 
function PreviewLayout() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

// Navigation menu
    return (
        <>
        <nav className="preview-nav">
            <NavLink to="."
                end
                style={({ isActive}) => isActive ? activeStyles : null}
            >
                Genres
            </NavLink>
            <NavLink to="favorites"
                end
                style={({ isActive}) => isActive ? activeStyles : null}
            >
                Favorites 
            </NavLink>

            <NavLink to="reset"
                end
                style={({ isActive}) => isActive ? activeStyles : null}
            >
                History 
            </NavLink>

        </nav>
        <Outlet /> 
        </>
    )
}

// Exporting HostLayout component 
export default PreviewLayout