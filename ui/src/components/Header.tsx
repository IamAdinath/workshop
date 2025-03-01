import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { Menu, ShoppingCart, User } from "lucide-react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">Sg Works</div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>Search</button>
      </div>

      {/* Navigation Links */}
      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/sqft-calculator" onClick={() => setMenuOpen(false)}>SQFT Calculator</Link>
      </nav>

      {/* Cart & Account Section */}
      <div className="header-icons">
        {/* Account */}
        <div className="account">
          <User className="icon" />
          <span>Account</span>
        </div>

        {/* Cart */}
        <div className="cart">
          <ShoppingCart className="icon" />
          <span className="cart-count">2</span>
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <Menu className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} />
    </header>
  );
};

export default Header;
