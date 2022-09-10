import { useState } from 'react'
import FormSignin from "./components/FormSignin";
import FormSignup from "./components/FormSignup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './style.css';

function App() {

  return (
    <div className="container">
        <div className="container-login">
          <Router>
            <Routes>
              <Route path="/" element={<FormSignin />} />
              <Route path="/register" element={<FormSignup />} />
            </Routes>
          </Router>
        </div>
    </div>
  )
}

export default App
