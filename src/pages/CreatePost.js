import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import CreatePostForm from "../components/CreatePostForm";
import { addDoc, collection, getFirestore } from "firebase/firestore";

function CreatePostPage({
  app,
  isLoading,
  isLoggedIn,
  setIsLoggedIn,
  setUserInformation,
  userInformation,
}) {
  const [postSuccessful, setPostSuccessful] = useState(false);
  const navigate = useNavigate();

  const createPost = useCallback(
    async (e) => {
      e.preventDefault();
      const db = getFirestore(app);

      const title = e.currentTarget.title.value;
      const pageUrl = e.currentTarget.pageUrl.value;
      const descript = e.currentTarget.descript.value;
      const userId = userInformation.uid;
      const userName = userInformation.displayName;

      try {
        const docRef = await addDoc(collection(db, "posts"), {
          title,
          pageUrl,
          descript,
          userId,
          userName,
        });
        console.log("Document written with ID: ", docRef.id);
        setPostSuccessful(true);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    [app, userInformation]
  );

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
      <div className="PageWrapper CreatePostWrapper">
        <CreatePostForm createPost={createPost} />
        {postSuccessful && <p>Post Submitted!</p>}
      </div>
    </>
  );
}
export default CreatePostPage;
