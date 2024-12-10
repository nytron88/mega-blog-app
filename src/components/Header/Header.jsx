import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderBtn from './HeaderBtn';
import LogoutBtn from './LogoutBtn';

function Header() {

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
  ]

  return (
    <header className="bg-gradient-to-r from-gray-900 to-black text-gray-100 py-4 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent hover:from-purple-400 hover:to-blue-400 transition-all duration-300">
                Mega Blog
              </span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {navItems.map((item, index) => (
              item.active && (
                <Link to={item.slug} className='px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300' key={index}>
                  {item.name}
                </Link>
                // <a
                //   key={index}
                //   href={item.slug}
                //   className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300"
                // >
                //   {item.name}
                // </a>
              )
            ))}
            {authStatus ? (
              <LogoutBtn />
            ) : (
              <HeaderBtn name="Signup" slug="/signup"/>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;