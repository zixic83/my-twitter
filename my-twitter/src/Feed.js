import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";

function Feed() {
  const [fetchedData, setFetchedData] = useState("");
  useEffect( () => {
    getAllTweets();
  });

  const getAllTweets = async () => {
    const allTweets = await axios.get("http://localhost:5000/allTweets");
    setFetchedData(allTweets.data)
    if (Object.keys(fetchedData).length !== 0) {
      console.log(fetchedData)
      fetchedData
        .slice(0)
        .reverse()
        .map((post) => {
          return (
            <Post
              displayName="大器晩成"
              text={post.tweetText}
              image={post.tweetMedia}
              timestamp={post.timestamp}
              avatar="https://images.unsplash.com/photo-1563306206-900cc99112fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80"
            />
          );
        });
    }
  };

  return (
    <div className="feed">
      {/*Header */}
      <div className="feed-header">
        <h2>Home</h2>
      </div>
      {/*Tweet Box */}
      <TweetBox setFetchedData={setFetchedData} />
      {/* go through each tweet in the allTweets json */}
      {Object.keys(fetchedData).length !== 0
        ? fetchedData
            .slice(0)
            .reverse()
            .map((post) => {
              return (
                <Post
                  displayName="大器晩成"
                  text={post.tweetText}
                  image={post.tweetMedia}
                  timestamp={post.timestamp}
                  avatar="https://images.unsplash.com/photo-1563306206-900cc99112fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80"
                />
              );
            })
        : null}
    </div>
  );
}

export default Feed;
