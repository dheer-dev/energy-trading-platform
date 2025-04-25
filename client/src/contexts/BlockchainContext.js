// src/contexts/BlockchainContext.js
import { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import EnergyTradingABI from '../contracts/build/contracts/EnergyTrading.json';
import contractAddress from '../contracts/contracts/contract-address.json';

const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAccount(accounts[0]);
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        const energyTrading = new ethers.Contract(
          contractAddress.contractAddress,
          EnergyTradingABI.abi,
          signer
        );
        
        setContract(energyTrading);
        return true; // Return success status
      } catch (error) {
        console.error("Wallet connection error:", error);
        return false;
      }
    } else {
      alert("Please install MetaMask!");
      return false;
    }
  };

  return (
    <BlockchainContext.Provider value={{ contract, account, connectWallet }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};