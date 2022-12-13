import React from "react";

function CreatePostForm({ createPost }) {
  return (
    <form className="FormElement" onSubmit={(e) => createPost(e)}>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" required />
      <label htmlFor="pageUrl">Page URL</label>
      <input type="url" name="pageUrl" required />
      <label htmlFor="descript">Description</label>
      <input type="text" name="descript" required />

      <button type="submit">Post</button>
    </form>
  );
}

export default CreatePostForm;
