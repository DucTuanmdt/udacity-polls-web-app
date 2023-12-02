import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { _getUsers } from "../services/mockService";

export const getUserList = createAsyncThunk("user/getUserList", async () => {
  return await _getUsers();
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    usersMap: null,
    isLoading: false,
  },

  extraReducers: (builders) => {
    builders
      .addCase(getUserList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.usersMap = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserList.rejected, (state) => {
        state.usersMap = null;
        state.isLoading = false;
      });
  },
});

export const selectUserList = createSelector(
  (state) => state.user.usersMap,
  (usersMap) => {
    if (usersMap !== null) {
      return Object.values(usersMap);
    }
    return [];
  }
);

export const selectUserById = createSelector(
  (state) => state.user.usersMap,
  (_, id) => id,
  (usersMap, id) => {
    return usersMap[id] || null;
  }
);

export const selectLeaderBoardList = createSelector(
  selectUserList,
  (userList) => {
    return userList
      .map((item) => ({
        ...item,
        answersLength: Object.keys(item.answers).length,
        questionsLength: item.questions.length,
        totalQuestion: item.questions.length + Object.keys(item.answers).length,
      }))
      .sort((a, b) => b.totalQuestion - a.totalQuestion);
  }
);

export default userSlice.reducer;
