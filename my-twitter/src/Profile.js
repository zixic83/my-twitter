import React,{ useEffect, useState, useContext, useRef } from "react"; 
import { UserIcon } from "@heroicons/react/24/outline";
import SettingForm from "./SettingForm";
import axios from "axios";

function Profile({ open, setOpen }) {
  const [currentName, setName] = useState();
  const [currentAvatar, setAvatar] = useState();

  useEffect(() => {
    const func = async () => {
      const currentUser = await axios.get(`http://localhost:5000/user`);
      setName(currentUser.data[0].name);
      setAvatar(currentUser.data[0].avatar);
    };
    func();
  });

  const currentUser = { currentName, currentAvatar };

  return (
    <div
      className={`group flex items-center space-x-2 max-w-fit cursor-pointer px-4 py-3 rounded-full 
      hover:bg-gray-100 transition-all duration-200 `+(open ? 'text-sky-600':'#000000')}
    >
      <UserIcon className="h-6 w-6 group-hover:text-blue-300" />
      <h2
        className="group-hover:text-blue-300 text-xl"
        onClick={() => setOpen(true)}
      >
        Profile
      </h2>
      {open ? <SettingForm setOpen={setOpen} open={open} {...currentUser} /> : null}
    </div>
  );
}

export default Profile;
