import React, { useState } from "react";
import axios from "axios";
import "./TweetBox.css";
import { Button } from "@mui/material";
import { PhotoIcon, FaceSmileIcon } from "@heroicons/react/24/outline";

function TweetBox({ setFetchedData }) {
  const [tweetText, setTweetText] = useState("");
  const [tweetMedia, setTweetMedia] = useState("");
  const [timestamp, setTimestamp] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // content to be posted
    const tweetContent = { tweetText, tweetMedia };

    axios.post("http://localhost:5000/tweets", { tweetContent }).then((res) => {
      setFetchedData(res.data);
    });

    // clear form
    setTweetMedia("");
    setTweetText("");
  }

  return (
    <div className="tweetBox flex space-x-2 p-5">
      <img
        className="mt-4 h-14 w-14 object-cover rounded-full"
        alt=""
        src="https://images.unsplash.com/photo-1563306206-900cc99112fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80"
      />
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <input
          className="h-24 w-full outline-none placeholder:text-xl"
          type="text"
          placeholder="What's happening?"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
        />

        <input
          className="border-none outline-none"
          type="text"
          placeholder="Enter image URL"
          value={tweetMedia}
          onChange={(e) => setTweetMedia(e.target.value)}
        />
        <div className="flex items-center ">
          <div className="flex flex-1 items-center space-x-2 text-blue-300">
            <PhotoIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
            <FaceSmileIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
          </div>
          <Button disabled={!tweetText} className="tweetBox-button disabled:opacity-40" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
