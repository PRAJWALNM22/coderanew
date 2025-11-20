import React, { useEffect, useRef } from 'react'

function Sidebar({ isSidebarOpen, toggleSidebar, navigateTo, currentPage }) {
  const sidebarRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('nav button')
      ) {
        toggleSidebar(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSidebarOpen, toggleSidebar])

  const NavLink = ({ to, icon, label }) => (
    <button
      onClick={() => {
        navigateTo(to)
        if (window.innerWidth < 1024) toggleSidebar(false)
      }}
      className={`flex items-center p-3 rounded-lg hover:bg-indigo-700 transition duration-200 ${
        currentPage === to ? 'bg-indigo-600' : ''
      } ${!isSidebarOpen && 'justify-center'}`}
      aria-label={label}
    >
      {icon}
      {isSidebarOpen && <span className="ml-3">{label}</span>}
    </button>
  )

  return (
    <>
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 z-30"
          onClick={() => toggleSidebar(false)}
        ></div>
      )}
      <aside
        ref={sidebarRef}
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-800 text-gray-100 shadow-xl z-40 transition-all duration-300 ease-in-out pt-4 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } ${!isSidebarOpen && 'items-center'} flex flex-col`}
      >
        <div
          className={`p-4 flex ${isSidebarOpen ? 'justify-between' : 'justify-center'} items-center mb-4`}
        >
          {isSidebarOpen && <span className="text-xl font-semibold">Menu</span>}
          <button
            onClick={() => toggleSidebar(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-700 transition duration-200"
            aria-label="Toggle sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 transform ${isSidebarOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <NavLink
            to="/home"
            label="Home"
            icon={
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            }
          />
          <NavLink
            to="/practice"
            label="Practice"
            icon={
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
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            }
          />
          <NavLink
            to="/battle"
            label="Battles"
            icon={
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
                  d="M18 12v3M18 18v3M18 6v3m4 2a4 4 0 11-8 0 4 4 0 018 0zm-12 3v1m-3 2v3m0-3V6a3 3 0 013-3h2M6 16V6a3 3 0 00-3-3h2m0 14v1m0 0h1v1m-1-1h-1m-1-1v-1m0 0a1 1 0 01-1-1v-4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1"
                />
              </svg>
            }
          />
          <NavLink
            to="/leaderboard"
            label="Leaderboard"
            icon={
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
          />
          <NavLink
            to="/friends"
            label="Friends"
            icon={
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 00-3 3v2m10-11H9V3l4 4-4 4zm1-8v2.071c.795.347 1.637.669 2.5.91V3.929c-.863.241-1.705.563-2.5.91zM7 7a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4zm-4 4a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
            }
          />
          <NavLink
            to="/notes"
            label="Notes"
            icon={
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
                  d="M9 12h6m-6 4h6M9 8h6m2 8a2 2 0 002-2V6a2 2 0 00-2-2H9l-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h12z"
                />
              </svg>
            }
          />
          <NavLink
            to="/profile"
            label="Profile"
            icon={
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            }
          />
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
