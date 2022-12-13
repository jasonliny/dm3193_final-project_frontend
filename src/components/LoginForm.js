import React from "react";

function LoginForm({ loginUser }) {
  return (
    <form className="FormElement" onSubmit={(e) => loginUser(e)}>
      <label htmlFor="email">Email</label>
      <input type="text" name="email" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" required />

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
