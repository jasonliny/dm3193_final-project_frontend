import React from "react";
import { Link } from "react-router-dom";

function PagePost({ descript, pageUrl, title, userId, userName }) {
  return (
    <div className="PagePost">
      <h1>
        <a href={pageUrl}>{title}</a>
      </h1>
      <p>
        <a href={pageUrl}>{pageUrl}</a>
      </p>
      <p className="PagePostDescription">{descript}</p>
      <p className="userInfo">
        Shared By: <Link to={`/user/${userId}`}>{userName}</Link>
      </p>
    </div>
  );
}

export default PagePost;
