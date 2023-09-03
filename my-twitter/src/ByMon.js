import "./Home.css";
import Sidebar from "./Sidebar";
import ByMonFeed from "./ByMonFeed";
import { UserContext } from "./UserContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Home() {
  const [user, setUser] = useState("");
  let title = user.name + " / myTwitter";
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [submittedDate, setSubmittedDate] = useState(dayjs());

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
        <meta name="favourites" />
      </Helmet>
      <div className="app flex">
        <UserContext.Provider value={{ updateUser, setUser, user }}>
          <div className="basis-1/5 h-screen">
            <Sidebar />
          </div>
          <div className="basis-3/5 h-screen">
            <ByMonFeed submittedDate={submittedDate} />
          </div>
        </UserContext.Provider>

        <div className="basis-1/5 h-screen">
          {/* <Widgets /> */}
          <div className="widgets basis-1/5 h-screen m-8">
            <Box textAlign="center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={"Select Year & Month"}
                  views={["month", "year"]}
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                />
              </LocalizationProvider>
              <div className="mt-3">
                <Button
                  style={{
                    backgroundColor: "#0284c7",
                  }}
                  variant="contained"
                  onClick={() => {
                    setSubmittedDate(selectedDate);
                  }}
                >
                  Search
                </Button>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Home;
