import React, { useState } from 'react'

function BattleFriendsPage({ navigateTo }) {
  const [friends, setFriends] = useState([
    { id: 1, name: 'ProCoder77', online: true, invited: false },
    { id: 2, name: 'AlgoMaster', online: true, invited: false },
    { id: 3, name: 'DebugDiva', online: false, invited: false },
    { id: 4, name: 'CodeNinja', online: true, invited: false },
  ])
  const [searchFriend, setSearchFriend] = useState('')

  const invitedFriends = friends.filter(f => f.invited)

  const toggleInvite = id => {
    setFriends(friends.map(f => (f.id === id ? { ...f, invited: !f.invited } : f)))
  }

  const handleStartBattle = () => {
    const roomId = 'room_' + Math.random().toString(36).substr(2, 9)
    navigateTo(`/battle/room?id=${roomId}`)
  }

  return (
    <div className="p-8 pt-24 pl-28 lg:pl-28 min-h-screen bg-gray-900 text-gray-100 font-inter">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">Battle with Friends</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg border border-indigo-700">
          <h2 className="text-xl font-semibold text-white mb-4">Your Friends</h2>
          <input
            type="text"
            placeholder="Search friends..."
            value={searchFriend}
            onChange={e => setSearchFriend(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
            {friends
              .filter(f => f.name.toLowerCase().includes(searchFriend.toLowerCase()))
              .map(friend => (
                <div
                  key={friend.id}
                  className={`flex items-center justify-between p-3 rounded-md ${
                    friend.online ? 'bg-gray-700' : 'bg-gray-700 opacity-70'
                  } ${friend.invited ? 'border-l-4 border-green-500' : ''}`}
                >
                  <div className="flex items-center">
                    <span
                      className={`block w-3 h-3 rounded-full mr-2 ${
                        friend.online ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    ></span>
                    <span className="font-medium text-white">{friend.name}</span>
                  </div>
                  <button
                    onClick={() => toggleInvite(friend.id)}
                    disabled={!friend.online}
                    className={`px-3 py-1 text-sm rounded-md ${
                      friend.online
                        ? friend.invited
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-500 cursor-not-allowed'
                    } text-white transition duration-200`}
                  >
                    {friend.online ? (friend.invited ? 'Uninvite' : 'Invite') : 'Offline'}
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg border border-indigo-700 flex flex-col">
          <h2 className="text-xl font-semibold text-white mb-4">Battle Room Details</h2>
          <p className="text-gray-300 text-sm mb-4">
            This is a simplified React version. You can extend it later to sync room details via Firebase
            or your WebSocket server.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3">Invited Players ({invitedFriends.length})</h3>
          <div className="bg-gray-700 p-4 rounded-md flex-grow overflow-y-auto custom-scrollbar mb-6">
            {invitedFriends.length === 0 ? (
              <p className="text-gray-400">Invite friends from the list to start a battle.</p>
            ) : (
              invitedFriends.map(friend => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-2 mb-2 bg-gray-600 rounded-md"
                >
                  <span className="font-medium text-white">{friend.name}</span>
                  <button
                    onClick={() => toggleInvite(friend.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          <button
            onClick={handleStartBattle}
            className="w-full px-8 py-3 font-bold rounded-md shadow-lg transition duration-200 focus:outline-none focus:ring-2 bg-green-600 hover:bg-green-700 text-white"
          >
            {invitedFriends.length > 0
              ? `Start Battle (${invitedFriends.length} friends)`
              : 'Start Solo Battle (Test Mode)'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BattleFriendsPage
