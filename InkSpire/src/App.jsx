import { useEffect, useState } from 'react'
import './App.css'
import authServise from './appWrite/authServise';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import {Header, Footer} from './components/index';

import { Component } from 'react';
function App() {
  const[loading, setLoading] =useState(false);
  const dispatch= useDispatch();

  useEffect(()=>{
    authServise.getCurrentUser()
    .then((userData)=> {
      if(userData) dispatch(login({userData}));
        else dispatch(logout());
    })
    .finally(()=>setLoading(false));
  });
   return !loading? (
   <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    
    <div className='w-full block'>
      <Header />
      <main>
        <div>Hi, This is my react app</div>
        {/* <Outlet /> */}
      </main>
      <Footer />

    </div>
   </div>): null;
}

export default App
