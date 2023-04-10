import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./Account";
import "./App.css";
import PostDetails from "./components/PostDetails";
import Login from "./components/userManagement/Login";
import Register from "./components/userManagement/Register";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Status from "./Status";
function App() {
  return (
    <BrowserRouter>
      <Account>
        <Status />
        <Routes>
          <Route index path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/login" element={<Login />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Account>
    </BrowserRouter>
  );
}

export default App;
