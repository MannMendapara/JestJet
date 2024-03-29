import './App.css';
import React from 'react';
import Signup from './components/Signup.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { AuthProvider } from './Context/AuthContext';
import Feed from './components/Feed';
import Profile from './components/Profile.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/' element={<Feed />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
