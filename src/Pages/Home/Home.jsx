import React from "react";
import Avatar from "@material-ui/core/Avatar";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyRoundedIcon from "@material-ui/icons/WbSunnyRounded";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Home = ({ setDarkMode, darkMode }) => {
  const user = useSelector(selectUser); // Select the currently logged in user from the slice using redux
  const dispatch = useDispatch();
  return (
    <>
      <h2
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Avatar src={user.photoUrl} />
        {user.displayName}
        <IconButton
          onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem("Mode", JSON.stringify(!darkMode));
          }}
        >
          {darkMode ? (
            <NightsStayIcon style={{fontSize: "25px"}} />
          ) : (
            <WbSunnyRoundedIcon style={{fontSize: "25px"}} />
          )}
        </IconButton>
        <IconButton
          onClick={() => {
            auth.signOut().then(() => {
              dispatch(logout());
              localStorage.removeItem("authLoading");
            });
          }}
        >
          <ExitToAppIcon />
        </IconButton>
      </h2>
      <center>
        <div>Email : {user.email}</div>
        <div>UID : {user.uid}</div>
      </center>
    </>
  );
};

export default Home;
