import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../redux/userSlice";
import { formatTime } from "../utils/stringUtils";
import { Link } from "react-router-dom";

function QuestionCard({ id, author, timestamp }) {
  const user = useSelector((state) => selectUserById(state, author));

  if (!id || !user) {
    return null;
  }

  return (
    <div
      className="shadow p-3 d-flex flex-column align-items-center gap-3 rounded-2"
      style={{ width: "300px" }}
    >
      <strong>{user?.name}</strong>
      <span>{formatTime(timestamp)}</span>
      <Link to={`/questions/${id}`}>
        <button className="btn btn-primary btn-sm">View detail</button>
      </Link>
    </div>
  );
}

export default QuestionCard;
