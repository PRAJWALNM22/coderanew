import React, { useState } from 'react'

function LoginPage({ onLoginSuccess, navigateTo }) {
  const [email, setEmail] = useState('demo@codera.com')
  const [password, setPassword] = useState('password')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [showOtpVerification, setShowOtpVerification] = useState(false)
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const getFirebaseAuth = () => {
    const firebase = window.firebase
    if (!firebase) throw new Error('Firebase is not available in this environment.')
    return firebase.auth()
  }

  const getFirestore = () => {
    const firebase = window.firebase
    if (!firebase || !firebase.firestore) return null
    return firebase.firestore()
  }

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const auth = getFirebaseAuth()
      await auth.signInWithEmailAndPassword(email, password)
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        onLoginSuccess?.()
      }, 800)
    } catch (err) {
      console.error('Login error:', err)
      setError('Invalid credentials. Please try demo@codera.com / password or check Firebase auth users.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const firebase = window.firebase
      if (!firebase || !firebase.auth) throw new Error('Firebase auth not available')
      const auth = firebase.auth()
      const provider = new firebase.auth.GoogleAuthProvider()
      const result = await auth.signInWithPopup(provider)
      const user = result.user

      const db = getFirestore()
      if (db) {
        const userRef = db.collection('users').doc(user.uid)
        const docSnap = await userRef.get()
        if (!docSnap.exists) {
          let chosenUsername = prompt('Welcome! Choose your username:') || ''
          chosenUsername = chosenUsername.trim() || user.displayName || 'User_' + Math.floor(Math.random() * 1000)
          const photoURL = user.photoURL || prompt('Enter profile photo URL (optional):')

          await userRef.set(
            {
              uid: user.uid,
              email: user.email,
              username: chosenUsername,
              usernameLower: chosenUsername.toLowerCase(),
              photoURL: photoURL || user.photoURL || '',
              createdAt: new Date().toISOString(),
            },
            { merge: true },
          )
        }
      }

      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        onLoginSuccess?.()
      }, 800)
    } catch (err) {
      console.error('Google login error:', err)
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.')
      } else if (err.code === 'auth/popup-blocked') {
        setError('Pop-up was blocked by browser. Please allow pop-ups and try again.')
      } else {
        setError('Google sign-in failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const sendOtp = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedOtp(otpCode)
      
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode })
      })
      
      if (response.ok) {
        const result = await response.json()
        setOtpSent(true)
        setShowOtpVerification(true)
        setError('')
        
        if (result.devMode || result.fallback) {
          setError(`OTP: ${otpCode} (Development mode - check console)`)
        }
      } else {
        setError('Failed to send OTP. Please try again.')
      }
    } catch (err) {
      console.error('OTP send error:', err)
      setError('Failed to send OTP. Please check your internet connection.')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setShowOtpVerification(false)
      handleSignUp()
    } else {
      setError('Invalid OTP. Please try again.')
    }
  }

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }
    if (!username.trim()) {
      setError('Please choose a username.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const auth = getFirebaseAuth()
      const result = await auth.createUserWithEmailAndPassword(email, password)
      const user = result.user

      const chosenUsername = username.trim()
      const db = getFirestore()
      if (db) {
        try {
          await db
            .collection('users')
            .doc(user.uid)
            .set(
              {
                uid: user.uid,
                username: chosenUsername,
                usernameLower: chosenUsername.toLowerCase(),
                email: user.email,
                displayName: chosenUsername,
                createdAt: new Date(),
                lastActive: new Date(),
                emailVerified: true,
              },
              { merge: true },
            )
        } catch (profileErr) {
          console.error('Error creating user profile with username:', profileErr)
        }
      }

      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        onLoginSuccess?.()
      }, 800)
    } catch (err) {
      console.error('Signup error:', err)
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try signing in instead.')
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.')
      } else {
        setError('Sign up failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInitialSignUp = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }
    if (!username.trim()) {
      setError('Please choose a username.')
      return
    }
    sendOtp()
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setError('')
    setEmail(isSignUp ? 'demo@codera.com' : '')
    setPassword(isSignUp ? 'password' : '')
    setConfirmPassword('')
    setUsername('')
    setShowOtpVerification(false)
    setOtp('')
    setOtpSent(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md border border-indigo-700">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          {isSignUp ? 'Join Codera' : 'Welcome to Codera'}
        </h2>
        {showAlert && (
          <div className="bg-green-500 text-white p-3 rounded-md mb-4 text-center">
            {isSignUp ? 'Account created! Redirecting...' : 'Login successful! Redirecting...'}
          </div>
        )}
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">{error}</div>
        )}
        <div className="space-y-4">
          {showOtpVerification ? (
            <>
              <div className="text-center mb-4">
                <p className="text-gray-300 text-sm">We've sent a 6-digit OTP to</p>
                <p className="text-indigo-400 font-medium">{email}</p>
              </div>
              <div>
                <label htmlFor="otp" className="block text-gray-300 text-sm font-medium mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength="6"
                />
              </div>
              <button
                onClick={verifyOtp}
                disabled={loading || otp.length !== 6}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white font-bold p-3 rounded-md shadow-lg transition duration-300"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                onClick={() => setShowOtpVerification(false)}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium p-2 rounded-md"
              >
                Back
              </button>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={isSignUp ? 'Enter your email' : 'demo@codera.com'}
                />
              </div>
              {isSignUp && (
                <div>
                  <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Choose a unique username"
                  />
                </div>
              )}
              <div>
                <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={isSignUp ? 'Enter your password' : 'password'}
                />
              </div>
              {isSignUp && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                  />
                </div>
              )}
              <button
                onClick={isSignUp ? handleInitialSignUp : handleLogin}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-3 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
              >
                {loading ? (isSignUp ? 'Sending OTP...' : 'Signing in...') : isSignUp ? 'Send OTP' : 'Sign In'}
              </button>
            </>
          )}

          {!showOtpVerification && (
            <>
              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-600"></div>
                <span className="mx-4 text-gray-400 text-sm">or</span>
                <div className="flex-grow h-px bg-gray-600"></div>
              </div>

              {/* Google Sign-In Button */}
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold p-3 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center border border-gray-300"
              >
                {loading ? (
                  'Connecting...'
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>
            </>
          )}
        </div>
        {!showOtpVerification && (
          <p className="text-center text-gray-400 text-sm mt-6">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button className="text-blue-400 hover:underline" onClick={toggleMode}>
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button className="text-blue-400 hover:underline" onClick={toggleMode}>
                  Sign up
                </button>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

export default LoginPage
