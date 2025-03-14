import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './Constant/constan';
import Login from './Components/Login';

import React from 'react'

const App = () => {
  return (
    <div>
      <Login />

    </div>
  )
}

export default App
