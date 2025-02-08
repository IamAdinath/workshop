// src/components/Header.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">MyApp</h1>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <nav className={`md:flex gap-4 ${menuOpen ? "block" : "hidden"} md:block`}>
          <Link to="/" className="block p-2">Home</Link>
          <Link to="/about" className="block p-2">About</Link>
          <Link to="/contact" className="block p-2">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
