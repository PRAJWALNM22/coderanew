import React, { useState, useEffect } from 'react'
import './index.css'

// Shell App that wires together theme, auth, and page routing.
// Detailed page components live under ./components and ./pages.
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import PracticeProblemPage from './pages/PracticeProblemPage.jsx'
import PracticeListPage from './pages/PracticeListPage.jsx'
import BattleOverviewPage from './pages/BattleOverviewPage.jsx'
import BattleRandomPage from './pages/BattleRandomPage.jsx'
import BattleFriendsPage from './pages/BattleFriendsPage.jsx'
import NotesPage from './pages/NotesPage.jsx'
import BattleRoomPage from './pages/BattleRoomPage.jsx'

function App() {
  // --- Theme state ---
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme)
    } catch {}
    document.body.classList.toggle('light', theme === 'light')
    window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }))
  }, [theme])

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  // --- Firebase / auth state (uses global firebase compat loaded in index.html) ---
  const [db, setDb] = useState(null)
  const [auth, setAuth] = useState(null)
  const [userId, setUserId] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthReady, setIsAuthReady] = useState(false)

  // --- Routing state (hash-based, mirrors original AppEarly) ---
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash
    const pathname = window.location.pathname
    if (hash && hash.startsWith('#/')) {
      return hash.substring(1)
    }
    return pathname || '/'
  })
  const [previousPage, setPreviousPage] = useState('/home')
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024)

  // Firebase initialization + auth listener
  useEffect(() => {
    if (!window.firebase) {
      console.log('Firebase not available; running without auth')
      setIsAuthReady(true)
      return
    }

    try {
      const firebaseConfig = {
        apiKey: 'AIzaSyCdl2AhZG9HBwDLcSENTroup0ryR7_NdW8',
        authDomain: 'codera-battle.firebaseapp.com',
        projectId: 'codera-battle',
        storageBucket: 'codera-battle.firebasestorage.app',
        messagingSenderId: '825772579105',
        appId: '1:825772579105:web:583045e4bb94c7f9af0660',
        measurementId: 'G-G10VGFQVBN',
      }

      const app = window.firebase.apps?.length
        ? window.firebase.app()
        : window.firebase.initializeApp(firebaseConfig)
      const firestore = window.firebase.firestore(app)
      const firebaseAuth = window.firebase.auth(app)

      setDb(firestore)
      setAuth(firebaseAuth)

      firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          setUserId(user.uid)
          setIsAuthenticated(true)
        } else {
          setUserId(null)
          setIsAuthenticated(false)
        }
        setIsAuthReady(true)
      })
    } catch (error) {
      console.error('Firebase init error:', error)
      setIsAuthReady(true)
    }
  }, [])

  // Handle auth-based redirects (login <-> home)
  useEffect(() => {
    if (!isAuthReady) return

    if (isAuthenticated && (currentPage === '/' || currentPage === '/login')) {
      navigateTo('/home', { replace: true })
    } else if (!isAuthenticated && currentPage !== '/login' && currentPage !== '/') {
      navigateTo('/login', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthReady, isAuthenticated])

  // Listen to browser back/forward via hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash && hash.startsWith('#/')) {
        setCurrentPage(hash.substring(1))
      } else {
        setCurrentPage(window.location.pathname || '/')
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handleHashChange)
    }
  }, [])

  const navigateTo = (path, { replace = false } = {}) => {
    if (!path.startsWith('/')) path = `/${path}`

    if (currentPage !== path && !currentPage.startsWith('/profile')) {
      setPreviousPage(currentPage)
    }

    setCurrentPage(path)
    const hashPath = `#${path}`
    try {
      if (window.location.protocol === 'file:') {
        window.location.hash = path
      } else {
        if (replace) {
          window.history.replaceState({}, '', hashPath)
        } else {
          window.history.pushState({}, '', hashPath)
        }
      }
    } catch {
      window.location.hash = path
    }
  }

  const toggleProfile = () => {
    if (currentPage.startsWith('/profile')) {
      navigateTo(previousPage, { replace: true })
    } else {
      setPreviousPage(currentPage)
      navigateTo('/profile', { replace: true })
    }
  }

  const handleLogout = async () => {
    if (!auth) return
    try {
      await auth.signOut()
      navigateTo('/login', { replace: true })
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const renderPage = () => {
    const [pathname, queryString] = currentPage.split('?')
    const pathSegments = pathname.split('/').filter(Boolean)
    const baseRoute = `/${pathSegments[0] || ''}`
    const id = pathSegments[1]
    const subRoute = pathSegments[1]

    switch (baseRoute) {
      case '/login':
        return isAuthenticated ? (
          <HomePage username="CodeMaster" navigateTo={navigateTo} />
        ) : (
          <LoginPage onLoginSuccess={() => navigateTo('/home')} navigateTo={navigateTo} />
        )
      case '/home':
        if (!isAuthenticated) {
          return <LoginPage onLoginSuccess={() => navigateTo('/home')} navigateTo={navigateTo} />
        }
        return <HomePage username="CodeMaster" navigateTo={navigateTo} />
      case '/practice':
        if (!isAuthenticated) {
          return <LoginPage onLoginSuccess={() => navigateTo('/home')} navigateTo={navigateTo} />
        }
        return id ? (
          <PracticeProblemPage problemId={id} />
        ) : (
          <PracticeListPage navigateTo={navigateTo} />
        )
      case '/battle': {
        if (!isAuthenticated) {
          return <LoginPage onLoginSuccess={() => navigateTo('/home')} navigateTo={navigateTo} />
        }
        if (subRoute === 'random') return <BattleRandomPage navigateTo={navigateTo} />
        if (subRoute === 'friends') return <BattleFriendsPage navigateTo={navigateTo} />
        if (subRoute === 'room') return <BattleRoomPage navigateTo={navigateTo} userId={userId} db={db} />
        return <BattleOverviewPage navigateTo={navigateTo} />
      }
      case '/leaderboard':
        // TODO: implement dedicated Leaderboard page
        return <div className="p-8 pt-24 text-gray-100">Leaderboard coming soon</div>
      case '/friends':
        return <BattleFriendsPage navigateTo={navigateTo} />
      case '/notes':
        return <NotesPage navigateTo={navigateTo} />
      case '/profile':
        return isAuthenticated ? (
          <div className="p-8 pt-24 text-gray-100">Profile page placeholder</div>
        ) : (
          <LoginPage onLoginSuccess={() => navigateTo('/home')} navigateTo={navigateTo} />
        )
      default:
        return isAuthenticated ? (
          <HomePage username="CodeMaster" navigateTo={navigateTo} />
        ) : (
          <LoginPage onLoginSuccess={() => navigateTo('/home')} navigateTo={navigateTo} />
        )
    }
  }

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <svg
          className="animate-spin h-10 w-10 text-indigo-400 mr-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p>Loading application...</p>
      </div>
    )
  }

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {isAuthenticated && (
        <>
          <Navbar
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            username="CodeMaster"
            currentPage={currentPage}
            userId={userId}
            onLogout={handleLogout}
            theme={theme}
            onToggleTheme={toggleTheme}
            navigateTo={navigateTo}
            toggleProfile={toggleProfile}
          />
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={setIsSidebarOpen}
            navigateTo={navigateTo}
            currentPage={currentPage}
          />
        </>
      )}
      <div
        className={`flex-grow ${
          isAuthenticated ? 'ml-0 lg:ml-20 pt-16' : ''
        } transition-all duration-300 ease-in-out`}
      >
        {renderPage()}
      </div>
    </div>
  )
}

export default App
