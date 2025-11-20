import React from 'react'

function BattleOverviewPage({ navigateTo }) {
  const startQuickBattle = () => {
    const roomId = 'room_' + Math.random().toString(36).substr(2, 9)
    navigateTo(`/battle/room?id=${roomId}`)
  }

  return (
    <div className="p-8 pt-24 pl-28 lg:pl-28 min-h-screen bg-gray-900 text-gray-100 font-inter">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">Battle Arena</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-indigo-700 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Quick Battle</h2>
          <p className="text-gray-300 mb-6">Start a battle room instantly! Share the link with friends.</p>
          <button
            onClick={startQuickBattle}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Start Quick Battle
          </button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-indigo-700 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Battle with Friends</h2>
          <p className="text-gray-300 mb-6">Challenge your friends to a coding duel!</p>
          <button
            onClick={() => navigateTo('/battle/friends')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go to Friend Battles
          </button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-indigo-700 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Battle with Random</h2>
          <p className="text-gray-300 mb-6">Test your skills against a random opponent!</p>
          <button
            onClick={() => navigateTo('/battle/random')}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Find Random Opponent
          </button>
        </div>
      </div>
    </div>
  )
}

export default BattleOverviewPage
