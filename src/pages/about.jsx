import { Link } from "react-router-dom";


//Displaying of page content 
 function About() {
    return (
        <div className="about-page-container">
            <div className="about-page-content">
            <h1>Podcasts </h1>
                <p>Podcasts</p>
                <p>Podcasts </p>
            </div>
            <div className="about-page-cta">
            <h2>Youre almost there</h2>
            <Link className="link-button" to="/vans">Explore our podcasts</Link>
            </div>
        </div>
    );
}

//Exporting about component
export default About
