// Frontend/src/Adminlogin.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      navigate('/admin/dashboard')
    }
    setIsCheckingAuth(false)
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        localStorage.setItem('adminToken', data.token)
        navigate('/admin/dashboard')
      } else {
        setError(data.error || 'Invalid password')
      }
    } catch (err) {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#E0E0E0] border-t-[#1A1A1A]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-[#EEEEEE] p-8 w-full max-w-md hover:shadow-md transition-shadow duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/10">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Admin Login</h1>
          <p className="text-[#4A4A4A] mt-2">UK Garage Lead Capture System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              className="w-full py-3 px-4 rounded-xl border border-[#E0E0E0] bg-white text-[#2D2D2D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] transition-all duration-200"
            />
          </div>

          {error && (
            <div className="bg-[#FAFAFA] text-[#2D2D2D] px-4 py-3 rounded-xl text-sm border border-[#E0E0E0]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200
              ${loading || !password 
                ? 'bg-[#E0E0E0] text-[#9CA3AF] cursor-not-allowed' 
                : 'bg-[#1A1A1A] text-white hover:bg-[#2D2D2D] shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 hover:-translate-y-0.5'
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Logging in...
              </span>
            ) : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#4A4A4A]">
            Default password: <code className="bg-[#FAFAFA] px-2 py-1 rounded-lg border border-[#EEEEEE] text-[#2D2D2D] font-mono text-xs">admin123</code>
          </p>
        </div>
      </div>
    </div>
  )
}
