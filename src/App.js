import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './screens/Home.js';
import Login from './screens/Login.js';
import Register from './screens/Register.js';
import Details from './screens/Details.js';
import CreateGrp from './screens/CreateGrp.js';
import Mygrps from './screens/Mygrps.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:groupId" element={<Details />} />
        <Route path="/creategrp" element={<CreateGrp />} />
        <Route path="/mygrps" element={<Mygrps />} />
      </Routes>
    </Router>
  );
}

export default App;
