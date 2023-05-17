import "./Home.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import { UserContext } from "./UserContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HelmetProvider, Helmet } from "react-helmet-async";



function Home() {
    const [user, setUser] = useState("");
    let title = user.name + " / myTwitter";
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);

  
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
          name="description"
          content="Beginner friendly page for learning React Helmet."
        />
      </Helmet>
      <div className="app flex">
        <UserContext.Provider
          value={{ updateUser, setUser, user, click, setClick }}
        >
          <div
            className={
              // how to disappear again if width > 678px ?
              "basis-1/5 h-screen md:block hidden" +
              (click
                ? "visible fixed top-0 left-0 z-20 bg-white"
                : "")
            }
          >
            <Sidebar />
          </div>
          <div className="basis-3/5 h-screen min-w-fit z-10">
            <Feed />
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
