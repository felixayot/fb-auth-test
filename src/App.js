import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { auth } from './components/firebase';
import ResetRequest from './components/ResetRequest';
import ResetPassword from './components/ResetPassword';
function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])
  return (
    <Router>
    <Routes>
    <Route path="/" element={user ? <Navigate to="/profile" /> : 
      <article>
        <h1>Welcome to Firebase Authentication on a React App</h1>
          <p>
      This is a simple React app that demonstrates how to use Firebase Authentication in a React app.
          </p>
        <button onClick={() => window.location.href = "/register"}>Register</button><br /><br />
        <button onClick={() => window.location.href = "/login"}>Login</button>
      </article>}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />}/>
    {/* <Route path="/login" element={<Login />}/> */}
    <Route path="/profile" element={user ?  <Profile /> : <Navigate to="/login" />} />
    <Route path="/request_password_reset" element={<ResetRequest />} />
    <Route path="/reset_password" element={<ResetPassword />} />
    <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
    <ToastContainer />
    </Router>
  );
}

export default App;
