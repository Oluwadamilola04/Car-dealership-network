import React from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";
import "../../App.css";

const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin+"/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });
  
    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out "+username+"...")
    }
    else {
      alert("The user could not be logged out.")
    }
  };

  let curr_user = sessionStorage.getItem('username')

  return (
    <header className="app-header">
      <a className="brand" href="/">
        <span className="brand-mark">D</span>
        <span>
          <strong>DriveLine</strong>
          <small>Dealer Network</small>
        </span>
      </a>
      <nav className="main-nav" aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/dealers">Dealerships</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
      </nav>
      <div className="nav-actions">
        {curr_user ? (
          <>
            <span className="signed-in">{curr_user}</span>
            <a className="button button-secondary" href="/djangoapp/logout" onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <a className="button button-secondary" href="/login">Login</a>
            <a className="button button-primary" href="/register">Register</a>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
