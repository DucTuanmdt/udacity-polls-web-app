import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import {
  getQuestionList,
  saveQuestionAnswer,
  selectQuestionById,
} from "../redux/questionSlice";
import { getUserList, selectUserById } from "../redux/userSlice";
import AnswerCard from "../components/AnswerCard";
import { selectCurrentUser } from "../redux/authSlice";
import AnswerResultCard from "../components/AnswerResultCard";

function PollDetail() {
  const params = useParams();
  const isLoading = useSelector((state) => state.question.isLoading);
  const question = useSelector((state) =>
    selectQuestionById(state, params.question_id)
  );

  const author = useSelector((state) =>
    selectUserById(state, question?.author)
  );

  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const isVoted = !!currentUser.answers[params.question_id];

  if (!question?.id || !author?.id) {
    return <Navigate to="/404" />;
  }

  const handleSelectAnswer = async (answer) => {
    await dispatch(
      saveQuestionAnswer({
        qid: question.id,
        answer,
        authedUser: currentUser.id,
      })
    );
    // get latest status of questions
    dispatch(getQuestionList());

    // get latest users status
    dispatch(getUserList());
  };

  const renderVoteSection = () => {
    const { optionOne, optionTwo } = question;
    const answerKey = ["optionOne", "optionTwo"];

    return (
      <div className="d-flex flex-column align-items-center py-4">
        <h3> Poll by {author.name}</h3>
        <img
          src={author.avatarURL}
          alt="avatar"
          width={150}
          height={150}
          className="rounded-pill shadow-sm my-3"
        />
        <p className="h4 mt-4">Would You Rather</p>

        <div className="row w-100 mt-4">
          {[optionOne, optionTwo].map((option, index) => (
            <div key={index} className="col-sm mb-4">
              <AnswerCard
                isLoading={isLoading}
                value={answerKey[index]}
                content={option.text}
                onClick={handleSelectAnswer}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderResultSection = () => {
    const { optionOne, optionTwo } = question;

    const totalAnswers = optionOne.votes.length + optionTwo.votes.length;
    const userAnswer = question[currentUser.answers[question.id]];

    return (
      <div className="row w-100 mt-4">
        {[optionOne, optionTwo].map((option, index) => (
          <div key={index} className="col-sm mb-4">
            <AnswerResultCard
              option={option}
              totalAnswers={totalAnswers}
              isSelected={userAnswer.text === option.text}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="container">
      {isVoted ? renderResultSection() : renderVoteSection()}
    </main>
  );
}

export default PollDetail;
