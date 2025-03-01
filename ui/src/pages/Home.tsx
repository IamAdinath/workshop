import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to SG Works</h1>
        <p>Your one-stop shop for everything.</p>
        <Link to="/shop" className="shop-button">Shop Now</Link>
      </div>
    </div>
  );
};

export default Home;
