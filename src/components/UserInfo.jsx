import React from "react";

function UserInfo({ name, avatar }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <img
        src={avatar}
        alt="avatar"
        width={40}
        height={40}
        className="rounded-pill"
      />
      <span>{name}</span>
    </div>
  );
}

export default UserInfo;
