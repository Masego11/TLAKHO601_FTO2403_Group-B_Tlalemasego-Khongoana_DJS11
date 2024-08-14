import { Link } from "react-router-dom";


//Displaying of page content 
 function About() {
    return (
        <div className="about-page-container">
            <div className="about-page-content">
            <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
                <p>Our mission is to enliven your road trip with the perfect travel van rental. 
                    Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉)</p>
                <p>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
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
