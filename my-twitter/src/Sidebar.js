import React from 'react';
import './Sidebar.css';
import { HomeIcon } from "@heroicons/react/24/outline";
import SidebarOption from './SidebarOption';
import { UserIcon } from "@heroicons/react/24/outline";
import Logo from "./logo.png";

function Sidebar() {
  return (
    <div className="sidebar basis-1/5 h-screen">
      {/* https://icon-icons.com/icon/origami-creative-craft-paper-star/226461 */}
      <img className="twitterIcon" src={Logo} alt="Logo" width={50} />
      {/*sidebar option */}
      <SidebarOption text="Home" Icon={HomeIcon} />
      <SidebarOption text="Profile" Icon={UserIcon} />
    </div>
  );
}

export default Sidebar


