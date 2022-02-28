import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SidebarTopic.css";
import { selectUser } from "../features/userSlice";
import { setTopicInfo } from "../features/appSlice";
import { Avatar } from "@material-ui/core";

function SidebarTopic({ id, topicName, topicDesc, topicEta }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <div
      className="sidebarTopic"
      onClick={() =>
        dispatch(
          setTopicInfo({
            topicId: id,
            topicName: topicName,
            topicDesc: topicDesc,
            topicEta: topicEta,
          })
        )
      }
    >
      <h4>
        <span className="sidebarTopic__hash">#</span>
        {topicName}
      </h4>
      {/* <div className="currProfile">
        <Avatar src={user.photo}/>
      </div> */}
    </div>
  );
}

export default SidebarTopic;
