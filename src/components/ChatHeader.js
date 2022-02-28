import React, { useState } from "react";
import "./ChatHeader.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";
import { selectAgendaId } from "../features/appSlice";
import db from "../firebase";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Button,
} from "@material-ui/core";

function ChatHeader({ topicId, topicName, topicDesc, topicEta }) {
  const agendaId = useSelector(selectAgendaId);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [eta, setEta] = useState("");

  const handleDelete = () => {
    db.collection("agendas")
      .doc(agendaId)
      .collection("topics")
      .doc(topicId)
      .delete();
  };

  const handleOpenDiaglog = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    const topicTitle = title;
    const topicDesc = desc;
    const topicEta = eta;
    if (topicTitle && topicDesc && topicEta) {
      db.collection("agendas")
        .doc(agendaId)
        .collection("topics")
        .doc(topicId)
        .update({
          topicName: topicTitle,
          topicDesc: topicDesc,
          topicEta: topicEta,
        });
    }
    setOpen(false);
  };
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="span chatHeader__hash">#</span>
          {topicName}
        </h3>
        {/* <p>
          <span className="chatHeader__desc">{topicDesc}</span>
        </p> */}
        <div className="chatHeader__desc">
          <div className="chatHeader__descCont">{topicDesc}</div>
        </div>
      </div>
      <div className="chatHeader__right">
        <h4>Estimate: {topicEta}</h4>
        <div className="chatHeader__crudIcons">
          <DeleteIcon onClick={handleDelete} />
          <EditIcon onClick={handleOpenDiaglog} />
        </div>
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

export default ChatHeader;
