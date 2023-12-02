import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

function NavigationBar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
      <div className="container">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link active" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/leaderboard">
              Leaderboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/add">
              New
            </NavLink>
          </li>
        </ul>

        {!!user ? (
          <div className="d-flex align-items-center gap-2">
            <img
              src={user.avatarURL}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-pill"
            />
            <span>{user.name}</span>
            <button
              className="btn btn-light btn-sm ms-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-light btn-sm ms-2">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
