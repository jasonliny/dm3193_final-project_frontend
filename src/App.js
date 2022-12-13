import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import React from "react";

import "./App.css";

import CreateUserPage from "./pages/CreateUser";
import CreatePostPage from "./pages/CreatePost";
import LoginPage from "./pages/Login";
import UserProfilePage from "./pages/UserProfile";
import UserFeed from "./pages/UserFeed";
import UserPostsPage from "./pages/UserPosts";

const firebaseConfig = {
  apiKey: "AIzaSyA8-Hp-IkbvYZmmQ0vQZWqwYFmEjfRioB0",
  authDomain: "dm3193-final-project.firebaseapp.com",
  projectId: "dm3193-final-project",
  storageBucket: "dm3193-final-project.appspot.com",
  messagingSenderId: "326434315842",
  appId: "1:326434315842:web:1d95689752982616e257db",
};

function App() {
  const [appInitialized, setAppInitialized] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState({});

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setAppInitialized(app);
  }, []);

  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserInformation(user);
          setIsLoggedIn(true);
        } else {
          setUserInformation({});
          setIsLoggedIn(false);
        }
        setIsLoading(false);
      });
    }
  }, [appInitialized]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <UserFeed
          app={appInitialized}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      path: "/user/:id",
      element: (
        <UserPostsPage
          app={appInitialized}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      path: "/user/profile",
      element: (
        <UserProfilePage
          app={appInitialized}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      path: "/create",
      element: (
        <CreatePostPage
          app={appInitialized}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
          userInformation={userInformation}
        />
      ),
    },

    {
      path: "/login",
      element: (
        <LoginPage
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      path: "/register",
      element: (
        <CreateUserPage
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
