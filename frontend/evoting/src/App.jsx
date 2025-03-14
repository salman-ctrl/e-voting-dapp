import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './Constant/constan';
import Login from './Components/Login';


import React from 'react'
import LandingPage from './Components/LandingPage';

const App = () => {
  return (
    <div>
      <Login />
      <LandingPage />

    </div>
  )
}

export default App
