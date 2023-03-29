import React from "react";
import TimeAgo from "react-timeago";
import "./Post.css";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";


function Post({ displayName, text, image, timestamp, avatar }) {
  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
      <div className="flex space-x-3 h-auto">
        <img
          className="h-10 w-10 object-cover rounded-full"
          alt=""
          src={avatar}
        />

        <div>
          <div className="flex items-center space-x-1">
            <h3 className="mr-1 font-bold">{displayName}</h3>
            <TimeAgo date={timestamp} className="text-sm text-gray-500" />
          </div>
          <p className="pt-1">{text}</p>
          <img className="imgFig p-1" src={image} alt="" />
        </div>
      </div>

      <div className="mt-5 flex justify-around">
        <div>
          <ChatBubbleBottomCenterIcon className="h-5 w-5 flex cursor-pointer items-center space-x-3 text-gray-400" />
        </div>
        <div>
          <HeartIcon className="h-5 w-5 flex cursor-pointer items-center space-x-3 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

export default Post;
