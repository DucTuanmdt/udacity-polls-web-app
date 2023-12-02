import React from "react";
import QuestionCard from "./QuestionCard";

function QuestionList({ title, items }) {
  return (
    <div className="my-4 py-4 ">
      <h2 className="text-center mb-4">{title}</h2>
      {items?.length > 0 && (
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {items.length > 0 &&
            items.map((question) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                author={question.author}
                timestamp={question.timestamp}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default QuestionList;
