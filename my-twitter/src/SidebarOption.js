import React from "react";

function SidebarOption({text, Icon }) {
  return (
    <div
      className={`group flex items-center space-x-2 max-w-fit cursor-pointer px-4 py-3 rounded-full 
      hover:bg-gray-100 transition-all duration-200`}
    >
      <Icon className="h-6 w-6" />
      <h2 className="group-hover:text-blue-300 text-xl">{text}</h2>
    </div>
  );
}

export default SidebarOption;
