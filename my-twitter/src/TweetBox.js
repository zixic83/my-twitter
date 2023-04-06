import React, { useState, useRef } from "react";

import axios from "axios";
import "./TweetBox.css";
import { Button, Popover } from "@mui/material";
import {
  PhotoIcon,
  FaceSmileIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import EmojiPicker from "emoji-picker-react";

function TweetBox({  getAllTweets,setPage,setHasMore }) {
  const [tweetText, setTweetText] = useState("");
  const [tweetMedia, setTweetMedia] = useState("");
  const [anchorEmoji, setAnchorEmoji] = useState(null);
  const [tweetVideo, setTweetVideo] = useState("");
  const [toShowVIcon, setToShowVIcon] = useState(false);
  const [toShowPIcon, setToShowPIcon] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    // content to be posted
    const tweetContent = { tweetText, tweetMedia, tweetVideo };

    axios.post("http://localhost:5000/tweets", { tweetContent }).then((res) => {
      // refresh page 0
      getAllTweets();
      // reset page to 1 (to be shown after scrolling down)
      setPage(1);

      setHasMore(true);
    });

    // clear form
    setTweetMedia("");
    setTweetText("");
    setTweetVideo("");
    setToShowPIcon(false);
    setToShowVIcon(false);
  }

  const handleOpenPicker = (e) => {
    setAnchorEmoji(e.currentTarget);
  };

  const handleClosePicker = () => {
    setAnchorEmoji(null);
  };

  function onEmojiClick(emojiData, e) {
    setTweetText(tweetText + emojiData.emoji);
  }

  return (
    <div className="tweetBox flex space-x-2 p-5 ">
      <img
        className="mt-4 h-14 w-14 object-cover rounded-full"
        alt=""
        src="https://images.unsplash.com/photo-1563306206-900cc99112fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80"
      />
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <textarea
          className="h-24 w-full outline-none placeholder:text-xl resize-none "
          type="text"
          placeholder="What's happening?"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
        />

        {toShowPIcon ? (
          <input
            className="border-none outline-none"
            type="text"
            placeholder="Enter image URL"
            value={tweetMedia}
            onChange={(e) => setTweetMedia(e.target.value)}
          />
        ) : null}

        {toShowVIcon ? (
          <input
            className="border-none outline-none"
            type="text"
            placeholder="Enter video URL"
            value={tweetVideo}
            onChange={(e) => setTweetVideo(e.target.value)}
          />
        ) : null}

        <div className="flex items-center ">
          <div className="flex flex-1 items-center space-x-2 text-blue-300">
            <PhotoIcon
              className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              onClick={() => setToShowPIcon(!toShowPIcon)}
            />
            <PlayCircleIcon
              className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              onClick={() => setToShowVIcon(!toShowVIcon)}
            />
            {/* Add Emoji Picker */}
            <FaceSmileIcon
              className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              onClick={handleOpenPicker}
            />
            {/* https://www.geeksforgeeks.org/react-mui-popover-util/ */}
            <Popover
              open={Boolean(anchorEmoji)}
              anchorEl={anchorEmoji}
              onClose={handleClosePicker}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <EmojiPicker onEmojiClick={onEmojiClick} emojiStyle="twitter" />
            </Popover>
          </div>
          <Button
            disabled={!tweetText}
            className="tweetBox-button disabled:opacity-40"
            type="submit"
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
