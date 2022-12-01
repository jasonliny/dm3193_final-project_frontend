import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";

function UserProfilePage({
  isLoading,
  isLoggedIn,
  userInformation,
  setIsLoggedIn,
  setUserInformation,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || isLoading) navigate("/login");
  }, [isLoading, isLoggedIn, navigate]);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUserInformation={setUserInformation}
      />
      <div className="PageWrapper">
        <h1>User Profile</h1>
        <p>
          <strong>Display Name: </strong>
          {userInformation.displayName}
        </p>
        <p>
          <strong>Email: </strong>
          {userInformation.email}
        </p>
        <p>
          <strong>UID: </strong>
          {userInformation.uid}
        </p>
      </div>
    </>
  );
}
export default UserProfilePage;
