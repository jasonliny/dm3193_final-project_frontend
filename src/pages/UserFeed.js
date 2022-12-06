import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import PagePost from "../components/PagePost";

function UserFeed({
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
      <div className="PageWrapper">
        <h1>Feed</h1>
        <div className="PagePostsWrapper">
          <PagePost />
          <PagePost />
          <PagePost />
          <PagePost />
          <PagePost />
        </div>
      </div>
    </>
  );
}
export default UserFeed;
