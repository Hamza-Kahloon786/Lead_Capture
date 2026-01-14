  // frontend/src/AdminDashboard.jsx
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [garages, setGarages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingGarage, setEditingGarage] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const navigate = useNavigate()

  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    if (!token) {
      navigate('/admin')
      return
    }
    fetchData()
  }, [token, navigate])

  async function fetchData() {
    setLoading(true)
    try {
      const headers = { 'Authorization': `Bearer ${token}` }
      
      const [statsRes, garagesRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/admin/garages', { headers })
      ])

      if (statsRes.status === 401 || garagesRes.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin')
        return
      }

      const statsData = await statsRes.json()
      const garagesData = await garagesRes.json()

      setStats(statsData)
      setGarages(garagesData)
    } catch (err) {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  async function updateGarageStatus(garageId, newStatus) {
    try {
      const res = await fetch(`/api/admin/garages/${garageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (res.ok) {
        fetchData()
      }
    } catch (err) {
      alert('Failed to update garage')
    }
  }

  async function updatePaymentDate(garageId, date) {
    try {
      const res = await fetch(`/api/admin/garages/${garageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ last_payment_date: date })
      })

      if (res.ok) {
        fetchData()
        setEditingGarage(null)
      }
    } catch (err) {
      alert('Failed to update payment date')
    }
  }

  async function deleteGarage(garageId) {
    try {
      const res = await fetch(`/api/admin/garages/${garageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (res.ok) {
        fetchData()
        setShowDeleteConfirm(null)
      }
    } catch (err) {
      alert('Failed to delete garage')
    }
  }

  function logout() {
    localStorage.removeItem('adminToken')
    navigate('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#E0E0E0] border-t-[#1A1A1A]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 text-center">
          <p className="text-[#2D2D2D]">{error}</p>
          <button onClick={fetchData} className="mt-4 text-[#1A1A1A] hover:text-[#4A4A4A] font-medium">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header - BLACK BACKGROUND */}
      <header className="bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-[#9CA3AF]">UK Garage Lead Capture System</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              to="/admin/leads" 
              className="px-4 py-2 bg-white text-[#1A1A1A] rounded-xl hover:bg-[#F0F0F0] font-medium transition-all duration-200"
            >
              All Leads
            </Link>
            <Link 
              to="/admin/onboarding" 
              className="px-4 py-2 bg-white text-[#1A1A1A] rounded-xl hover:bg-[#F0F0F0] font-medium transition-all duration-200"
            >
              Onboarding
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white text-[#1A1A1A] rounded-xl hover:bg-[#F0F0F0] font-medium transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Cards - WITH LIGHT BORDER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Total Garages */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#4A4A4A] font-medium">Total Garages</p>
                <p className="text-3xl font-bold text-[#1A1A1A] mt-1">{stats?.total_garages || 0}</p>
              </div>
              <div className="w-12 h-12 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] transition-all duration-300">
                <svg className="w-6 h-6 text-[#1A1A1A] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#4A4A4A] font-medium">Active</p>
                <p className="text-3xl font-bold text-[#1A1A1A] mt-1">{stats?.active_garages || 0}</p>
              </div>
              <div className="w-12 h-12 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] transition-all duration-300">
                <svg className="w-6 h-6 text-[#1A1A1A] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Paused */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#4A4A4A] font-medium">Paused</p>
                <p className="text-3xl font-bold text-[#1A1A1A] mt-1">{stats?.paused_garages || 0}</p>
              </div>
              <div className="w-12 h-12 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] transition-all duration-300">
                <svg className="w-6 h-6 text-[#1A1A1A] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Leads */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#4A4A4A] font-medium">Total Leads</p>
                <p className="text-3xl font-bold text-[#1A1A1A] mt-1">{stats?.total_leads || 0}</p>
              </div>
              <div className="w-12 h-12 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] transition-all duration-300">
                <svg className="w-6 h-6 text-[#1A1A1A] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* This Month */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#4A4A4A] font-medium">This Month</p>
                <p className="text-3xl font-bold text-[#1A1A1A] mt-1">{stats?.leads_this_month || 0}</p>
              </div>
              <div className="w-12 h-12 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] transition-all duration-300">
                <svg className="w-6 h-6 text-[#1A1A1A] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Garages Table - WITH LIGHT BORDER */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1A1A1A]">All Garages</h2>
            <button
              onClick={fetchData}
              className="text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-sm font-medium flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E5E7EB] hover:border-[#1A1A1A] transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>

          {garages.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 bg-[#FAFAFA] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#E5E7EB]">
                <svg className="w-8 h-8 text-[#4A4A4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-[#4A4A4A]">No garages yet</p>
              <p className="text-sm text-[#9CA3AF] mt-1">Add your first garage to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FAFAFA] border-b border-[#E5E7EB]">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Garage</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Last Payment</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Leads</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {garages.map((garage) => (
                    <tr key={garage.id} className="hover:bg-[#FAFAFA] transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-[#1A1A1A]">{garage.name}</p>
                          <p className="text-sm text-[#4A4A4A]">{garage.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#2D2D2D]">{garage.real_phone || garage.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={garage.status || 'active'}
                          onChange={(e) => updateGarageStatus(garage.id, e.target.value)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold border cursor-pointer transition-all duration-200
                            ${garage.status === 'paused' 
                              ? 'bg-white text-[#4A4A4A] border-[#D1D5DB]' 
                              : garage.status === 'inactive'
                              ? 'bg-[#F3F4F6] text-[#4A4A4A] border-[#D1D5DB]'
                              : 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            }`}
                        >
                          <option value="active">Active</option>
                          <option value="paused">Paused</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        {editingGarage === garage.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="date"
                              defaultValue={garage.last_payment_date || ''}
                              className="border border-[#D1D5DB] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A]"
                              onBlur={(e) => updatePaymentDate(garage.id, e.target.value)}
                            />
                            <button
                              onClick={() => setEditingGarage(null)}
                              className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setEditingGarage(garage.id)}
                            className="text-sm text-[#4A4A4A] hover:text-[#1A1A1A] font-medium px-3 py-1.5 rounded-lg hover:bg-[#FAFAFA] transition-all duration-200"
                          >
                            {garage.last_payment_date || 'Set date →'}
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/admin/leads/${garage.slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A1A1A] text-white rounded-xl font-medium hover:bg-[#2D2D2D] transition-all duration-200"
                        >
                          <span>{garage.lead_count}</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={`/form/${garage.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-[#D1D5DB] text-[#1A1A1A] rounded-xl text-sm font-medium hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-200"
                          >
                            View Form
                          </a>
                          <button
                            onClick={() => setShowDeleteConfirm(garage.id)}
                            className="px-4 py-2 border border-[#D1D5DB] text-[#1A1A1A] rounded-xl text-sm font-medium hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#E5E7EB]">
            <div className="w-12 h-12 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] text-center mb-2">Delete Garage?</h3>
            <p className="text-[#4A4A4A] text-center mb-6">
              Are you sure you want to delete this garage? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-3 px-4 bg-white text-[#1A1A1A] rounded-xl hover:bg-[#FAFAFA] border border-[#D1D5DB] font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteGarage(showDeleteConfirm)}
                className="flex-1 py-3 px-4 bg-[#1A1A1A] text-white rounded-xl hover:bg-[#2D2D2D] border border-[#1A1A1A] font-semibold transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}