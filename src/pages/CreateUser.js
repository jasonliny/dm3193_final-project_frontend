import { useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import React, { useCallback, useState, useEffect } from "react";
import CreateUserForm from "../components/CreateUserForm";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function CreateUserPage({ isLoggedIn, setIsLoggedIn, setUserInformation }) {
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/user/0");
  }, [isLoggedIn, navigate]);

  const signUpUser = useCallback(
    (e) => {
      e.preventDefault();

      if (!e.currentTarget) return;
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      const username = e.currentTarget.username.value;

      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoggedIn(true);

          setErrors();
          updateProfile(user, { displayName: username })
            .then(() => {
              setUserInformation({
                email: user.email,
                displayName: username,
                uid: user.uid,
                accessToken: user.accessToken,
              });
            })
            .catch((error) => {
              const errorCode = error;
              const errorMessage = error.message;
              console.warn({ error, errorCode, errorMessage });
              setErrors(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error;
          const errorMessage = error.message;
          console.warn({ error, errorCode, errorMessage });
          setErrors(errorMessage);
        });
    },
    [setErrors, setIsLoggedIn, setUserInformation]
  );

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUserInformation={setUserInformation}
      />
      <div className="PageWrapper LoginWrapper">
        <h1>Create User</h1>
        <CreateUserForm signUpUser={signUpUser} />
        <p>{errors}</p>
        <p>Already have an account?</p>
        <p>
          <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}
export default CreateUserPage;
