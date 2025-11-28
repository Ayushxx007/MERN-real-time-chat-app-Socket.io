
import './App.css'

import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.jsx';;
import LogInPage from './pages/LogInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

const App = () => {
  return (
    <div >
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}> </Route>
           <Route path="/signup" element={<SignUpPage/>}> </Route>
           <Route path="/login" element={<LogInPage/>}> </Route>
           <Route path="/settings" element={<SettingsPage/>}> </Route>
           <Route path="/profile" element={<ProfilePage/>}> </Route>
          


        
      </Routes>

    </div>
  )
}

export default App
