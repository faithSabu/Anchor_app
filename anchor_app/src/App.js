import './App.css';
import Login from './pages/User/Login';
import Signup from './pages/User/Signup';
import ProtectecdRoutes from './components/User/ProtectecdRoutes';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/User/Home';
import AdminProtectedRoutes from './components/Admin/AdminProtectedRoutes';
import Profile from './pages/User/Profile';
import ProfileSettings from './pages/User/ProfileSettings';
import ChangePassword from './pages/User/ChangePassword';
import OTP from './pages/User/OTP';
import Chat from './pages/User/Chat';
import UserProfile from './pages/User/UserProfile';
import React from 'react';
import Notifications from './pages/User/Notifications';
import ErrorPage from './pages/User/ErrorPage';
import PageNotFound from './pages/User/PageNotFound';
import AdminLogin from './pages/Admin/AdminLogin';
import Dashboard from './pages/Admin/Dashboard';
import BlockedPosts from './pages/Admin/BlockedPosts';

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
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/notifications' element={<Notifications />} />
        </Route>
        <Route path='/error' element={<ErrorPage/>} />
        <Route path='/notFound' element={<PageNotFound/>} />
        <Route path='admin/login' element={<AdminLogin />}></Route>
        <Route element={<AdminProtectedRoutes />}>
          <Route path='admin' element={<Dashboard />}></Route>
          <Route path='/blockedPosts' element={<BlockedPosts />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
