import { useState } from 'react'
import FormSignin from "./components/FormSignin";
import FormSignup from "./components/FormSignup";
import Home from "./components/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Private =({Item}) => {
  const signed = 1;

  return signed > 0 ? <Item /> : <FormSignin />
}

function App() {

  return (
    <div className="container">
        <div className="container-login">
          <Router>
            <Routes>
              <Route path="/" element={<FormSignin />} />
              <Route path="/register" element={<FormSignup />} />
              <Route exact path="/home" element={<Private Item={Home} />} />
            </Routes>
          </Router>
        </div>
    </div>
  )
}

export default App
