import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
