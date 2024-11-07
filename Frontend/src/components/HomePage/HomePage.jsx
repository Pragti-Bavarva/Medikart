import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import fast_del from '../../assets/fast_del.jpg'
import top_q from '../../assets/top_q.jpg'
import sup from '../../assets/24_7.jpeg'
import cta_image from '../../assets/doc.png';
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

import Categories from "../Categories/Categories";

const Homepage = () => {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchInput.value;
    if (searchQuery) {
      navigate(`/shop?search=${searchQuery}`);
    }
  };

  return (
    
    <div className="homepage">
      {/* Hero Section */}
      <div className="shop-bar">
      <Categories />
    </div>
    <section className="hero">
  <div className="hero-content">
    <h1>Discover Health, Discover You</h1>
    <p>Your trusted partner for health & wellness.</p>
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          name="searchInput"
          placeholder="Search for medicines, products..."
          className="search-bar"
        />
        <button type="submit" className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  </div>
  
  <div className="front-content">
    <img src={cta_image} alt="Join MediCart" />
  </div>
</section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Our Medical Store ?</h2>
        <div className="feature-grid">
        <div className="feature-card">
            <img src={sup} alt="24/7 Support" />
            <h3>24/7 Support</h3>
            <p>Our pharmacists are available anytime to assist you.</p>
          </div>
          <div className="feature-card">
            <img src={top_q} alt="Top Quality" />
            <h3>Top Quality</h3>
            <p>We only offer products from trusted and certified brands.</p>
          </div>
          <div className="feature-card">
            <img src={fast_del} alt="Fast Delivery" />
            <h3>Fast Delivery</h3>
            <p>Get medicines delivered to your doorstep in under 24 hours.</p>
          </div>
          
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 MediCart. Your health, our priority.</p>
        <ul>
          {/* <li onClick={() => navigate("/about-us")}>About Us</li>
          <li onClick={() => navigate("/contact")}>Contact</li> */}
          <li onClick={() => navigate("/privacy-policy")}>Privacy Policy</li>
        </ul>
      </footer>
    </div>
  );
};

export default Homepage;
