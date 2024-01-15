import React, { useState, useContext,useRef } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import "./TweetBox.css";
import { Button, Popover } from "@mui/material";
import {
  PhotoIcon,
  FaceSmileIcon,
  PlayCircleIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data/sets/14/twitter.json";
import { motion, AnimatePresence } from "framer-motion";
import { TextareaAutosize } from "@mui/base";



function TweetBox({ getAllTweets, setPage, setHasMore }) {
  const [tweetText, setTweetText] = useState("");
  const [tweetMedia, setTweetMedia] = useState("");
  const [anchorEmoji, setAnchorEmoji] = useState(null);
  const [tweetVideo, setTweetVideo] = useState("");
  const [tweetPhotos, setTweetPhotos] = useState("");
  const [photoArray, setPhotoArray] = useState([]);
  const [toShowVIcon, setToShowVIcon] = useState(false);
  const [toShowPIcon, setToShowPIcon] = useState(false);
  const [toShowMIcon, setToShowMIcon] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const ref = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    // content to be posted
    const tweetContent = { tweetText, tweetMedia, tweetVideo, photoArray };

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
    setTweetPhotos("");
    setPhotoArray([]);
    setToShowPIcon(false);
    setToShowVIcon(false);
    setToShowMIcon(false);
  }

  const handleOpenPicker = (e) => {
    setAnchorEmoji(e.currentTarget);
  };

  const handleClosePicker = () => {
    setAnchorEmoji(null);
  };

  function onEmojiClick(e) {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);

    /* https://stackoverflow.com/questions/66261433/add-emojis-to-input */
    const cursor = ref.current.selectionStart;
    setTweetText(tweetText.slice(0, cursor) + emoji + tweetText.slice(cursor));
  }

  return (
    <div className="flex space-x-2 p-5 border-b-[1px] border-gray-200">
      <img
        className="mt-4 h-14 w-14 object-cover rounded-full"
        alt=""
        src={user.avatar}
      />
      <motion.form
        transition={{
          opacity: { ease: "linear" },
          layout: { duration: 1 },
        }}
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col "
      >
        <TextareaAutosize
          layout
          className="w-full outline-none placeholder:text-xl resize-none pt-8 pb-3 inline-block inputBox "
          type="text"
          ref={ref}
          placeholder="What's happening?"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
        />
        <hr class="hidden mb-2 h-[1px] border-t-0 bg-[#e6ecf0] opacity-100 dark:opacity-50 line" />

        {toShowPIcon && (
          <AnimatePresence>
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-none outline-none"
              type="text"
              placeholder="Enter image URL"
              value={tweetMedia}
              onChange={(e) => setTweetMedia(e.target.value)}
            />
          </AnimatePresence>
        )}

        {toShowVIcon && (
          <AnimatePresence>
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-none outline-none"
              type="text"
              placeholder="Enter video URL"
              value={tweetVideo}
              onChange={(e) => setTweetVideo(e.target.value)}
            />
          </AnimatePresence>
        )}
        {toShowMIcon && (
          <AnimatePresence>
            <motion.textarea
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-none outline-none resize-none"
              type="text"
              placeholder="Enter multiple image URLs: Seperate by a new line"
              value={tweetPhotos}
              onChange={(e) => {
                setTweetPhotos(e.target.value);
                setPhotoArray(e.target.value.split("\n"));
              }}
            />
          </AnimatePresence>
        )}
        <div className="flex items-center">
          <motion.div
            layout
            transition={{
              opacity: { ease: "linear" },
              layout: { duration: 0.3 },
            }}
            className="flex flex-1 items-center space-x-2 text-blue-300"
          >
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
              <Picker data={data} onEmojiSelect={onEmojiClick} set="twitter" />
            </Popover>
            <Squares2X2Icon
              className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              onClick={() => {
                setToShowMIcon(!toShowMIcon);
              }}
            />
          </motion.div>
          <Button
            disabled={!tweetText}
            className="tweetBox-button disabled:opacity-40"
            type="submit"
          >
            Post
          </Button>
        </div>
      </motion.form>
    </div>
  );
}

export default TweetBox;
