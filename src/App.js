import "./index.css";
import Register from "./Register";
import Signup from "./Signup.js";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./Contact.js";
export default function App() {
  return(
    <div className="App">
      <Router>
      <Routes>
      <Route exact path = "/" element={<Signup />} />
      <Route path = "/home" element={<Home />} />
      <Route path = "/register" element={<Register />} />
      <Route path = "/contact" element={<Contact />} />
      </Routes>
      </Router>
    </div>
  );
}
