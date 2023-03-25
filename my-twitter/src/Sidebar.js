import React from 'react';
import './Sidebar.css';
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Button } from '@mui/material';

function Sidebar() {
  return (
    <div className="sidebar">
      <TwitterIcon className='twitterIcon'/>
      {/*sidebar option */}
      <SidebarOption active text="Home" Icon={HomeIcon} />
      <SidebarOption text="Profile" Icon={PermIdentityIcon} />

      {/*Button Tweet */}
      <Button variant='outlined' className='sideBarButton' fullWidth>Tweet</Button>
    </div>
  );
}

export default Sidebar