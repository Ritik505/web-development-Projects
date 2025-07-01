import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import ManagerSection from './components/ManagerSection';
import ParticipantSetup from './components/ParticipantSetup';
import GameSection from './components/GameSection';
import StatusSection from './components/StatusSection';

function LotteryGame() {
  const [web3, setWeb3] = useState(null);
  const [lotteryContract, setLotteryContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [contractBalance, setContractBalance] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Welcome to the Blockchain Lottery!');

  const selectNumber = async (number) => {
    if (!lotteryContract || !currentAccount) {
      setStatusMessage('Contract or account not available.');
      return;
    }
    try {
      setStatusMessage(`Selecting number ${number}...`);
      await lotteryContract.methods.selectNumber(number).send({ from: currentAccount });
      setStatusMessage(`Successfully selected number ${number}!`);
    } catch (error) {
      console.error('Error selecting number:', error);
      setStatusMessage('Error selecting number. See console for details.');
    }
  };

  const determineWinner = async () => {
    if (!lotteryContract || !currentAccount) {
      setStatusMessage('Contract or account not available.');
      return;
    }
    try {
      setStatusMessage('Determining winner...');
      await lotteryContract.methods.determineWinner().send({ from: currentAccount });
      setStatusMessage('Winner determined!');
    } catch (error) {
      console.error('Error determining winner:', error);
      setStatusMessage('Error determining winner. See console for details.');
    }
  };

  const buyTicket = async () => {
    if (!lotteryContract || !currentAccount || !web3) {
      setStatusMessage('Contract, account, or Web3 not available.');
      return;
    }
    try {
      setStatusMessage('Purchasing ticket...');
      const ticketPrice = web3.utils.toWei('0.01', 'ether'); // Example price
      await lotteryContract.methods.buyTicket().send({ from: currentAccount, value: ticketPrice });
      setStatusMessage('Ticket purchased successfully!');
      await updateContractBalance(lotteryContract, web3);
    } catch (error) {
      console.error('Error buying ticket:', error);
      setStatusMessage('Error buying ticket. See console for details.');
    }
  };

  const contractAddress = '0x712F433E4158Afb20A6c2d3f8621289C54af3E96';
  const contractABI = [
    {
      "inputs": [],
      "name": "buyTicket",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "determineWinner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "FundsTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "participant",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "number",
          "type": "uint8"
        }
      ],
      "name": "NumberSelected",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "participant",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "index",
          "type": "uint8"
        }
      ],
      "name": "ParticipantAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "number",
          "type": "uint8"
        }
      ],
      "name": "selectNumber",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[3]",
          "name": "_participants",
          "type": "address[3]"
        }
      ],
      "name": "startGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "participant",
          "type": "address"
        }
      ],
      "name": "TicketPurchased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "winner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "winningNumber",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "prize",
          "type": "uint256"
        }
      ],
      "name": "WinnerDeclared",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "gameEnded",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gameStarted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAvailableNumbers",
      "outputs": [
        {
          "internalType": "uint8[]",
          "name": "",
          "type": "uint8[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getContractBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  // Initialize Web3 and contract
  useEffect(() => {
    let mounted = true;
    let web3Instance = null;

    const init = async () => {
      try {
        console.log("Initializing Web3...");
        console.log("Contract address:", contractAddress);
        
        if (window.ethereum) {
          web3Instance = new Web3(window.ethereum);
          
          if (mounted) {
            setWeb3(web3Instance);
          }
          
          try {
            const accounts = await window.ethereum.request({ 
              method: 'eth_accounts' 
            });
            
            console.log("Connected accounts:", accounts);
            
            if (accounts.length === 0) {
              const requestedAccounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
              });
              
              if (mounted) {
                if (requestedAccounts.length === 0) {
                  setStatusMessage('Please connect at least one account in MetaMask');
                  return;
                }
                
                setAccounts(requestedAccounts);
                setCurrentAccount(requestedAccounts[0]);
              }
            } else {
              if (mounted) {
                setAccounts(accounts);
                setCurrentAccount(accounts[0]);
              }
            }
            
            if (mounted) {
              const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
              
              try {
                await contractInstance.methods.gameStarted().call();
                
                setLotteryContract(contractInstance);
                
                window.ethereum.on('accountsChanged', (newAccounts) => {
                  if (newAccounts.length === 0) {
                    setStatusMessage('Please connect your MetaMask account');
                  } else {
                    setAccounts(newAccounts);
                    setCurrentAccount(newAccounts[0]);
                    setStatusMessage('Account changed. Ready to continue.');
                  }
                });

                window.ethereum.on('chainChanged', () => {
                  window.location.reload();
                });
                
                try {
                  const networkId = await web3Instance.eth.net.getId();
                  console.log("Connected to network ID:", networkId);
                  
                  if (networkId !== 1 && networkId !== 3 && networkId !== 4 && networkId !== 5 && networkId !== 42) {
                    console.log("Not connected to a standard Ethereum network. If using a local network, make sure your contract is deployed there.");
                  }
                } catch (error) {
                  console.error("Error getting network info:", error);
                }
                
                try {
                  const isGameStarted = await contractInstance.methods.gameStarted().call();
                  const isGameEnded = await contractInstance.methods.gameEnded().call();
                  
                  if (mounted) {
                    setGameStarted(isGameStarted);
                    setGameEnded(isGameEnded);
                    
                    await updateContractBalance(contractInstance, web3Instance);
                  }
                } catch (error) {
                  console.error("Error checking game status:", error);
                  if (mounted) {
                    setStatusMessage('Error reading contract state. Please check your network connection.');
                  }
                }
              } catch (error) {
                console.error("Error verifying contract:", error);
                if (mounted) {
                  setStatusMessage('Error: Contract not found at the specified address. Please check your network connection and contract address.');
                }
              }
            }
          } catch (error) {
            if (error.code === 4001) {
              if (mounted) {
                setStatusMessage('Please connect your MetaMask wallet to use this application');
              }
            } else {
              console.error("MetaMask connection error:", error);
              if (mounted) {
                setStatusMessage('Error connecting to MetaMask. Please check console for details.');
              }
            }
          }
        } else {
          if (mounted) {
            setStatusMessage('Please install MetaMask extension to use this application');
          }
        }
      } catch (error) {
        console.error("Error initializing Web3:", error);
        if (mounted) {
          setStatusMessage('Error connecting to blockchain. Please check console for details.');
        }
      }
    };
    
    init();

    return () => {
      mounted = false;
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  const updateContractBalance = async (contract, web3Instance) => {
    if (contract && web3Instance) {
      try {
        const balance = await contract.methods.getContractBalance().call();
        const balanceInEth = web3Instance.utils.fromWei(balance, 'ether');
        setContractBalance(balanceInEth);
      } catch (error) {
        console.error("Error updating contract balance:", error);
      }
    }
  };

  const startGame = async (participantAddresses) => {
    try {
      if (!lotteryContract) {
        setStatusMessage('Error: Contract not initialized. Please check your connection.');
        return;
      }
      
      if (!currentAccount) {
        setStatusMessage('Error: No account connected. Please connect your MetaMask wallet.');
        return;
      }
      
      console.log("Starting game with participants:", participantAddresses);
      console.log("Current account:", currentAccount);
      
      setStatusMessage('Starting game...');
      
      setGameStarted('loading');
      
      await lotteryContract.methods.startGame(participantAddresses)
        .send({ from: currentAccount });
      
      setParticipants(participantAddresses);
      setGameStarted(true);
      setStatusMessage('Game started successfully!');
    } catch (error) {
      console.error("Error starting game:", error);
      setGameStarted(false);
      
      if (error.message && error.message.includes('User denied transaction signature')) {
        setStatusMessage('Transaction was rejected in MetaMask. Please approve the transaction to start the game.');
      } else if (error.message && error.message.includes('revert')) {
        setStatusMessage('Contract error: ' + error.message);
      } else {
        setStatusMessage('Error starting game. Please check console for details.');
      }
    }
  };

  return (
    <div className="LotteryApp">
      <header className="LotteryApp-header">
        <h1>Blockchain Lottery</h1>
        <StatusSection 
          message={statusMessage} 
          account={currentAccount} 
          balance={contractBalance} 
          gameStarted={gameStarted}
          gameEnded={gameEnded}
        />
      </header>
      <main className="container">
        <ParticipantSetup 
          onStart={startGame} 
          disabled={gameStarted} 
          web3={web3}
        />
        <GameSection 
          participants={participants}
          onSelectNumber={selectNumber}
          disabled={!gameStarted || gameEnded}
          lotteryContract={lotteryContract}
          currentAccount={currentAccount}
          web3={web3}
        />
        <ManagerSection 
          onDetermineWinner={determineWinner}
          onBuyTicket={buyTicket}
          disabled={!gameStarted || gameEnded}
          lotteryContract={lotteryContract}
          currentAccount={currentAccount}
        />
      </main>
    </div>
  );
}

export default LotteryGame;
