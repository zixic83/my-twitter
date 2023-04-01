import React from 'react';
import './Sidebar.css';
import { HomeIcon } from "@heroicons/react/24/outline";
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOption from './SidebarOption';
import { UserIcon } from "@heroicons/react/24/outline";
import { Button } from '@mui/material';

function Sidebar() {
  return (
    <div className="sidebar basis-1/5 h-screen">
      <TwitterIcon className="twitterIcon" />
      {/*sidebar option */}
      <SidebarOption text="Home" Icon={HomeIcon} />
      <SidebarOption text="Profile" Icon={UserIcon} />

      {/*Button Tweet */}
      {/* <Button variant="outlined" className="sideBarButton" fullWidth>
        Tweet
      </Button> */}
    </div>
  );
}

export default Sidebar


