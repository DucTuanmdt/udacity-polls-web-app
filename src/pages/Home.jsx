import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestionList,
  selectAnsweredQuestionList,
  selectQuestionList,
  selectUnAnsweredQuestionList,
} from "../redux/questionSlice";
import QuestionCard from "../components/QuestionCard";

const TABS = {
  UNANSWERED: "unanswered",
  ANSWERED: "answered",
};

function Home() {
  const { isLoading } = useSelector((state) => state.question);
  const questionList = useSelector(selectQuestionList);
  const newQuestions = useSelector(selectUnAnsweredQuestionList);
  const answeredQuestions = useSelector(selectAnsweredQuestionList);

  const [activeTab, setActiveTab] = useState(TABS.UNANSWERED);

  const dispatch = useDispatch();

  useEffect(() => {
    if (questionList.length < 1) {
      dispatch(getQuestionList());
    }
  }, [dispatch, questionList.length]);

  const renderPollsSection = () => {
    const listItems =
      activeTab === TABS.UNANSWERED ? newQuestions : answeredQuestions;

    return (
      <div className="mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === TABS.UNANSWERED ? "active" : ""
              }`}
              onClick={() => setActiveTab(TABS.UNANSWERED)}
            >
              Unanswered polls ({newQuestions.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === TABS.ANSWERED ? "active" : ""
              }`}
              onClick={() => setActiveTab(TABS.ANSWERED)}
            >
              Answered polls ({answeredQuestions.length})
            </button>
          </li>
        </ul>
        <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
          {listItems.length > 0 ? (
            listItems.map((question) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                author={question.author}
                timestamp={question.timestamp}
              />
            ))
          ) : (
            <p className="h5">There are no {activeTab} polls</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="container">
      {isLoading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        renderPollsSection()
      )}
    </main>
  );
}

export default Home;
