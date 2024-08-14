//THE home component is an entry point to the website 
import { Link } from "react-router-dom";

//Function returning Headline and description content 
function Home() {
    return (
        <div className="home-container">
          <h1>Check our great collection of podcasts </h1>
          <p>Find the relevent podcasts for your needs. We are the place and we will sort you out</p>
          <Link to="podcasts">Find your podcast</Link> 
        </div>
        
    )
}
//Exporting home component
export default Home
