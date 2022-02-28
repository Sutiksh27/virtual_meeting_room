import React from "react";
import "./ChatHeader.css";

function ChatHeader({ topicName, topicDesc, topicEta }) {
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
          <div className="chatHeader__descTitle">Description:</div>
          <div className="chatHeader__descCont">{topicDesc}</div>
        </div>
      </div>
      <div className="chatHeader__right">
        <h4>Estimate: {topicEta}</h4>
      </div>
    </div>
  );
}

export default ChatHeader;
