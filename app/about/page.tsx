'use client';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Developer Showcase</h1>
                <p className="text-sm text-gray-300">Full-Stack Web3 Development Capabilities</p>
              </div>
            </div>
            <a
              href="/"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
            >
              ← Back to App
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            ChainTalk: A Complete Web3 Development Demonstration
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-4xl mx-auto">
            This project showcases comprehensive blockchain development skills, from smart contract architecture 
            to modern frontend integration, demonstrating production-ready Web3 development capabilities.
          </p>
        </div>

        {/* Technical Architecture */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-8 h-8 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Smart Contract Development
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Solidity Smart Contract</h4>
                  <p className="text-gray-300 text-sm">Custom MessageWall contract with gas-optimized storage and retrieval functions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">OpenZeppelin Integration</h4>
                  <p className="text-gray-300 text-sm">Leveraged battle-tested security patterns and contract standards</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Hardhat Development</h4>
                  <p className="text-gray-300 text-sm">Professional testing, deployment, and debugging environment setup</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-8 h-8 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Frontend Development
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Next.js 14 + TypeScript</h4>
                  <p className="text-gray-300 text-sm">Modern React framework with type safety and optimized performance</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Web3 Integration</h4>
                  <p className="text-gray-300 text-sm">ethers.js v6 for blockchain interaction with comprehensive error handling</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Responsive UI/UX</h4>
                  <p className="text-gray-300 text-sm">Tailwind CSS with modern design patterns and mobile optimization</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Competencies */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 mb-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Core Development Competencies Demonstrated</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Full-Stack Architecture</h4>
              <p className="text-gray-300 text-sm">End-to-end application design from smart contract to user interface</p>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Security Best Practices</h4>
              <p className="text-gray-300 text-sm">OpenZeppelin standards, input validation, and secure transaction handling</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Performance Optimization</h4>
              <p className="text-gray-300 text-sm">Gas-efficient smart contracts and optimized frontend loading</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">User Experience Design</h4>
              <p className="text-gray-300 text-sm">Intuitive Web3 onboarding and seamless wallet integration</p>
            </div>

            <div className="bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-xl p-6 border border-red-500/30">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Testing & Deployment</h4>
              <p className="text-gray-300 text-sm">Comprehensive testing on Sepolia testnet with CI/CD readiness</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl p-6 border border-indigo-500/30">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Data Management</h4>
              <p className="text-gray-300 text-sm">Efficient on-chain storage and real-time blockchain data synchronization</p>
            </div>
          </div>
        </div>

        {/* Technology Stack Deep Dive */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Blockchain Infrastructure</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Smart Contract</span>
                <span className="text-green-400 font-mono text-sm">Deployed & Verified</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Network</span>
                <span className="text-blue-400 font-medium">Sepolia Testnet</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Infrastructure</span>
                <span className="text-purple-400 font-medium">Alchemy</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Development</span>
                <span className="text-yellow-400 font-medium">Hardhat</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Frontend Technologies</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Framework</span>
                <span className="text-blue-400 font-medium">Next.js 14</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Language</span>
                <span className="text-blue-400 font-medium">TypeScript</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Styling</span>
                <span className="text-cyan-400 font-medium">Tailwind CSS</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Web3 Library</span>
                <span className="text-green-400 font-medium">ethers.js v6</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Highlights */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/30 p-8 mb-12">
          <h3 className="text-3xl font-bold text-white mb-6 text-center">Why This Project Demonstrates Professional Competency</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Technical Excellence</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1">▶</span>
                  <span><strong>Production-Ready Code:</strong> Type-safe TypeScript with comprehensive error handling</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1">▶</span>
                  <span><strong>Gas Optimization:</strong> Efficient smart contract design minimizing transaction costs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1">▶</span>
                  <span><strong>Security Focus:</strong> OpenZeppelin patterns and secure wallet integration</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1">▶</span>
                  <span><strong>Modern Architecture:</strong> Latest Next.js features with optimized performance</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Industry Best Practices</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="text-purple-400 mt-1">▶</span>
                  <span><strong>Professional Tooling:</strong> Hardhat for development, testing, and deployment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-purple-400 mt-1">▶</span>
                  <span><strong>Real Network Testing:</strong> Deployed and tested on live Sepolia testnet</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-purple-400 mt-1">▶</span>
                  <span><strong>User Experience:</strong> Intuitive Web3 onboarding with clear feedback</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-purple-400 mt-1">▶</span>
                  <span><strong>Documentation:</strong> Comprehensive README and code documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Ready for Production Web3 Development</h3>
          <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
            This project demonstrates the complete skill set required for modern blockchain development, 
            from smart contract architecture to production-ready frontend applications. 
            Every component showcases professional development practices and industry standards.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Try Live Demo
            </a>
            <a
              href="https://github.com/wildcoloratcn/chaintalk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>View Source Code</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
} 