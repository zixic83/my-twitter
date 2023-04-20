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
import Sidebar from "./Sidebar";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Sidebar />}>
//       <Route index element={<Home />} />
//       <Route path="favourites" element={<Favourites />} />
//     </Route>
//   )
// );

function App() {
  return (
    
    <Routes>      
        <Route index element={<Home />} />
        <Route path="favourites" element={<Favourites />} />
    </Routes>
  );
}

export default App;
