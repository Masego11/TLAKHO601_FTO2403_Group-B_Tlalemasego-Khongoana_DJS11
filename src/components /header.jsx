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
      <Link className="site-logo" to="/">MasegoPodcasts</Link>
      <nav>
        <NavLink to="/preview"
        style={({isActive}) => isActive ? activeStyles : null}
        >
          Preview
        </NavLink>

        <NavLink to="/about"
        style={({isActive}) => isActive ? activeStyles : null}
        >
          About
        </NavLink>

        <NavLink to="/podcasts"
        style={({isActive}) => isActive ? activeStyles : null}
        >
          Podcasts 
        </NavLink>
        <Link to="Login" className="login-link">
            <img src="/src/assets/images/avatar-icon.png" className="login-icon"/>
        </Link>
        </nav>
</header>
  )
}

// Exporting the header component 
export default Header