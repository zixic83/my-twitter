import "./Home.css";
import Sidebar from "./Sidebar";
import FavFeed from "./FavFeed";
import Widgets from "./Widgets";
import { UserContext } from "./UserContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HelmetProvider, Helmet } from "react-helmet-async";



function Home() {
    const [user, setUser] = useState("");
    let title = user.name + " / myTwitter";
    const [open, setOpen] = useState(false);
    useEffect(() => {
      getData();
    }, []);

    async function getData() {
      const result = await axios.get("http://localhost:5000/user");
      setUser(result.data[0]);
    }

    async function updateUser(name, avatar) {
      let updatedUser = await axios.patch("http://localhost:5000/user", {
        data: { name: name, avatar: avatar },
      });
      return updatedUser;
    }

    const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <Helmet>
        <title>{title}</title>
        <meta
          name="favourites"
        />
      </Helmet>
      <div className="app flex">
        <UserContext.Provider value={{ updateUser, setUser, user }}>
          <div className="basis-1/5 h-screen">
            <Sidebar />
          </div>
          <div className="basis-3/5 h-screen">
            <FavFeed />
          </div>
        </UserContext.Provider>

        <div className="basis-1/5 h-screen">
          <Widgets />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Home;
