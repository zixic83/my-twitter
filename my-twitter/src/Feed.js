import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { UserContext } from "./UserContext";

function Feed() {
  const [fetchedData, setFetchedData] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const { user, setUser} = useContext(UserContext);

  useEffect(() => {
    const func = async () => {
      const allTweets = await axios.get(`http://localhost:5000/allTweets?p=0`);
      setFetchedData(allTweets.data);
    };
    func();


  }, []);

  const getAllTweets = async () => {
    const allTweets = await axios.get(`http://localhost:5000/allTweets?p=0`);
    setFetchedData(allTweets.data);
    if (Object.keys(fetchedData).length !== 0) {
      fetchedData.map((post) => {
        return (
          <Post
            key={post.timestamp}
            displayName={user.name}
            avatar={user.avatar}
            {...post}
          />
        );
      });
    }
  };

  async function fetchData() {
    setIsFetching(true);
    const nextPageTweets = await axios.get(
      `http://localhost:5000/allTweets?p=${page}`
    );
    setIsFetching(false);
    setFetchedData([...fetchedData, ...nextPageTweets.data]);

    if (nextPageTweets.data.length === 0 || nextPageTweets.data.length < 3) {
      setHasMore(false);
    }
    setPage(page + 1);
  }

  async function deletePost(id) {
    const updatedTweets = await axios.delete("http://localhost:5000/tweets", {
      data: { id: id },
    });
    // refresh page 0
    getAllTweets();
    // reset page to 1 (to be shown after scrolling down)
    setPage(1);

    setHasMore(true);
  }

  async function updatePost(id, text) {
    let updatedTweet = await axios.patch("http://localhost:5000/tweets", {
      data: { id: id, text: text },
    });

    // update fetched data
    let targetTweet = fetchedData.find((post) => post._id === id);
    targetTweet.tweetText = updatedTweet.tweetText;
    // refresh page 0
    getAllTweets();
    // reset page to 1 (to be shown after scrolling down)
    setPage(1);

    setHasMore(true);
  }
  async function updateLike(id, text) {
    let updatedTweet = await axios.patch("http://localhost:5000/like", {
      data: { id: id },
    });
  }





  return (
    <div id="box" className="feed basis-3/5 h-screen" >
      {/*Header */}
      <div className="feed-header">
        <div className="font-semibold text-xl">Home</div>
      </div>
      {/*Tweet Box */}
      <TweetBox
        setPage={setPage}
        setHasMore={setHasMore}
        getAllTweets={getAllTweets}
      />
      {/* go through each tweet in the allTweets json */}
      <InfiniteScroll
        loadMore={fetchData}
        hasMore={!isFetching && hasMore && fetchedData.length >= 10}
        loader={<h4>Loading...</h4>}
        initialLoad={false}
        useWindow={false}
      >
        {Object.keys(fetchedData).length !== 0 &&
          fetchedData.map((post) => {
            return (
              <Post
                key={post._id}
                displayName={user.name}
                avatar={user.avatar}
                text={post.tweetText}
                image={post.tweetMedia}
                video={post.tweetVideo}
                photoArray={post.photoArray}
                timestamp={post.timestamp}
                id={post._id}
                liked={post.Liked}
                deletePost={deletePost}
                updatePost={updatePost}
                updateLike={updateLike}
                {...post}
              />
            );
          })}
      </InfiniteScroll>
    </div>
  );
}

export default Feed;
