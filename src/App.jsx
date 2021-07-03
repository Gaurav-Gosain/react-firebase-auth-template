import "./App.css";
import React, { useState, useEffect } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { db } from "./firebase";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
function App() {
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("Mode")));

  const dispatch = useDispatch(); // Keep track of changes on the user slice

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  useEffect(() => {
    // useEffect keeps listening to the variables passed in the array at the end
    auth.onAuthStateChanged((userAuth) => {
      localStorage.removeItem("authLoading");
      // When the state of the user changes this function is called that is if the user logs in or out this function gets called
      console.log(userAuth);
      userAuth
        ? localStorage.setItem("userAuth", JSON.stringify(userAuth))
        : localStorage.removeItem("userAuth");
      if (userAuth) {
        // If user logs in, userAuth becomes true as it holds some value
        db.collection("users")
          .where("uid", "==", userAuth.uid)
          .get()
          .then((querySnapshot) => {
            //This is a firebase query to get all users in the db with the name of the current user
            if (querySnapshot.size === 0) {
              // If there is none in the db, it means its the first time the user is logging in and he is added to the db
              // This if condition will only be true when the user logs in for the first time
              if (userAuth.uid) {
                db.collection("users").doc(userAuth.uid).set({
                  name: userAuth.displayName,
                  email: userAuth.email,
                  photoUrl: userAuth.photoURL,
                  uid: userAuth.uid,
                });
              }
            } else {
              // If already in db do nothing
            }
          });
        //The dispatch function sets the user in the redux slice so that we know which user is logged in, all this info is stored in the login state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        // This else part evaluates true when the userAuth is null i.e. the user has logged out
        dispatch(logout()); // Simply calls the logout state in the slice
      }
    });
  }, [dispatch]);

  const user = useSelector(selectUser);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {JSON.parse(localStorage.getItem("userAuth")) === null ? ( // This is basically an if condition (ternary operator) which checks if the user exists (this user variable is fetched using useSelector which is a redux function to get the user if he is logged in)
        <Login /> // The login component is called whenever the user attribute in the slice is false i.e. when the user is logged out<>
      ) : (
        <>{user && <Home setDarkMode={setDarkMode} darkMode={darkMode} />}</>
      )}
    </ThemeProvider>
  );
}

export default App;
