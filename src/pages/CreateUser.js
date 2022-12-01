import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useCallback, useState, useEffect } from "react";
import CreateUserForm from "../components/CreateUserForm";
import Header from "../components/Header";

function CreateUserPage({ isLoggedIn, setIsLoggedIn, setUserInformation }) {
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const signUpUser = useCallback(
    (e) => {
      e.preventDefault();

      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;

      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoggedIn(true);
          setUserInformation({
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
            accessToken: user.accessToken,
          });
          setErrors();
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
      <div className="PageWrapper">
        <h1>Create User</h1>
        <CreateUserForm signUpUser={signUpUser} />
        <p>{errors}</p>
      </div>
    </>
  );
}
export default CreateUserPage;
