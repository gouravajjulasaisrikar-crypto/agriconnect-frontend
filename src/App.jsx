import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Farmer from "./Farmer";
import Expert from "./Expert";
import Admin from "./Admin";
import PublicPage from "./PublicPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/expert" element={<Expert />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/public" element={<PublicPage />} />
      </Routes>
    </BrowserRouter>
  );
}