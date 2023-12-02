import { _saveQuestion, _saveQuestionAnswer } from "./mockService";

describe("Verify mockService.js", () => {
  test("_saveQuestion should return true when input is valid", async () => {
    const payload = {
      author: "sarahedo",
      optionOneText: "Study NodeJS",
      optionTwoText: "Study Java",
    };
    const response = await _saveQuestion(payload);

    expect(response).not.toBeNull();
    expect(response.id).toBeTruthy();
    expect(response.timestamp).toBeTruthy();
    expect(response).toMatchObject({
      author: "sarahedo",
      optionOne: { text: "Study NodeJS", votes: [] },
      optionTwo: { text: "Study Java", votes: [] },
    });
  });

  test("_saveQuestion should throw error when input is invalid", async () => {
    const payload = {};
    await expect(_saveQuestion(payload)).rejects.toMatch(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  test("_saveQuestionAnswer should return true when input is valid", async () => {
    const payload = {
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
      authedUser: "tylermcginnis",
    };
    const response = await _saveQuestionAnswer(payload);

    expect(response).toEqual(true);
  });

  test("_saveQuestionAnswer should throw error when input is invalid", async () => {
    const payload = {};
    await expect(_saveQuestionAnswer(payload)).rejects.toMatch(
      "Please provide authedUser, qid, and answer"
    );
  });
});
