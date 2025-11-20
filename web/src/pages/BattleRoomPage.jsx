import React, { useState, useEffect } from 'react'

function getRoomIdFromLocation() {
  try {
    const url = new URL(window.location.href)
    const direct = url.searchParams.get('id')
    if (direct) return direct
    if (window.location.hash.includes('?')) {
      const hashParams = new URLSearchParams(window.location.hash.split('?')[1])
      return hashParams.get('id')
    }
  } catch {}
  return 'local_' + Math.random().toString(36).substr(2, 9)
}

function BattleRoomPage({ navigateTo, userId, db }) {
  const [roomId, setRoomId] = useState(() => getRoomIdFromLocation())
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    document.title = `Codera Battle - ${roomId}`
  }, [roomId])

  const handleSend = () => {
    if (!input.trim()) return
    const msg = {
      id: Date.now(),
      from: userId || 'You',
      text: input.trim(),
    }
    setMessages(prev => [...prev, msg])
    setInput('')
  }

  return (
    <div className="p-8 pt-24 pl-28 lg:pl-28 min-h-screen bg-gray-900 text-gray-100 font-inter">
      <h1 className="text-3xl font-bold text-indigo-400 mb-2">Battle Room</h1>
      <p className="text-gray-300 mb-6 text-sm">Room ID: {roomId}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 p-4 rounded-lg shadow-lg border border-indigo-700 min-h-[300px] flex flex-col">
          <h2 className="text-xl font-semibold text-white mb-3">Coding Area</h2>
          <p className="text-gray-300 text-sm mb-4">
            This is a minimal React version of the battle room. You can integrate your existing
            CodeMirror + Judge0 + WebRTC logic here later.
          </p>
          <textarea
            className="flex-1 bg-gray-900 text-gray-100 rounded-md border border-gray-700 p-3 font-mono text-sm"
            placeholder="Paste or write your battle solution here..."
          />
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-indigo-700 flex flex-col min-h-[300px]">
          <h2 className="text-xl font-semibold text-white mb-3">Room Chat</h2>
          <div className="flex-1 bg-gray-900 rounded-md border border-gray-700 p-3 overflow-y-auto custom-scrollbar mb-3">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-sm">No messages yet. Say hi to your opponent!</p>
            ) : (
              messages.map(m => (
                <div key={m.id} className="mb-2">
                  <span className="font-semibold text-indigo-300 mr-1">{m.from}:</span>
                  <span className="text-gray-100 text-sm">{m.text}</span>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSend()
                }
              }}
              className="flex-1 bg-gray-900 text-gray-100 rounded-md border border-gray-700 p-2 text-sm"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BattleRoomPage
