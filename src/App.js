import React, { useEffect } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import Login from "./components/Login";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";
import Presentation from "./components/Presentation";
import Agenda from "./components/Agenda";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      {user ? (
        <>
          <Agenda />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
