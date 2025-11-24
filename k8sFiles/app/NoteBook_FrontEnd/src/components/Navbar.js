import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
  let location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0">
      <div className="sm:px-6">
        <div className="flex justify-between h-16 mx-3 sm:px-auto">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-10 w-auto" src="images/notebook_logo.png" alt="NoteBook logo" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className={`${location.pathname === "/login" ? "border-indigo-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                Home
              </Link>
              <Link to="/about" className={`${location.pathname === "/about" ? "border-indigo-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {!localStorage.getItem('token') ? (
              <div className="flex space-x-4">
                <Link to="/login" className={`${location.pathname === "/login" ? "bg-blue-600 text-white" : " hover:bg-blue-600 hover:text-white "} px-3 py-2 rounded-md text-sm font-medium border-2`}>
                  Login
                </Link>
                <Link to="/signup" className={`${location.pathname === "/signup" ? "bg-blue-600 text-white" : " hover:bg-blue-600 hover:text-white hover:border-0"} px-3 py-2 rounded-md text-sm font-medium border-2`}>
                  Signup
                </Link>
              </div>
            ) : (
              <button onClick={handleLogout} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-2 rounded-md text-sm font-medium">
                Logout
              </button>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className={`${location.pathname === "/" ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Home
            </Link>
            <Link to="/about" className={`${location.pathname === "/about" ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {!localStorage.getItem('token') ? (
              <div className="flex items-center px-4">
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Login</Link>
                <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Signup</Link>
              </div>
            ) : (
              <div className="flex items-center px-4">
                <button onClick={handleLogout} className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Logout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
