import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">MyStore</div>

      {/* Desktop Navigation */}
      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/sqft-calculator" onClick={() => setMenuOpen(false)}>SQFT Calculator</Link>
      </nav>

      {/* Mobile Menu Button (Only visible on mobile) */}
      <Menu className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} />
    </header>
  );
};

export default Header;
