import React from "react";
import "./Post.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Post({ displayName, text, image, avatar }) {
  return (
    <div className="post">
      <div className="post-avatar">
        <img className="h-14 w-14 object-cover rounded-full" alt= '' src={avatar} />
      </div>
      <div className="post-body">
        <div className="post-header">
          <div className="post-headerText">
            <h3>{displayName}</h3>
          </div>
          <div className="post-headerDesc">
            <p>{text}</p>
          </div>
        </div>
        <img src={image} alt="" />
        <div className="post-options">
          <ChatBubbleOutlineIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
}

export default Post;
