import React from "react";
import Chat from "./Chat";
import "./Presentation.css";
import Sidebar from "./Sidebar";
function presentation() {
  return (
    <div className="presentation">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default presentation;
