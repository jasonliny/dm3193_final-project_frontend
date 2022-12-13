import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../components/Header";
import PagePost from "../components/PagePost";

const queryData = async (app, uid) => {
  if (!app) return [];
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "posts"));
  const data = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().userId === uid) {
      data.push(doc.data());
    }
  });
  return data;
};

function UserPostsPage({
  app,
  isLoading,
  isLoggedIn,
  setIsLoggedIn,
  setUserInformation,
}) {
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const uid = useParams().id;

  useEffect(() => {
    if (!isLoggedIn && !isLoading) navigate("/login");
  }, [isLoading, isLoggedIn, navigate]);

  useEffect(() => {
    if (!app) return;
    queryData(app, uid).then(setPostData);
  }, [app, uid]);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUserInformation={setUserInformation}
      />
      <div className="PageWrapper">
        <h1>UID: {uid}</h1>
        <h2>Posts</h2>
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
export default UserPostsPage;
