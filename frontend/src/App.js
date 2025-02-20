import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main";
import Auth from "./pages/Auth";
import Create from "./pages/CreateBlog";
import BlogDetails from "./pages/blogdetails";
import "./style.css";
import "quill/dist/quill.snow.css";

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/create" element={<Create />}/>
        <Route path="/blog/:id" element={<BlogDetails />}/>
      </Routes>
    </Router>
);
}

export default App;
