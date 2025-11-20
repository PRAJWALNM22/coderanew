import React, { useState, useEffect, useRef } from 'react'

function Navbar({
  toggleSidebar,
  username,
  currentPage,
  userId,
  onLogout,
  theme,
  onToggleTheme,
  navigateTo,
  toggleProfile,
}) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'battle', message: 'You have a battle invite from Player1!', read: false },
    { id: 2, type: 'streak', message: 'Keep up your 5-day streak!', read: false },
    { id: 3, type: 'friendRequest', message: 'Player2 sent you a friend request.', read: true },
    { id: 4, type: 'problem', message: 'New problem added: Merge Sorted Array.', read: false },
    { id: 5, type: 'qotd', message: 'Question of the Day is available!', read: false },
  ])

  const notificationRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const handleNotificationClick = notification => {
    console.log(`Navigating based on notification type: ${notification.type}`)
    setShowNotifications(false)
    setNotifications(notifications.map(n => (n.id === notification.id ? { ...n, read: true } : n)))
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-gray-100 p-4 shadow-lg flex justify-between items-center z-50">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-700 transition duration-200 mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-indigo-400">Codera</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-md hover:bg-gray-700 transition duration-200"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            // Sun icon for switching to light
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 18a6 6 0 100-12 6 6 0 000 12zm0 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm0-22a1 1 0 011 1v1a1 1 0 11-2 0V1a1 1 0 011-1zm10 11a1 1 0 011 1 1 1 0 11-2 0 1 1 0 011-1zM4 12a1 1 0 011 1 1 1 0 11-2 0 1 1 0 011-1zm13.657 7.071a1 1 0 011.414 1.415l-.707.707a1 1 0 11-1.414-1.414l.707-.708zM6.343 3.515A1 1 0 117.757 2.1l.707.707A1 1 0 117.05 4.22l-.707-.707zm12.02-.707A1 1 0 1119.778 4.22l-.707.707A1 1 0 0117.657 3.51l.707-.707zM4.222 19.778a1 1 0 111.415-1.414l.707.707A1 1 0 114.93 20.485l-.707-.707z" />
            </svg>
          ) : (
            // Moon icon for switching to dark
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21.752 15.002A9 9 0 1112.998 2.248a7 7 0 108.754 12.754z" />
            </svg>
          )}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-md hover:bg-gray-700 transition duration-200 relative"
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-gray-700 rounded-md shadow-xl z-50 animate-fade-in-down">
              <div className="p-4 border-b border-gray-600 flex justify-between items-center">
                <h3 className="font-semibold text-white">Notifications</h3>
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Mark all as read
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <p className="p-4 text-gray-400">No new notifications.</p>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      className={`p-3 border-b border-gray-600 hover:bg-gray-600 cursor-pointer ${
                        n.read ? 'text-gray-400' : 'text-white font-medium'
                      }`}
                    >
                      {n.message}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <button
          onClick={toggleProfile}
          className="p-2 rounded-full hover:bg-gray-700 transition duration-200"
          aria-label="User avatar"
        >
          <img
            src="https://placehold.co/32x32/FF7700/FFFFFF?text=CM"
            alt="User Avatar"
            className="h-8 w-8 rounded-full"
          />
        </button>

        {/* Logout Button */}
        {userId && (
          <button
            onClick={onLogout}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md shadow-md transition duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
