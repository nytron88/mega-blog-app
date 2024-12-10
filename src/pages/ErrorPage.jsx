import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

const ErrorPage = () => {

  let errorMessage = 'Page not found';
  let errorCode = '404';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-6">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-purple-400 mb-2">Mega Blog</h1>
        <p className="text-xl text-gray-400">Your Ultimate Blogging Experience</p>
      </div>
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-semibold text-red-500 mb-2">Oops! Something went wrong.</h2>
        <p className="text-2xl font-bold text-gray-300 mb-4">Error {errorCode}</p>
        <p className="text-gray-300 mb-6" role="alert">
          {errorMessage}
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Back Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
