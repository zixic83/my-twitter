import React from "react";
import {
  createBrowserRouter,
  Route,
  NavLink,
  createRoutesFromElements,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./Home";
import Favourites from "./Favourites";
import ByMon from "./ByMon"

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="favourites" element={<Favourites />} />
      <Route path="bymon" element={<ByMon />} />
    </Routes>
  );
}

export default App;
