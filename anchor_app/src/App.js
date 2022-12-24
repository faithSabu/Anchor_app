import './App.css';
import Login from './pages/User/Login';
import AdminLogin from './pages/Admin/Login/AdminLogin';
import Signup from './pages/User/Signup';
import ProtectecdRoutes from './components/User/ProtectecdRoutes';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/User/Home';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import AdminProtectedRoutes from './components/Admin/AdminProtectedRoutes';
import Profile from './pages/User/Profile';
import ProfileSettings from './pages/User/ProfileSettings';
import ChangePassword from './pages/User/ChangePassword';
import OTP from './pages/User/OTP';
import Chat from './pages/User/Chat';
import UserProfile from './pages/User/UserProfile';
import React from 'react';
import Notifications from './pages/User/Notifications';
import ChatTest from './pages/User/ChatTest';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='otp' element={<OTP />} />
        <Route element={<ProtectecdRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='/profileSettings' element={<ProfileSettings />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/chattest' element={<ChatTest />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/notifications' element={<Notifications />} />
        </Route>
        <Route path='admin/login' element={<AdminLogin />}></Route>
        <Route element={<AdminProtectedRoutes />}>
          <Route path='admin' element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
