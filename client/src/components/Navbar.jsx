import React from 'react'
import '../App.css'

function Navbar(){
  return (
    <>
          <nav className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
              </div>
              <div className="ml-4">
                <h1 className="text-white font-semibold text-lg">AI Assistant</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>
    
    </>
  )
}

export default Navbar;