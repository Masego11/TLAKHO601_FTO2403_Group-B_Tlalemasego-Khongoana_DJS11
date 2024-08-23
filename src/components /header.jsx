//Imports 
import { Link, NavLink } from "react-router-dom";

// Active styles 
function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }
// Header structure with logo, navigation menu and logo link
  return(   
    <header>
      <Link className="site-logo" to="/">The Dynamic Podcast</Link>
      <nav>
        <NavLink to="/preview"
        style={({isActive}) => isActive ? activeStyles : null}
        >
          Preview
        </NavLink>
        <NavLink to="/podcasts"
        style={({isActive}) => isActive ? activeStyles : null}
        >
          Podcasts 
        </NavLink>
        </nav>
</header>
  )
}

// Exporting the header component 
export default Header