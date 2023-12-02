import React from "react";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/authSlice";
import { saveQuestion } from "../redux/questionSlice";
import { useNavigate } from "react-router-dom";

function CreatePoll() {
  const optionOne = useInput("");
  const optionTwo = useInput("");

  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector((state) => state.question.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      author: currentUser.id,
      optionOneText: optionOne.value,
      optionTwoText: optionTwo.value,
    };

    await dispatch(saveQuestion(payload));

    // navigate to homepage
    navigate("/");
  };

  const isEnableSubmit =
    optionOne.value.trim() && optionTwo.value.trim() && !isLoading;

  return (
    <main className="container py-4">
      <h4 className="mt-4">Would You Rather</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="optionOne" className="mb-2">
            Option One:
          </label>
          <input
            type="text"
            className="form-control"
            id="optionOne"
            placeholder="Enter option one"
            {...optionOne}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="optionOne" className="mb-2">
            Option Two:
          </label>
          <input
            type="text"
            className="form-control"
            id="optionOne"
            placeholder="Enter option two"
            {...optionTwo}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isEnableSubmit}
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default CreatePoll;
