import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import DashboardWrapper from './components/DashBoardWrapper';
import NavigationBar from './components/Navbar';
import Logout from './components/Logout';
// import UserWorkoutPage from './components/WorkoutPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <NavigationBar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<DashboardWrapper />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
