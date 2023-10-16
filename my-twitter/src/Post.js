import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import ReactPlayer from "react-player";
import UpdateBox from "./UpdateBox";
import "./Post.css";
import {
  HeartIcon as Heart2,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as Heart1 } from "@heroicons/react/24/solid";
import ImageGallery from "react-image-gallery";
import { motion, AnimatePresence } from "framer-motion";
import linkifyHtml from "linkify-html";
import * as linkify from "linkifyjs";
import parse from "html-react-parser";
import axios from "axios";

function Post({
  displayName,
  text: tweetText,
  image: tweetMedia,
  video: tweetVideo,
  photoArray,
  timestamp,
  avatar,
  id: _id,
  deletePost,
  updatePost,
  updateLike,
  liked,
  updatedAt,
}) {
  const [showBox, setShowBox] = useState(false);
  const [like, setLike] = useState(liked);
  const [title, setTitle] = useState("Loading...");

  useEffect(() => {
    let links = "test1";
    if (tweetText !== undefined) {
      links = linkify.find(tweetText);
    } else {
      return;
    }

    if (links[0] === undefined) {
      return;
    }

    const url = links[0].value;

    axios.post("http://localhost:5000/url", { url }).then((res) => {
      setTitle(res.data);
    });
  }, [tweetText]);

  let linkedText = "test";

  if (tweetText !== undefined) {
    linkedText = linkifyHtml(tweetText, {
      className: "text-[#1976d2]",
      target: "_blank",
      format: {
        url: () => title,
      },
    });
  } else {
    return;
  }

  let mediaFile;
  function getType(filename) {
    // get file extension
    const extension = filename.split(".").pop();
    return extension;
  }

  if (tweetVideo) {
    if (getType(tweetVideo) === ("mp3" || "aac")) {
      mediaFile = (
        <audio className="pt-3 p-1 w-full" controls src={tweetVideo}></audio>
      );
    } else {
      mediaFile = (
        <div className="player-wrapper">
          <ReactPlayer
            url={tweetVideo}
            controls={true}
            height="60vh"
            width="auto"
          />
        </div>
      );
    }
  } else {
    mediaFile = null;
  }

  function photosToObjects() {
    let photos = [];
    const len = photoArray.length;
    for (let i = 0; i < len; i++) {
      photos.push({
        original: photoArray[i],
      });
    }

    return photos;
  }

  const photos = photosToObjects();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col space-x-3 border-b-[1px] p-5 border-gray-200 "
      >
        <div className="flex space-x-3 h-auto ">
          <img
            className="h-10 w-10 object-cover shrink-0 rounded-full"
            alt=""
            src={avatar}
          />

          <div layout className="w-full flex flex-col ">
            <div className="flex items-center space-x-1">
              <h3 layout className="mr-1 font-bold">
                {displayName}
              </h3>
              <Moment format="MMM DD HH:mm" className="text-sm text-gray-500">
                {timestamp}
              </Moment>
              {updatedAt && (
                <>
                  <p className="text-sm text-gray-500">
                    Edited:&nbsp;
                    <Moment
                      format="MMM DD HH:mm"
                      className="text-sm text-gray-500"
                    >
                      {updatedAt}
                    </Moment>
                  </p>
                </>
              )}
            </div>

            <div className="bg-inherit whitespace-pre-wrap">
              {parse(linkedText)}
            </div>

            {tweetMedia && (
              <img className="imgFig p-1 pt-3 w-fit" src={tweetMedia} alt="" />
            )}
            {mediaFile}
            {/* Gallery */}
            {photoArray.length !== 0 && (
              <div layout>
                <ImageGallery
                  items={photos}
                  showThumbnails={false}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  showBullets={true}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-around">
          <div
            onClick={() => {
              setLike(!like);
              updateLike(_id);
            }}
          >
            {like ? (
              <Heart1 className="h-5 w-5 flex cursor-pointer items-center space-x-3 text-red-500" />
            ) : (
              <Heart2 className="h-5 w-5 flex cursor-pointer items-center space-x-3 text-gray-400" />
            )}
          </div>
          <div>
            <PencilSquareIcon
              className="h-5 w-5 flex cursor-pointer items-center space-x-3 text-gray-400"
              onClick={() => setShowBox(true)}
            />
            {showBox && (
              <UpdateBox
                id={_id}
                updatePost={updatePost}
                setShowBox={setShowBox}
                showBox={showBox}
                text={tweetText}
              />
            )}
          </div>
          <div>
            <TrashIcon
              className="h-5 w-5 flex cursor-pointer items-center space-x-3 text-gray-400"
              onClick={() => deletePost(_id)}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Post;
