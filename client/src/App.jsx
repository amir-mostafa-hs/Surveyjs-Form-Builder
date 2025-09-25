import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import FormBuilder from "./pages/FormBuilder";
import FormViewer from "./pages/FormViewer";
import Responses from "./pages/Responses";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<FormBuilder />} />
        <Route path="/builder/:id" element={<FormBuilder />} />
        <Route path="/form/:slug" element={<FormViewer />} />
        <Route path="/responses/:formId" element={<Responses />} />
      </Routes>
    </Router>
  );
}

export default App;
