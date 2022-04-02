import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={< Home />}/>
          <Route path='/login' element={ <Login/>}/> 
        </Routes>
        <ToastContainer/>
      </Router>

    </>
  );
}

export default App;
