import "./Home.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import { UserContext } from "./UserContext";
import React, { useState, useEffect,useRef } from "react";
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
        <meta name="description" />
      </Helmet>
      <div className="flex">
        <UserContext.Provider
          value={{ updateUser, setUser, user, click, setClick }}
        >
          <div className="hidden basis-1/5 xl:block">
            <Sidebar />
          </div>
          <div className="xl:basis-3/5 grow-0">
            <Feed isFav={false} />
          </div>
        </UserContext.Provider>
        <div className="hidden basis-1/5 grow-0 xl:block">
          <Widgets />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Home;
