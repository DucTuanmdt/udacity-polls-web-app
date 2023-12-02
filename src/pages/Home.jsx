import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestionList,
  selectAnsweredQuestionList,
  selectQuestionList,
  selectUnAnsweredQuestionList,
} from "../redux/questionSlice";
import QuestionList from "../components/QuestionList";

function Home() {
  const { isLoading } = useSelector((state) => state.question);
  const questionList = useSelector(selectQuestionList);
  const newdQuestions = useSelector(selectUnAnsweredQuestionList);
  const answeredQuestions = useSelector(selectAnsweredQuestionList);

  const dispatch = useDispatch();

  useEffect(() => {
    if (questionList.length < 1) {
      dispatch(getQuestionList());
    }
  }, [dispatch, questionList.length]);

  return (
    <main className="container">
      {isLoading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {newdQuestions.length > 0 && (
            <QuestionList title="New Questions" items={newdQuestions} />
          )}
          {newdQuestions.length > 0 && answeredQuestions.length > 0 && <hr />}
          {answeredQuestions.length > 0 && (
            <QuestionList title="Done" items={answeredQuestions} />
          )}
        </>
      )}
    </main>
  );
}

export default Home;
