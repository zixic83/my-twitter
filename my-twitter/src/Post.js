import React from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Post({ displayName, username, text, image, avatar }) {
  return (
    <div className="post">
      <div className="post-avatar">
        <Avatar src="https://images.unsplash.com/photo-1563306206-900cc99112fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80" />
      </div>
      <div className="post-body">
        <div className="post-header">
          <div className="post-headerText">
            <h3>大器晩成</h3>
          </div>
          <div className="post-headerDesc">
            <p>This is my first post, Hello World!</p>
          </div>
        </div>
        <img
          src="https://candybarsydney.com.au/web/image/product.template/83133/image_256/Fresh%20Touch%20Open%20Rose%20Forever%20Flower%20-%20Dusty%20Pink?unique=7f296bd"
          alt=""
        />
        <div className="post-options">
          <ChatBubbleOutlineIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
}

export default Post;
