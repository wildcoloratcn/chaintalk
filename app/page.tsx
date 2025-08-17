'use client';
import { ethers } from 'ethers';
import { useEffect, useState, useCallback } from 'react';

// Define Ethereum window interface
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

const ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_text",
        "type": "string"
      }
    ],
    "name": "addMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllMessages",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "author",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "text",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct MessageWall.Message[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "messages",
    "outputs": [
      {
        "internalType": "address",
        "name": "author",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "text",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "total",
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

const ADDRESS = "0x23ea9d4aC270A0be9E8035bdb9a5c24f8Ff3499d";
const SEPOLIA_CHAIN_ID = '0xaa36a7';

interface Message {
  author: string;
  text: string;
  timestamp: bigint;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState('');
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  // Get network name
  function getNetworkName(chainId: string): string {
    const networks: { [key: string]: string } = {
      '0x1': 'Ethereum Mainnet',
      '0xaa36a7': 'Sepolia Testnet',
      '0x5': 'Goerli Testnet',
      '0x89': 'Polygon Mainnet',
    };
    return networks[chainId] || `Unknown Network (${chainId})`;
  }

  // Check if network is correct
  const checkNetwork = useCallback(async (): Promise<boolean> => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const chainId = await window.ethereum.request({ 
          method: 'eth_chainId' 
        }) as string;
        
        const isCorrect = chainId === SEPOLIA_CHAIN_ID;
        setIsCorrectNetwork(isCorrect);
        setCurrentNetwork(getNetworkName(chainId));
        
        return isCorrect;
      }
      return false;
    } catch (error) {
      console.error('Failed to check network:', error);
      return false;
    }
  }, []);

  // Switch to Sepolia network
  async function switchToSepolia() {
    try {
      if (!window.ethereum) {
        setError('Please install MetaMask');
        return;
      }

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (switchError: unknown) {
      const error = switchError as { code?: number; message?: string };
      if (error.code === 4902) {
        try {
          await window.ethereum?.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: SEPOLIA_CHAIN_ID,
              chainName: 'Sepolia Test Network',
              nativeCurrency: {
                name: 'SepoliaETH',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://sepolia.infura.io/v3/', 'https://rpc.sepolia.org'],
              blockExplorerUrls: ['https://sepolia.etherscan.io/'],
            }],
          });
        } catch (addError) {
          console.error('Failed to add network:', addError);
          setError('Unable to add Sepolia network, please add it manually');
        }
      } else {
        console.error('Failed to switch network:', switchError);
        setError('Failed to switch network: ' + (error.message || 'Unknown error'));
      }
    }
  }

  // Fetch messages list
  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      if (!window || !window.ethereum) {
        setError('Please install MetaMask first');
        return;
      }

      const networkCorrect = await checkNetwork();
      if (!networkCorrect) {
        setError('Please switch to Sepolia testnet');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
      const contract = new ethers.Contract(ADDRESS, ABI, provider);
      const data: Message[] = await contract.getAllMessages();
      setMessages([...data].reverse());
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error('Failed to fetch messages:', error);
      setError('Failed to fetch messages: ' + (err.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [checkNetwork]);

  // Check wallet connection status
  const checkWalletConnection = useCallback(async (): Promise<boolean> => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts' 
        }) as string[];
        
        if (accounts.length > 0) {
          setIsConnected(true);
          setCurrentAccount(accounts[0]);
          await checkNetwork();
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Failed to check wallet connection:', error);
      return false;
    }
  }, [checkNetwork]);

  // Connect wallet
  async function connectWallet() {
    try {
      setError('');
      if (!window || !window.ethereum) {
        setError('Please install MetaMask wallet');
        return;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      }) as string[];
      
      if (accounts.length > 0) {
        setIsConnected(true);
        setCurrentAccount(accounts[0]);
        const networkCorrect = await checkNetwork();
        if (networkCorrect) {
          fetchMessages();
        }
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error('Failed to connect wallet:', error);
      setError(err.message || 'Failed to connect wallet');
    }
  }

  // Send message
  async function sendMessage() {
    if (!text.trim()) {
      setError('Please enter message content');
      return;
    }

    const networkCorrect = await checkNetwork();
    if (!networkCorrect) {
      setError('Please switch to Sepolia testnet');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      if (!window.ethereum) {
        setError('Please install MetaMask');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(ADDRESS, ABI, signer);
      
      const tx = await contract.addMessage(text.trim());
      await tx.wait();
      
      setText('');
      await fetchMessages();
    } catch (error: unknown) {
      const err = error as { 
        code?: number; 
        reason?: string; 
        message?: string; 
      };
      console.error('Failed to send message:', error);
      if (err.code === 4001) {
        setError('User rejected the transaction');
      } else if (err.code === -32603) {
        setError('Transaction failed, please check network connection');
      } else {
        setError('Failed to send message: ' + (err.reason || err.message || 'Unknown error'));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  // Format timestamp
  function formatTimestamp(timestamp: bigint): string {
    return new Date(Number(timestamp) * 1000).toLocaleString('en-US');
  }

  // Format address
  function formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  // Listen for account and network changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: unknown) => {
        const accountsArray = accounts as string[];
        if (accountsArray.length === 0) {
          setIsConnected(false);
          setCurrentAccount('');
          setIsCorrectNetwork(false);
        } else {
          setCurrentAccount(accountsArray[0]);
          setIsConnected(true);
          checkNetwork();
        }
      };

      const handleChainChanged = (chainId: unknown) => {
        const chainIdString = chainId as string;
        const isCorrect = chainIdString === SEPOLIA_CHAIN_ID;
        setIsCorrectNetwork(isCorrect);
        setCurrentNetwork(getNetworkName(chainIdString));
        if (isCorrect && isConnected) {
          fetchMessages();
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [isConnected, checkNetwork, fetchMessages]);

  // Initial check
  useEffect(() => {
    async function init() {
      const connected = await checkWalletConnection();
      if (connected && isCorrectNetwork) {
        fetchMessages();
      }
    }
    init();
  }, [checkWalletConnection, fetchMessages, isCorrectNetwork]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ChainTalk</h1>
                <p className="text-sm text-gray-300">Decentralized Communication Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Powered by Ethereum</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Immutable. Transparent. Decentralized.
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            ChainTalk enables censorship-resistant communication through blockchain technology. 
            Perfect for announcements, testimonials, and transparent community messaging where permanence and authenticity matter.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Immutable Records</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No Central Authority</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Cryptographically Verified</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-8">
              {/* Wallet Connection Status */}
              <div className="mb-8">
                {!isConnected ? (
                  <div className="text-center p-8 border-2 border-dashed border-gray-600 rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
                    <p className="text-gray-300 mb-6">Join the decentralized conversation by connecting your Web3 wallet</p>
                    <button 
                      onClick={connectWallet}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      Connect Wallet
                    </button>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-300">Connected Account</p>
                        <p className="font-mono text-green-400 font-semibold">{formatAddress(currentAccount)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">Connected</span>
                      </div>
                    </div>
                    
                    {/* Network Status */}
                    <div className={`p-4 rounded-lg ${isCorrectNetwork ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Network: {currentNetwork}</p>
                          {!isCorrectNetwork && (
                            <p className="text-red-300 text-sm mt-1">Please switch to Sepolia testnet to continue</p>
                          )}
                        </div>
                        {!isCorrectNetwork && (
                          <button 
                            onClick={switchToSepolia}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors font-medium"
                          >
                            Switch Network
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Message Sending Area */}
              {isConnected && isCorrectNetwork && (
                <div className="mb-8 p-6 bg-white/5 rounded-xl border border-gray-600">
                  <h3 className="text-lg font-semibold text-white mb-4">Share Your Message</h3>
                  <textarea
                    className="w-full p-4 bg-black/20 border border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                    placeholder="Share your thoughts, announcements, or testimonials on the blockchain..."
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={500}
                    disabled={isSubmitting}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-400">
                      {text.length}/500 characters
                    </span>
                    <button 
                      onClick={sendMessage}
                      disabled={isSubmitting || !text.trim()}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Broadcasting...</span>
                        </div>
                      ) : (
                        'Broadcast Message'
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Messages List */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>Message Archive ({messages.length})</span>
                  </h3>
                  {isConnected && isCorrectNetwork && (
                    <button 
                      onClick={fetchMessages}
                      disabled={isLoading}
                      className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm transition-colors font-medium flex items-center space-x-2"
                    >
                      <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>{isLoading ? 'Syncing...' : 'Refresh'}</span>
                    </button>
                  )}
                </div>

                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-300">Syncing with blockchain...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-600 rounded-xl">
                    <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className="text-gray-400 text-lg">
                      {!isConnected ? 'Connect your wallet to view the message archive' :
                       !isCorrectNetwork ? 'Switch to Sepolia network to access messages' :
                       'No messages yet. Be the pioneer to leave the first message!'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold">
                                {message.author.slice(2, 4).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-mono text-blue-400 font-medium text-sm">
                                {formatAddress(message.author)}
                              </p>
                              <p className="text-xs text-gray-400">
                                {formatTimestamp(message.timestamp)}
                              </p>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                            #{messages.length - index}
                          </div>
                        </div>
                        <p className="text-gray-100 leading-relaxed break-words">{message.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* About */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">About ChainTalk</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>A decentralized messaging platform built on Ethereum, designed for:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Corporate announcements requiring immutable records</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Customer testimonials with verified authenticity</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Community messaging without censorship risks</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Transparent communication for DAOs and organizations</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Technical Info */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Technical Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network:</span>
                    <span className="text-white">Ethereum Sepolia</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contract:</span>
                    <span className="text-blue-400 font-mono text-xs">{formatAddress(ADDRESS)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gas Optimized:</span>
                    <span className="text-green-400">✓ Yes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Immutable:</span>
                    <span className="text-green-400">✓ Yes</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Censorship Resistant</p>
                      <p className="text-gray-400 text-xs">Messages stored permanently on blockchain</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Cryptographically Verified</p>
                      <p className="text-gray-400 text-xs">Every message is signed and verified</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Transparent & Open</p>
                      <p className="text-gray-400 text-xs">All messages publicly accessible</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-black/20 backdrop-blur-sm mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold">ChainTalk</p>
                <p className="text-gray-400 text-sm">Decentralized Communication Platform</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">Built with Ethereum, Hardhat, OpenZeppelin, Metamask & Next.js</p>
              <p className="text-gray-500 text-xs">
                Demonstrating Web3 development capabilities • 
                <a href="/about" className="text-blue-400 hover:text-blue-300 transition-colors ml-1">
                  Developer Showcase
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}