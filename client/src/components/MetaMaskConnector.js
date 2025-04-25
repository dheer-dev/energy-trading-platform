import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function MetaMaskConnector({ onConnected }) {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [error, setError] = useState(null);
  const [isGoerli, setIsGoerli] = useState(false);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
  };

  // Switch to Goerli Testnet
  const switchToGoerli = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }], // Goerli chainId
      });
      setIsGoerli(true);
      return true;
    } catch (switchError) {
      // If the network doesn't exist yet in the user's MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x5',
                chainName: 'Goerli Testnet',
                nativeCurrency: {
                  name: 'Goerli ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://goerli.infura.io/v3/'],
                blockExplorerUrls: ['https://goerli.etherscan.io'],
              },
            ],
          });
          setIsGoerli(true);
          return true;
        } catch (addError) {
          setError('Failed to add Goerli network');
          return false;
        }
      }
      setError('Failed to switch to Goerli network');
      return false;
    }
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    setError(null);
    
    if (!isMetaMaskInstalled()) {
      setError('Please install MetaMask first!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      // Check if connected to Goerli
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x5') {
        const switched = await switchToGoerli();
        if (!switched) return;
      } else {
        setIsGoerli(true);
      }

      setAccount(accounts[0]);
      setIsConnected(true);
      if (onConnected) onConnected(accounts[0]);
    } catch (err) {
      setError(err.message || 'Failed to connect to MetaMask');
    }
  };

  // Handle account/chain changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        if (onConnected) onConnected(accounts[0]);
      } else {
        setIsConnected(false);
        setAccount('');
      }
    };

    const handleChainChanged = (chainId) => {
      setIsGoerli(chainId === '0x5');
      window.location.reload(); // Recommended by MetaMask docs
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [onConnected]);

  // Check connection on load
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled() && window.ethereum.selectedAddress) {
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          });
          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            setAccount(accounts[0]);
            setIsConnected(true);
            setIsGoerli(chainId === '0x5');
            if (onConnected) onConnected(accounts[0]);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    checkConnection();
  }, [onConnected]);

  return (
    <div className="space-y-2">
      {isConnected ? (
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium">
            {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
          </span>
          {!isGoerli && (
            <span className="text-xs text-yellow-600">(Switch to Goerli)</span>
          )}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Connect MetaMask
        </button>
      )}
      
      {error && (
        <div className="text-red-500 text-sm mt-1 p-2 bg-red-50 rounded">
          {error}
        </div>
      )}
    </div>
  );
}