import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Header from "../components/Header";
import PagePost from "../components/PagePost";

const queryData = async (app) => {
  if (!app) return [];
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "posts"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

function UserFeed({
  app,
  isLoading,
  isLoggedIn,
  setIsLoggedIn,
  setUserInformation,
}) {
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    if (!isLoggedIn && !isLoading) navigate("/login");
  }, [isLoading, isLoggedIn, navigate]);

  useEffect(() => {
    if (!app) return;
    queryData(app).then(setPostData);
  }, [app]);

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
          {postData.map((post, index) => (
            <PagePost
              descript={post.descript}
              key={index}
              pageUrl={post.pageUrl}
              title={post.title}
              userId={post.userId}
              userName={post.userName}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default UserFeed;
