import React, { useState,useRef } from "react";
import Moment from "react-moment";
import { TextareaAutosize } from "@mui/base";
import ReactPlayer from "react-player";
import UpdateBox from "./UpdateBox";
import "./Post.css";
import {
  ChatBubbleBottomCenterIcon,
  TrashIcon,
  PencilSquareIcon
} from "@heroicons/react/24/outline";


function Post({ displayName, text, image, video, timestamp, avatar, id, deletePost, updatePost }) {
  const [showBox, setShowBox] = useState(false);


  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
      <div className="flex space-x-3 h-auto ">
        <img
          className="h-10 w-10 object-cover shrink-0 rounded-full"
          alt=""
          src={avatar}
        />

        <div className="w-full flex flex-col">
          <div className="flex items-center space-x-1">
            <h3 className="mr-1 font-bold">{displayName}</h3>
            <Moment format="MMM DD HH:mm" className="text-sm text-gray-500">
              {timestamp}
            </Moment>
          </div>
          <TextareaAutosize
            value={text}
            className="resize-none outline-none "
            disabled
          />

          {image ? (
            <img className="imgFig p-1 pt-3 w-fit" src={image} alt="" />
          ) : null}
          {video ? (
            <ReactPlayer className="pt-3 w-fit" url={video} controls={true} />
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex justify-around">
        <div>
          <ChatBubbleBottomCenterIcon className="h-5 w-5 flex cursor-pointer items-center space-x-3 text-gray-400" />
        </div>
        <div>
          <PencilSquareIcon
            className="h-5 w-5 flex cursor-pointer items-center space-x-3 text-gray-400"
            onClick={() => setShowBox(true)}
          />
          {showBox ? (
            <UpdateBox
              id={id}
              updatePost={updatePost}
              setShowBox={setShowBox}
              showBox={showBox}
              text={text}
            />
          ) : null}
        </div>
        <div>
          <TrashIcon
            className="h-5 w-5 flex cursor-pointer items-center space-x-3 text-gray-400"
            onClick={() => deletePost(id)}
          />
        </div>
      </div>
    </div>
  );
}

export default Post;
