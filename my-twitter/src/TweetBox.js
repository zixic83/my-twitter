import React, { useState } from "react";
import axios from "axios";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";

function TweetBox({setFetchedData}) {
  const [tweetText, setTweetText] = useState("");
  const [tweetMedia, setTweetMedia] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // content to be posted
    const tweetContent = { tweetText, tweetMedia };

    axios
      .post("http://localhost:5000/tweets", { tweetContent })
      .then((res) => {
        console.log(res.data);
        setFetchedData(res.data);
      });

    // clear form
    setTweetMedia("");
    setTweetText("");
  }

  

  return (
    <div className="tweetBox">
      <form onSubmit={handleSubmit}>
        <div className="tweetBox-input">
          <Avatar src="https://images.unsplash.com/photo-1563306206-900cc99112fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80" />
          <input
            type="text"
            placeholder="What's happening?"
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
          />
        </div>
        <input
          className="tweetBox-imageInput"
          type="text"
          placeholder="Enter image URL"
          value={tweetMedia}
          onChange={(e) => setTweetMedia(e.target.value)}
        />
        <Button className="tweetBox-button" type="submit">
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
