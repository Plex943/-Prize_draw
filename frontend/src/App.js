import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UserProvider } from './context/UserContext';

import Home from "./components/home"
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
