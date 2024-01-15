import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  HomeIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import SidebarOption from "./SidebarOption";
import Logo from "./logo.png";
import Profile from "./Profile";

function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sidebar">
 
        {/* https://icon-icons.com/icon/origami-creative-craft-paper-star/226461 */}
      <img className="twitterIcon" src={Logo} alt="Logo" width={50} />
      {/*sidebar option */}
      <NavLink to="/">
        <SidebarOption text="Home" Icon={HomeIcon} />
      </NavLink>
      <NavLink to="/favourites">
        <SidebarOption text="Favourites" Icon={HeartIcon} />
      </NavLink>
      <NavLink to="/bymon">
        <SidebarOption text="Search" Icon={MagnifyingGlassIcon} />
      </NavLink>
      <Profile open={open} setOpen={setOpen} />

      
    </div>
  );
}

export default Sidebar;
