import React,{useState} from "react";
import "./Sidebar.css";
import { HomeIcon } from "@heroicons/react/24/outline";
import SidebarOption from "./SidebarOption";
import Logo from "./logo.png";
import Profile from "./Profile";

function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sidebar basis-1/5 h-screen">
      {/* https://icon-icons.com/icon/origami-creative-craft-paper-star/226461 */}
      <img className="twitterIcon" src={Logo} alt="Logo" width={50} />
      {/*sidebar option */}
      <SidebarOption text="Home" Icon={HomeIcon} />
      <Profile open={open} setOpen={setOpen}  />
    </div>
  );
}

export default Sidebar;
