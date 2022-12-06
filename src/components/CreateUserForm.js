import React from "react";

function CreateUserForm({ signUpUser }) {
  return (
    <form className="FormElement" onSubmit={(e) => signUpUser(e)}>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" required />
      <label htmlFor="email">Email</label>
      <input type="email" name="email" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" required />

      <button type="submit">Register</button>
    </form>
  );
}

export default CreateUserForm;
