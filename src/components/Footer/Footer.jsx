import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-8 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-3">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Mega Blog
          </h2>
          <p className="text-sm">
            Made by{' '}
            <span className="text-purple-400 hover:text-purple-300 transition-colors duration-300 cursor-pointer">
              Siddhant Jain
            </span>
          </p>
          <div className="flex items-center space-x-4 mt-2">
            {/* GitHub Link */}
            <a
              href="https://github.com/nytron88"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
            >
              <FaGithub size={20} />
              <span>GitHub</span>
            </a>
            <span className="text-gray-600">•</span>
            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/sidjain88tx/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
            >
              <FaLinkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
          <div className="text-sm text-gray-500 mt-4">
            © {new Date().getFullYear()} Mega Blog. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
