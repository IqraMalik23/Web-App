import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Onboard from "./pages/Onboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="h-[100vh] w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
