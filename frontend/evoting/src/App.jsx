import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './Constant/constan';
import Login from './Components/Login';
import Connected from './Components/Connected';
import Swal from 'sweetalert2'
import { func, number } from 'prop-types';
import Finished from './Components/Finished';

const App = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);


  useEffect(() => {
    setVotingStatus(false)
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


  async function canVote() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );

    const voteStatus = await contractInstance.voters(await signer.getAddress());
    setCanVote(voteStatus);
  }


  async function getCandidate() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress, contractAbi, signer
      );

      const candidateList = await contractInstance.getAllVotesOfCandiates();
      console.log("Data kandidat dari kontrak:", candidateList);

      // Konversi Proxy ke array normal
      const formattedCandidates = Array.from(candidateList).map((candidate, index) => ({
        index: index,
        name: candidate[0],
        voteCount: Number(candidate[1])
      }));

      console.log("Data kandidat setelah diformat:", formattedCandidates);
      setCandidates(formattedCandidates);
    } catch (error) {
      console.error("Error dalam getCandidate:", error);
    }
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

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  async function getRemainingTime() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
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
      canVote();
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
        canVote();
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

      {votingStatus ? (isConnected ? (<Connected
        address={account}
        candidate={candidates}
        remainingTime={remainingTime}
        number={number}
        handleNumberChange={handleNumberChange}
        voteFunction={vote}
        showButton={canVote} />)

        : (<Login connectWallet={connectToMetamask} />)) : <Finished />}
    </div>
  );
}

export default App;