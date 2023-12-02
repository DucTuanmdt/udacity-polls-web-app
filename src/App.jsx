import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LeaderBoard from "./pages/LeaderBoard";
import CreatePoll from "./pages/CreatePoll";
import StandardLayout from "./layouts/StandardLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PollDetail from "./pages/PollDetail";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<StandardLayout />}>
        <Route index element={<Home />} />
        <Route path="leaderboard" element={<LeaderBoard />} />
        <Route path="add" element={<CreatePoll />} />
        <Route path="questions/:question_id" element={<PollDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
