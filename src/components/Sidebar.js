import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import CallIcon from "@material-ui/icons/Call";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import SidebarTopic from "./SidebarTopic";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";
import { selectAgendaId, selectAgendaName } from "../features/appSlice";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Button,
} from "@material-ui/core";

function Sidebar() {
  const user = useSelector(selectUser);
  const [topics, setTopics] = useState([]);
  const agendaName = useSelector(selectAgendaName);
  const agendaId = useSelector(selectAgendaId);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [eta, setEta] = useState("");

  useEffect(() => {
    db.collection("agendas")
      .doc(agendaId)
      .collection("topics")
      .onSnapshot((snapshot) =>
        setTopics(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            topic: doc.data(),
          }))
        )
      );
  }, []);

  // const handleAddTopic = () => {
  //   const topicName = prompt("Enter Topic Name: ");
  //   if (topicName) {
  //     db.collection("agendas").doc(agendaId).collection("topics").add({
  //       topicName: topicName,
  //     });
  //   }
  // };

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    const topicTitle = title;
    const topicDesc = desc;
    const topicEta = eta;
    if (topicTitle && topicDesc && topicEta) {
      db.collection("agendas").doc(agendaId).collection("topics").add({
        topicName: topicTitle,
        topicDesc: topicDesc,
        topicEta: topicEta,
      });
    }
    setOpen(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>{agendaName}</h3>
        {/* <ExpandMoreIcon /> */}
      </div>
      <div className="sidebar__topics">
        <div className="sidebar__topicsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Topics</h4>
          </div>
          <AddIcon onClick={handleClickToOpen} className="sidebar__addTopic" />
        </div>
        <div className="sidebar__topicsList">
          {topics.map(({ id, topic }) => (
            <SidebarTopic
              key={id}
              id={id}
              topicName={topic.topicName}
              topicDesc={topic.topicDesc}
              topicEta={topic.topicEta}
            />
          ))}
        </div>
      </div>

      {/* <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div> */}

      <div className="sidebar__profile">
        <Avatar
          onClick={() => {
            auth.signOut();
          }}
          src={user.photo}
        />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        {/* <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div> */}
      </div>

      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"Add a Topic"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="sidebar__topicDialog">
              <input
                type="text"
                placeholder="Enter Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Enter Description..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Eta..."
                value={eta}
                onChange={(e) => setEta(e.target.value)}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose} color="primary" autoFocus>
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Sidebar;
