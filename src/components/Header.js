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
        {isLoggedIn && (
          <Link to="/">
            <p>Home</p>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/login">
            <p>Login</p>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/create">
            <p>Create User</p>
          </Link>
        )}
        {isLoggedIn && <p onClick={() => logout()}>Log Out</p>}
      </nav>
    </header>
  );
}

export default Header;
