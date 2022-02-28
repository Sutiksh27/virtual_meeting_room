import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Agenda.css";
import Presentation from "./Presentation";
import db from "../firebase";

import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Button,
} from "@material-ui/core";
import { setAgendaInfo } from "../features/appSlice";

function Agenda() {
  const [input, setInput] = useState("");
  const [choice, setChoice] = useState([]);
  const [open, setOpen] = useState(false);
  const [join, setJoin] = useState(false);
  const [agendas, setAgendas] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("agendas").onSnapshot((snapshot) =>
      setAgendas(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          agenda: doc.data(),
        }))
      )
    );
  }, []);

  const handleOpenStartPpt = () => {
    setOpen(true);
  };

  const handleOpenJoinPpt = () => {
    setJoin(true);
  };

  const handleStartPpt = async () => {
    const agendaName = input;
    console.log(agendaName);
    let res;
    if (agendaName) {
      res = await db.collection("agendas").add({
        agendaName: agendaName,
      });
    }
    dispatch(
      setAgendaInfo({
        agendaId: res.id,
        agendaName: agendaName,
      })
    );
    setOpen(false);
    setShow(true);
  };

  const handleJoinPpt = async () => {
    dispatch(
      setAgendaInfo({
        agendaId: choice[0],
        agendaName: choice[1],
      })
    );
    setJoin(false);
    setShow(true);
  };

  const handleToClose = () => {
    setOpen(false);
    setJoin(false);
  };

  return (
    <div className="agenda">
      {!show ? (
        <>
          <div className="agenda__items">
            <h3 id="title">Virtual Meeting Room</h3>
            <div className="agenda__pptOptions">
              <div className="agenda__createPpt" onClick={handleOpenStartPpt}>
                <p id="startPpt"> Start a Presentation</p>
              </div>
              <div className="agenda__joinPpt" onClick={handleOpenJoinPpt}>
                <p id="joinPpt"> Join a Presentation</p>
              </div>
            </div>
            <Dialog open={open} onClose={handleToClose}>
              <DialogTitle>{"Start a presentation"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <input
                    type="text"
                    placeholder="Enter Agenda..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleStartPpt} color="primary" autoFocus>
                  Start
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog open={join} onClose={handleToClose}>
              <DialogTitle>{"Select a presentation"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <ul>
                    {agendas.map(({ id, agenda }) => (
                      <li
                        className="agenda__chooseAgenda"
                        onClick={() => {
                          setChoice([id, agenda.agendaName]);
                          const el = document.getElementsByClassName(
                            "agenda__chooseAgenda"
                          );
                          el.classList.add("agenda__chosenAgenda");
                        }}
                      >
                        {agenda.agendaName}
                      </li>
                    ))}
                  </ul>
                </DialogContentText>
                <DialogActions>
                  <Button onClick={handleJoinPpt}>Join</Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          </div>
        </>
      ) : (
        <Presentation />
      )}
    </div>
  );
}

export default Agenda;
