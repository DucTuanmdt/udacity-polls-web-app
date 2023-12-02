import React from "react";

function AnswerCard({ value, content, isLoading, onClick = () => {} }) {
  const handleClick = () => {
    onClick(value);
  };
  return (
    <div className="shadow rounded-2 d-flex flex-column gap-2">
      <p className="m-3 text-center">{content}</p>
      <button
        className="btn btn-primary"
        onClick={handleClick}
        disabled={isLoading}
      >
        Vote
      </button>
    </div>
  );
}

export default AnswerCard;
