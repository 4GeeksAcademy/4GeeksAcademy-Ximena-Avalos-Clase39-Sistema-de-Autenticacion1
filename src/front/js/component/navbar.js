import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const token = localStorage.getItem('token');
	const handleLogout = () => {
	  localStorage.removeItem('token');
	  window.location.replace('/login');
	};
  
	return (
	  <nav className="navbar navbar-expand-lg navbar-light bg-light">
		<div className="container">
		  <Link to="/" className="navbar-brand">
			React Boilerplate
		  </Link>
		  <div className="ml-auto">
			{token ? (
			  <button onClick={handleLogout} className="btn btn-primary">
				Logout
			  </button>
			) : (
			  <>
				<Link to="/login" className="btn btn-primary mx-2">
				  Login
				</Link>
				<Link to="/register" className="btn btn-secondary">
				  Register
				</Link>
			  </>
			)}
		  </div>
		</div>
	  </nav>
	);
  };