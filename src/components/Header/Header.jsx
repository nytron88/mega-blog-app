import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderBtn from './HeaderBtn';
import LogoutBtn from './LogoutBtn';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector(state => state.auth.isAuthenticated);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Public Posts",
      slug: "/public-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-gradient-to-r from-gray-900 to-black text-gray-100 py-4 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent hover:from-purple-400 hover:to-blue-400 transition-all duration-300">
                Mega Blog
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              item.active && (
                <Link
                  key={index}
                  to={item.slug}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {item.name}
                </Link>
              )
            ))}
            {authStatus ? (
              <LogoutBtn className="px-4 py-2" />
            ) : (
              <HeaderBtn name="Signup" slug="/signup" className="px-4 py-2" />
            )}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden flex flex-col space-y-2">
            {navItems.map((item, index) => (
              item.active && (
                <Link
                  key={index}
                  to={item.slug}
                  className="block px-2 py-2 text-gray-300 hover:text-white transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            <div className="mt-2">
              {authStatus ? (
                <LogoutBtn className="w-full justify-start px-2" />
              ) : (
                <HeaderBtn name="Signup" slug="/signup" className="w-full justify-start px-2" />
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
