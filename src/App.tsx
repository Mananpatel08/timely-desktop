
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Worklog } from "./routes";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/worklog" element={<Worklog />} />
      </Routes>
    </Router>
  )
}

export default App
