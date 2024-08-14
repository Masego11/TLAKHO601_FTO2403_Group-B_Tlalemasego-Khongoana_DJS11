import { Outlet, Navigate, useLocation } from "react-router-dom"
  
 // Function to check for authentication status and getting current location
 function AuthRequired() {
    const isLoggedIn = localStorage.getItem("loggedin")
    const location = useLocation()
    console.log(location)
    
    // Conditional rendering of app
    if (!isLoggedIn) {
        return (
            <Navigate 
                to="/login" 
                state={{
                    message: "You must log in first",
                    from: location.pathname
                }} 
                replace
            />)
    }

    return <Outlet />;//Rendering of child routes 
}

export default AuthRequired