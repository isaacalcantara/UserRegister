import FormSignin from "./components/FormSignin";
import FormSignup from "./components/FormSignup";
import Home from "./components/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="container">
        <div className="container-login">
          <Router>
            <Routes>
              <Route path="/" element={<FormSignin />} />
              <Route path="/register" element={<FormSignup />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </Router>
        </div>
    </div>
  )
}

export default App
