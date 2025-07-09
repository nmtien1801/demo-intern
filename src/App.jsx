import { useState } from 'react'
import './App.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from './components/header';

function App() {

  return (
    <Router>
      <div className="">
        {/* Header */}
        <div className=""
          style={{ zIndex: 1050 }}>
          <Header />
        </div>

        {/* NavbarLeft */}
        <div className=""
          style={{ marginTop: "80px" }}>


          {/* Nội dung chính */}
          <div className="">
            <Routes>
              {/* <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ResetPassword />} /> */}



            </Routes>
          </div>
        </div>
      </div>

      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
    </Router>
  )
}

export default App
