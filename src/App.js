import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Log from "./Components/Log";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logs" element={<Log />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
