import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import moment from "moment";
import ReactPlayer from "react-player";
import UpdateBox from "./UpdateBox";
import "./Post.css";
import {
  HeartIcon as Heart2,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as Heart1 } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import linkifyHtml from "linkify-html";
import * as linkify from "linkifyjs";
import parse from "html-react-parser";
import axios from "axios";
import { getImageSize } from "react-image-size";
import ConfirmationBox from "./ConfirmationBox";

import { PhotoAlbum, RenderPhoto, RenderRowContainer } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

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
  const [index, setIndex] = useState(-1);
  const [array, setArray] = useState();
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    addToArray();
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
      mediaFile = <audio className="w-full" controls src={tweetVideo}></audio>;
    } else {
      mediaFile = (
        <div className="">
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


  /* Post date relevant to today's time */
  let relevantDate = (isEdited) => {
    let assessedDate = isEdited ? updatedAt : timestamp;
    /* Today */
    if (moment(assessedDate).isSame(moment(), "day")) {
      if (isEdited) {
        return (
          <p className="dateStyle">
            Edited:&nbsp;
            <Moment fromNow className="dateStyle">
              {updatedAt}
            </Moment>
          </p>
        );
      }
      return (
        <Moment fromNow className="dateStyle">
          {timestamp}
        </Moment>
      );
    }
    /* Yesterday */
    if (moment(assessedDate).isSame(moment().subtract(1, "day"), "day")) {
      if (isEdited) {
        return (
          <p className="dateStyle">
            Edited:&nbsp;
            <Moment
              format="[Yesterday] HH:mm"
              className="dateStyle"
            >
              {updatedAt}
            </Moment>
          </p>
        );
      }
      return (
        <Moment format="[Yesterday] HH:mm" className="dateStyle">
          {timestamp}
        </Moment>
      );
    }
    if (isEdited) {
      return (
        <p className="dateStyle">
          Edited:&nbsp;
          <Moment format="MMM DD HH:mm" className="dateStyle">
            {updatedAt}
          </Moment>
        </p>
      );
    }
    return (
      <Moment format="MMM DD HH:mm" className="dateStyle">
        {timestamp}
      </Moment>
    );
  };

  async function fetchImageSize(photo) {
    try {
      const dimensions = await getImageSize(photo);

      return dimensions;
    } catch (error) {
      console.error(error);
    }
  }

  async function addToArray() {
    let newArray = [];
    for (let photo of photoArray) {
      const dimensions = await fetchImageSize(photo);
      newArray.push({
        src: photo,
        width: dimensions.width,
        height: dimensions.height,
      });
    }
    setArray(newArray);
    return newArray;
  }

  /* https://stackoverflow.com/questions/53303017/image-link-isnt-clickable-after-hover-effect-has-been-applied */
  const renderPhoto = ({ imageProps: { photo, style, ...restImageProps } }) => (
    <div
      style={{
        marginRight: 4,
        width: 250,
        height: 250,
        overflow: "hidden",
        position: "relative",
        borderRadius: 20,
        marginBottom: 4,
      }}
      className="container"
    >
      <img
        style={{
          ...style,
          width: "100%",
          height: "100%",
          borderRadius: 20,
          objectFit: "cover",
        }}
        {...restImageProps}
      />
      <div className="overlay absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out pointer-events-none"></div>
    </div>
  );

  const renderRowContainer = ({
    rowContainerProps,
    rowIndex,
    rowsCount,
    children,
  }) => (
    <div
      {...rowContainerProps}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col space-x-3 border-b-[1px] p-5 pb-2 border-gray-200 "
      >
        <div className="flex space-x-3 h-auto ">
          <img
            className="h-10 w-10 object-cover shrink-0 rounded-full"
            alt=""
            src={avatar}
          />

          <div layout className="w-full flex flex-col">
            <div className="flex flex-col items-start  md:flex-row md:items-center md:space-x-1">
              <h3 layout className="mr-1 font-bold">
                {displayName}
              </h3>

              {/* Current year? hide year: show year too */}
              {timestamp.substring(0, 4) ===
              new Date().getFullYear().toString() ? (
                relevantDate()
              ) : (
                <Moment format="YYYY MMM DD HH:mm" className="dateStyle">
                  {timestamp}
                </Moment>
              )}

              {
                <>
                  {/* Hide edited time if condition is true (2nd con = hide edited if time difference is more than 20ms)*/}
                  {updatedAt === undefined ||
                  new Date(updatedAt).getTime() -
                    new Date(timestamp).getTime() <
                    20 ? (
                    ``
                  ) : updatedAt.substring(0, 4) ===
                    new Date().getFullYear().toString() ? (
                    relevantDate(true)
                  ) : (
                    <p className="dateStyle">
                      Edited:&nbsp;
                      <Moment format="YYYY MMM DD HH:mm" className="dateStyle">
                        {updatedAt}
                      </Moment>
                    </p>
                  )}
                </>
              }
            </div>

            <div
              className={` bg-inherit whitespace-pre-wrap ${
                mediaFile || photoArray.length !== 0 || tweetMedia ? "pb-3" : ""
              }`}
            >
              {parse(linkedText)}
            </div>

            {tweetMedia && <img className="imgFig" src={tweetMedia} alt="" />}
            {mediaFile}
            {/* Gallery */}
            {photoArray.length !== 0 && (
              <>
                {/* https://codesandbox.io/p/devbox/yet-another-react-lightbox-examples-9qvmif?file=%2Fsrc%2Fexamples%2FCarousel.tsx */}
                <PhotoAlbum
                  photos={array}
                  layout="rows"
                  targetRowHeight={300}
                  onClick={({ index }) => setIndex(index)}
                  renderPhoto={renderPhoto}
                  renderRowContainer={renderRowContainer}
                />

                <Lightbox
                  slides={array}
                  controller={{ closeOnBackdropClick: true }}
                  open={index >= 0}
                  index={index}
                  carousel={{
                    imageProps: {
                      style: { maxHeight: undefined, maxWidth: undefined },
                    },
                  }}
                  close={() => setIndex(-1)}
                  plugins={[Thumbnails, Zoom]}
                />
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-around">
          <div
            onClick={() => {
              setLike(!like);
              updateLike(_id);
            }}
            className="flex items-center group max-w-fit cursor-pointer px-2 py-2 rounded-full 
      hover:bg-[#f918801a] transition-all duration-200  "
          >
            {like ? (
              <Heart1 className="h-5 w-5 flex cursor-pointer items-center space-x-3 text-[#f91880] hover:scale-110" />
            ) : (
              <Heart2 className="h-5 w-5 cursor-pointer space-x-3 text-gray-400 group-hover:text-[#f91880] " />
            )}
          </div>

          <div
            className="flex items-center group max-w-fit cursor-pointer px-2 py-2 rounded-full 
      hover:bg-[#1d9bf01a] focus:bg-black transition-all duration-200"
          >
            <PencilSquareIcon
              className="h-5 w-5  cursor-pointer space-x-3 text-gray-400 group-hover:text-[#1d9bf0]"
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
            <div
              className="flex items-center group max-w-fit cursor-pointer px-2 py-2 rounded-full 
      hover:bg-[#00ba7c1a] transition-all duration-200"
            >
              <TrashIcon
                className="h-5 w-5  cursor-pointer space-x-3 text-gray-400 group-hover:text-[#00ba7c]"
                onClick={() => setShowConfirm(true)}
              />
              {showConfirm && (
                <ConfirmationBox
                  id={_id}
                  setOpen={setShowConfirm}
                  open={showConfirm}
                  deletePost={deletePost}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Post;
