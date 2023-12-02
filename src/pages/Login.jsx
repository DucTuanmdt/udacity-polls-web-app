import React, { useEffect, useState } from "react";
import UserInfo from "../components/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, selectUserList } from "../redux/userSlice";
import { login } from "../redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const { isLoading, usersMap: users } = useSelector((state) => state.user);
  const userList = useSelector(selectUserList);
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleSelectUser = (event) => {
    const userId = event.target.value;
    setSelectedUser(users[userId]);
  };

  const handleLogin = () => {
    dispatch(login(selectedUser));
    // navigate to previous link or homepage if there are no history
    const redirectUrl = location.state?.prevUrl || "/";
    navigate(redirectUrl);
  };

  const renderUserDropdown = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    } else if (userList.length > 0) {
      return (
        <div>
          <select
            className="form-select"
            value={selectedUser?.id || "default"}
            onChange={handleSelectUser}
          >
            <option disabled value="default">
              Choose a user to login
            </option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return null;
  };

  return (
    <main className="container mt-5">
      <h1 className="text-center">Login</h1>
      <div
        className="shadow p-5 mt-5 mx-auto d-flex justify-content-center flex-column gap-4 align-items-center rounded-5"
        style={{ maxWidth: "500px" }}
      >
        {renderUserDropdown()}

        {selectedUser !== null && (
          <UserInfo name={selectedUser.name} avatar={selectedUser.avatarURL} />
        )}

        <button
          className="btn btn-primary mt-2"
          disabled={!selectedUser}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </main>
  );
}

export default Login;
