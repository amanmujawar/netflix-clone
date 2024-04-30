import React, { useEffect } from 'react'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Player from './pages/Player/Player.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In");
        // Skip redirection if the user is already logged in
        if (window.location.pathname === '/login') {
          navigate('/');
        }
      } else {
        console.log("Logged Out");
        navigate('/login');
      }
    });
  
    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, [navigate]);
  

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  )
}

export default App;
