import React from "react";
import { useSelector } from "react-redux";
import { selectLeaderBoardList } from "../redux/userSlice";
import UserInfo from "../components/UserInfo";

function LeaderBoard() {
  const leaderBoardList = useSelector(selectLeaderBoardList);

  return (
    <main className="container py-4">
      <h2 className="text-center mb-4">Top active users</h2>
      <table className="table table-striped shadow-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Users</th>
            <th scope="col">Answered</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoardList.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>
                <UserInfo name={user.name} avatar={user.avatarURL} />
              </td>
              <td>{user.answersLength}</td>
              <td>{user.questionsLength}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default LeaderBoard;
