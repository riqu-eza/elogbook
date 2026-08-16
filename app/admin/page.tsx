/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MotorcycleCard } from '@/components/MotorcycleCard'

export default function AdminPage() {
  const [motorcycles, setMotorcycles] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [inactivityTimeLeft, setInactivityTimeLeft] = useState(30 * 60)
  
  // ✅ Refs for tracking inactivity
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(Date.now())

  // ✅ Hardcoded credentials
  const VALID_EMAIL = 'admin@elogbook.com'
  const VALID_PASSWORD = 'admin123'
  const INACTIVITY_TIMEOUT = 30 * 60 // 30 minutes

  const fetchMotorcycles = async () => {
    try {
      const response = await fetch('/api/motorcycles')
      const data = await response.json()
      setMotorcycles(data)
    } catch (error) {
      console.error('Error fetching motorcycles:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Reset inactivity timer
  const resetInactivityTimer = () => {
    lastActivityRef.current = Date.now()
    setInactivityTimeLeft(INACTIVITY_TIMEOUT)
    
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current)
    }

    inactivityTimerRef.current = setTimeout(() => {
      handleLogout()
    }, INACTIVITY_TIMEOUT * 1000)

    countdownTimerRef.current = setInterval(() => {
      const elapsed = (Date.now() - lastActivityRef.current) / 1000
      const remaining = Math.max(0, INACTIVITY_TIMEOUT - elapsed)
      setInactivityTimeLeft(Math.floor(remaining))
      
      if (remaining <= 0 && countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current)
      }
    }, 1000)
  }

  // ✅ Handle user activity
  const handleUserActivity = () => {
    if (isAuthenticated) {
      resetInactivityTimer()
    }
  }

  // ✅ Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    const loginTime = sessionStorage.getItem('loginTime')
    
    if (auth === 'true' && loginTime) {
      setIsAuthenticated(true)
      fetchMotorcycles()
      resetInactivityTimer()
    } else {
      setLoading(false)
    }
  }, [])

  // ✅ Set up activity listeners
  useEffect(() => {
    if (!isAuthenticated) return

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click']
    
    const handleActivity = () => {
      handleUserActivity()
    }

    events.forEach(event => {
      document.addEventListener(event, handleActivity)
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity)
      })
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current)
      }
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setIsAuthenticated(true)
      const now = Date.now()
      sessionStorage.setItem('adminAuth', 'true')
      sessionStorage.setItem('loginTime', now.toString())
      fetchMotorcycles()
      resetInactivityTimer()
    } else {
      setAuthError('Invalid email or password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuth')
    sessionStorage.removeItem('loginTime')
    setEmail('')
    setPassword('')
    setInactivityTimeLeft(INACTIVITY_TIMEOUT)
    
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current)
    }
  }

  const formatTimeLeft = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // ✅ Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your credentials to access the dashboard
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {authError && (
              <div className="text-red-500 text-sm text-center">
                {authError}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // ✅ Loading state
  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  // ✅ Admin dashboard - Fixed: removed onActivity from div
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Motorcycles</h1>
        <div className="flex items-center gap-3">
          {/* ⏱️ Inactivity Timer */}
          <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
            <span className="text-gray-400">⏱️</span>
            <span className={inactivityTimeLeft < 60 ? 'text-red-600 font-bold' : ''}>
              {formatTimeLeft(inactivityTimeLeft)}
            </span>
          </div>
          <Link
            href="/admin/add"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Motorcycle
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {motorcycles.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No motorcycles added yet</p>
          <Link
            href="/admin/add"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Your First Motorcycle
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {motorcycles.map((motorcycle: any) => (
            <MotorcycleCard
              key={motorcycle.id}
              motorcycle={motorcycle}
              showQR={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}