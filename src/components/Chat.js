import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import {
  selectAgendaId,
  selectTopicId,
  selectTopicName,
  selectTopicDesc,
  selectTopicEta,
} from "../features/appSlice";
import db from "../firebase";
import firebase from "firebase/compat/app";

function Chat() {
  const user = useSelector(selectUser);
  const topicName = useSelector(selectTopicName);
  const topicId = useSelector(selectTopicId);
  const topicDesc = useSelector(selectTopicDesc);
  const topicEta = useSelector(selectTopicEta);
  const agendaId = useSelector(selectAgendaId);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (topicId) {
      db.collection("agendas")
        .doc(agendaId)
        .collection("topics")
        .doc(topicId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((onSnapshot) =>
          setMessages(onSnapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [topicId]);

  const sendMessages = (e) => {
    e.preventDefault();
    db.collection("agendas")
      .doc(agendaId)
      .collection("topics")
      .doc(topicId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user,
      });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__chatHeader">
        <ChatHeader
        topicId={topicId}
          topicName={topicName}
          topicDesc={topicDesc}
          topicEta={topicEta}
        />
      </div>
      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!topicId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${topicName}`}
          />
          <button
            className="chat__inputBtn"
            type="Submit"
            onClick={sendMessages}
          >
            Send Message
          </button>
        </form>
        <div className="chat_inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
