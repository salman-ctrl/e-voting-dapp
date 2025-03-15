import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './Constant/constan';
import Login from './Components/Login';
import Connected from './Components/Connected';
import Swal from 'sweetalert2'
import { func } from 'prop-types';

const App = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingRime, setRemainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);


  useEffect(() => {
    getCandidate();
    getRemainingTime();
    getCurrentStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountChanged', handleAccountChange);
      }
    }
  }, []);

  async function getCandidate() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );

    const candidateList = await contractInstance.getAllVotesOfCandiates();
    const formattedCandidates = candidateList.map((candidate, index) => {
      return {
        index: index,
        name: candidate.name,
        voteCount: candidate.toNumber()
      }
    });

    setCandidates(formattedCandidates);
    console.log(candidateList);
  }


  async function getCurrentStatus() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );

    const status = await contractInstance.getVotingStatus();
    console.log(status);
    setVotingStatus(status);
  }

  async function getRemainingTime() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const time = await contractInstance.getRemainingTime();
    setRemainingTime(parseInt(time, 16));
  }

  const handleAccountChange = (accounts) => {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        // Untuk ethe rs v6
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);


        Swal.fire({
          title: "Metamask Anda sudah terhubung",
          icon: "success",
          draggable: true
        });
        console.log("Metamask Connected: " + address);
        setIsConnected(true);
      } catch (err) {
        console.log(err);
      }
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sepertinya Metamask tidak Terdeteksi di Browser ini",
        footer: '<a href="#">Butuh Bantuan?</a>'
      });
      console.error("Metamask is not detected in the browser");
    }
  }

  return (
    <div className='w-screen h-screen justify-center flex-col flex items-center'>
      {isConnected ? <Connected address={account} /> : <Login connectWallet={connectToMetamask} />}
    </div>
  )
}

export default App