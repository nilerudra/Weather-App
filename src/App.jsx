import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from "./components/Main";
import Weather from "./components/Weather";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;
