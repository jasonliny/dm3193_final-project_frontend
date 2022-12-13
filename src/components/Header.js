import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Header({ isLoggedIn, setIsLoggedIn, setUserInformation }) {
  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserInformation({});
        setIsLoggedIn(false);
      })
      .catch((error) => console.warn(error));
  }
  return (
    <header>
      <nav>
        <span className="header-sitename">PageMark</span>
        {!isLoggedIn && (
          <p>
            <Link to="/login">Login</Link>
          </p>
        )}
        {!isLoggedIn && (
          <p>
            <Link to="/register">Create User</Link>
          </p>
        )}
        {isLoggedIn && (
          <p>
            <Link to="/">Feed</Link>
          </p>
        )}
        {isLoggedIn && (
          <p>
            <Link to="/create">Create Post</Link>
          </p>
        )}
        {isLoggedIn && (
          <p>
            <Link to="/user/profile">Profile</Link>
          </p>
        )}
        {isLoggedIn && <p onClick={() => logout()}>Log Out</p>}
      </nav>
    </header>
  );
}

export default Header;
