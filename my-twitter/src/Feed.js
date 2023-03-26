import React,{useState} from 'react';
import './Feed.css';
import TweetBox from './TweetBox';
import Post from "./Post";

function Feed() {

  const [fetchedData, setFetchedData] = useState('');

    return (
      <div className="feed">
        {/*Header */}
        <div className="feed-header">
          <h2>Home</h2>
        </div>

        {/*Tweet Box */}
        <TweetBox setFetchedData={setFetchedData} />

        <Post
          displayName="大器晩成"
          text={fetchedData.tweetText}
          image={fetchedData.tweetMedia}
          avatar="https://images.unsplash.com/photo-1563306206-900cc99112fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80"
        />
        {/*Post */}
        {/*Post */}
        {/*Post */}
        {/*Post */}
        {/*Post */}
      </div>
    );
}

export default Feed