import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import HomePage from "./pages/HomePage";
import PostDetails from "./components/PostDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/blog" element={<BlogPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
