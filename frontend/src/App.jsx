
import './App.css'

import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.jsx';;
import LogInPage from './pages/LogInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import  {useAuthStore}  from './Store/useAuthStore.js';
import {useEffect} from "react";
import {Loader} from "lucide-react";
import { Navigate } from 'react-router-dom';

const App = () => {

  const {authUser,checkAuth,isCheckingAuth} =useAuthStore();

  useEffect(()=>{
    checkAuth();

  },[]);

  console.log({authUser}); //frontend..

  if(isCheckingAuth && !authUser){

    return (
      <div className="flex items-center justify-center h-screen">

        <Loader className="size-10 animate-spin"></Loader>

       
      </div>
   
  
  );

  }


  





  return (
    <div >

      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> :<Navigate to="/login" />}> </Route>
           <Route path="/signup" element={!authUser ? <SignUpPage/> :<Navigate to="/" />}> </Route>
           <Route path="/login" element={!authUser ? <LogInPage/> :<Navigate to="/" />}> </Route>
           <Route path="/settings" element={authUser ? <SettingsPage/> :<Navigate to="/login" />}> </Route>
           <Route path="/profile" element={authUser ? <ProfilePage/> :<Navigate to="/login" />}> </Route>
      </Routes>

    </div>
  )
}

export default App;
