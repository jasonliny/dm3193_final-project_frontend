import React from "react";
import { Link } from "react-router-dom";

function PagePost({ descript, pageURL, poster, title }) {
  return (
    <div className="PagePost">
      <h1>{title}</h1>
      <a href="" className="PagePostURL">
        {pageURL}
      </a>
      <p className="PagePostDescription">{descript}</p>
      <p>
        Shared By: <Link to="">{poster}</Link>
      </p>
    </div>
  );
}

export default PagePost;
