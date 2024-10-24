import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UserProvider } from './context/UserContext';

import NavBar from './components/layout/NavBar';
import Conteiner from './components/layout/Conteiner';
import Paths from './components/layout/Paths';
import Home from "./components/home"
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import AddEvent from './components/pages/Events/AddEvent';

function App() {
  return (
    <Router>
      <UserProvider>
        <NavBar />
        <Conteiner>
          <Paths />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/event/add" element={<AddEvent />} />
          </Routes>
        </Conteiner>
      </UserProvider>
    </Router>
  );
}

export default App;
