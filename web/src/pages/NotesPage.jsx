import React, { useState, useEffect, useMemo } from 'react'

function NotesPage({ navigateTo }) {
  const [allNotes, setAllNotes] = useState(() => {
    try {
      const raw = localStorage.getItem('codera-notes')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState('') // '', 'practice', 'battle'

  useEffect(() => {
    const onStorage = () => {
      try {
        const raw = localStorage.getItem('codera-notes')
        setAllNotes(raw ? JSON.parse(raw) : [])
      } catch {}
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const filtered = useMemo(
    () =>
      allNotes.filter(n => {
        const matchesMode = mode ? n.context?.mode === mode : true
        const matchesQuery = query
          ? (n.title || '').toLowerCase().includes(query.toLowerCase()) ||
            (n.snippet || '').toLowerCase().includes(query.toLowerCase())
          : true
        return matchesMode && matchesQuery
      }),
    [allNotes, mode, query],
  )

  const handleCopy = async note => {
    try {
      await navigator.clipboard.writeText(note.snippet)
    } catch {}
  }

  const handleDelete = id => {
    const next = allNotes.filter(n => n.id !== id)
    setAllNotes(next)
    try {
      localStorage.setItem('codera-notes', JSON.stringify(next))
    } catch {}
  }

  const openContext = note => {
    const ctx = note.context || {}
    if (ctx.mode === 'practice' && ctx.problemId) {
      navigateTo(`/practice/${ctx.problemId}`)
    } else if (ctx.mode === 'battle') {
      if (ctx.roomId) navigateTo(`/battle/room?id=${ctx.roomId}`)
      else navigateTo('/battle')
    }
  }

  return (
    <div className="p-8 pt-24 pl-28 lg:pl-28 min-h-screen bg-gray-900 text-gray-100 font-inter">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">Integrated Notes</h1>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-indigo-700 mb-4 flex flex-col md:flex-row gap-3 md:items-center">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search notes..."
          className="flex-1 bg-gray-700 text-gray-100 p-2 rounded-md border border-gray-600"
        />
        <select
          value={mode}
          onChange={e => setMode(e.target.value)}
          className="bg-gray-700 text-gray-100 p-2 rounded-md border border-gray-600"
        >
          <option value="">All</option>
          <option value="practice">Practice</option>
          <option value="battle">Battle</option>
        </select>
        <span className="text-sm text-gray-300">{filtered.length} notes</span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400">No notes found.</p>
      ) : (
        <ul className="space-y-3">
          {filtered.map(note => (
            <li key={note.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-white font-semibold text-sm">{note.title || 'Snippet'}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {new Date(note.createdAt).toLocaleString()} • {note.language} •{' '}
                    {(note.context?.mode || '').toUpperCase()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openContext(note)}
                    className="px-3 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 rounded"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleCopy(note)}
                    className="px-3 py-1 text-xs bg-teal-600 hover:bg-teal-700 rounded"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <pre className="mt-2 text-sm whitespace-pre-wrap text-gray-200 overflow-auto max-h-48">
                {note.snippet}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default NotesPage
