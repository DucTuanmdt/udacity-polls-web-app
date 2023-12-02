import React from "react";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main>
      <NavigationBar />

      <div className="container text-center py-4">
        <h3 className="text-center mb-4 mt-5">404 - PAGE NOT FOUND</h3>
        <Link to="/">
          <button className="btn btn-primary btn-sm">Go to Homepage</button>
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
