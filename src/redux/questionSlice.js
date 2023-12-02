import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../services/mockService";
import { selectCurrentUser } from "./authSlice";

export const getQuestionList = createAsyncThunk(
  "question/getQuestionList",
  async () => {
    return await _getQuestions();
  }
);

export const saveQuestionAnswer = createAsyncThunk(
  "question/saveQuestionAnswer",
  async (payload) => {
    const { qid, answer, authedUser } = payload;
    return await _saveQuestionAnswer({ qid, answer, authedUser });
  }
);

export const saveQuestion = createAsyncThunk(
  "question/saveQuestion",
  async (payload) => {
    const { author, optionOneText, optionTwoText } = payload;
    return await _saveQuestion({ author, optionOneText, optionTwoText });
  }
);

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    questionsMap: null,
    isLoading: false,
  },

  extraReducers: (builders) => {
    builders
      .addCase(getQuestionList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestionList.fulfilled, (state, action) => {
        state.questionsMap = action.payload;
        state.isLoading = false;
      })
      .addCase(getQuestionList.rejected, (state) => {
        state.questionsMap = null;
        state.isLoading = false;
      })
      .addCase(saveQuestionAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveQuestionAnswer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(saveQuestionAnswer.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(saveQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        const newQuestion = action.payload;
        state.questionsMap[newQuestion.id] = newQuestion;
      })
      .addCase(saveQuestion.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectQuestionList = createSelector(
  (state) => state.question.questionsMap,
  (questionsMap) => {
    if (questionsMap !== null) {
      return Object.values(questionsMap).sort(
        (a, b) => b.timestamp - a.timestamp
      );
    }
    return [];
  }
);

export const selectQuestionById = createSelector(
  (state) => state.question.questionsMap,
  (_, id) => id,
  (questionsMap, id) => {
    return questionsMap?.[id] || null;
  }
);

export const selectAnsweredQuestionList = createSelector(
  selectQuestionList,
  selectCurrentUser,
  (questionList, currentUser) => {
    const answeredIds = Object.keys(currentUser?.answers);
    return questionList.filter((item) => answeredIds.includes(item.id));
  }
);

export const selectUnAnsweredQuestionList = createSelector(
  selectQuestionList,
  selectCurrentUser,
  (questionList, currentUser) => {
    const answeredIds = Object.keys(currentUser?.answers);
    return questionList.filter((item) => !answeredIds.includes(item.id));
  }
);

export default questionSlice.reducer;
