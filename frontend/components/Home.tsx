import { Link } from "react-router-dom";
import "../styles/home.css";


const Home = () => {
  return (
    <section id="home" className="home">
      <div className="home-content">
        <div className="home-text">
          <h1>
            Welcome to <span className="highlight">Deal</span><span className="highlight2">Finder!</span>
          </h1>
          <br></br>
          <br></br>
          <p> </p>
          <h3>Find the Best Deals in One Click!</h3>
          <div className="home-buttons">
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/signup" className="btn">
              Sign Up
            </Link>
          </div>
          <br></br>
          <br></br>
          <h2>What's <span className="highlight">Deal</span><span className="highlight2">Finder?</span></h2>
          <br></br>
          <p>DealFinder is your ultimate online companion for finding the best deals across all websites. Whether you're shopping for groceries, technology, or everyday essentials, DealFinder compares prices, highlights discounts, and ensures you never miss out on savings. Simplify your shopping experience and make smarter purchases with DealFinder!</p>
        </div>
        <div className="image-container1">
          <img src="/laptop.png" alt="Shopping deals" className="imagehome" />
        </div>
      </div>
    </section>
  );
};

export default Home;