import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";

function FindUsersPage({
  isLoading,
  isLoggedIn,
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
      <div className="PageWrapper"></div>
    </>
  );
}
export default FindUsersPage;
