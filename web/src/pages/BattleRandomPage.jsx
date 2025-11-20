import React, { useState, useEffect } from 'react'

function BattleRandomPage({ navigateTo }) {
  const [findingOpponent, setFindingOpponent] = useState(true)
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    if (!findingOpponent) return
    const findTimer = setTimeout(() => {
      setFindingOpponent(false)
      setCountdown(3)
    }, 3000)
    return () => clearTimeout(findTimer)
  }, [findingOpponent])

  useEffect(() => {
    if (findingOpponent || countdown <= 0) return
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [findingOpponent, countdown])

  useEffect(() => {
    if (!findingOpponent && countdown === 0) {
      const roomId = 'room_' + Math.random().toString(36).substr(2, 9)
      navigateTo(`/battle/room?id=${roomId}`)
    }
  }, [findingOpponent, countdown, navigateTo])

  return (
    <div className="p-8 pt-24 pl-28 lg:pl-28 min-h-screen bg-gray-900 text-gray-100 font-inter flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-indigo-400 mb-8">Battle with Random Opponent</h1>
      {findingOpponent ? (
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-xl text-gray-300">Finding Opponent...</p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Opponent Found!</h2>
          <p className="text-xl text-white mb-6">
            Starting battle in <span className="font-bold text-indigo-400">{countdown}</span>...
          </p>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-indigo-700 inline-block">
            <p className="text-lg text-gray-300">
              You are matched with: <span className="font-bold text-blue-400">ProCoder77</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BattleRandomPage
