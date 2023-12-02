import React from "react";

function AnswerResultCard({ option, totalAnswers, isSelected }) {
  return (
    <div
      className={`d-flex flex-column align-items-center gap-2 shadow px-3 py-4 rounded-2 ${
        isSelected ? "text-success border border-success" : "text-muted"
      }`}
    >
      <p className="h5">{option.text}</p>
      <p className="mb-0">
        <strong>Amount of votes:</strong> {option.votes.length}
      </p>
      <p className="mb-0">
        <strong> Percentage:</strong>{" "}
        {((option.votes.length / totalAnswers) * 100).toFixed(1)}%
      </p>
    </div>
  );
}

export default AnswerResultCard;
