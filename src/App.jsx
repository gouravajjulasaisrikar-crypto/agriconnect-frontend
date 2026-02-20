import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Farmer from "./Farmer";
import Expert from "./Expert";
import Admin from "./Admin";
import PublicPage from "./PublicPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/expert" element={<Expert />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/public" element={<PublicPage />} />
      </Routes>
    </Router>
  );
}

export default App;