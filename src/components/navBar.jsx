import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../Film-icon.png";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img className="logo" src={logo} alt="Movie Logo" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse justify-content-between navbar-collapse"
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" exact to="/">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link mr-auto" to="/rentals">
            Rentals
          </NavLink>
        </div>
        {!user && (
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/register">
              Register
            </NavLink>
          </div>
        )}
        {user && (
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/profile">
              {user.name}
            </NavLink>
            <NavLink className="nav-item nav-link" to="/logout">
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
