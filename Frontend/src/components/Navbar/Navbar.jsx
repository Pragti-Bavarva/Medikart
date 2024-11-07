import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";
import logo from "./logon.jpeg";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="StoreName" />
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          {isLoggedIn && <Link to="/MyMedicine">My Medicine</Link>}
          <Link to="/about-us">About Us</Link>
        </div>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} className="profile-icon" />
              {/* {user && <span>{user.name}</span>} */}
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </>
        ) : (
          <Link to="/register">Register</Link>
        )}

        <Link to="/cart" className="navbar-cart">
          <FontAwesomeIcon icon={faShoppingCart} />
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
