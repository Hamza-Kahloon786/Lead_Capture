// frontend/src/AdminLeads.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

export default function AdminLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { garageSlug } = useParams()
  const navigate = useNavigate()

  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    if (!token) {
      navigate('/admin')
      return
    }
    fetchLeads()
  }, [token, navigate, garageSlug])

  async function fetchLeads() {
    setLoading(true)
    try {
      const url = garageSlug 
        ? `/api/admin/leads?garage_slug=${garageSlug}`
        : '/api/admin/leads'
      
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (res.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin')
        return
      }

      const data = await res.json()
      setLeads(data)
    } catch (err) {
      setError('Failed to load leads')
    } finally {
      setLoading(false)
    }
  }

  function formatDate(dateString) {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  function formatRegistration(reg) {
    if (!reg) return ''
    const cleaned = reg.toUpperCase().replace(/\s/g, '')
    return cleaned.length === 7 ? cleaned.slice(0, 4) + ' ' + cleaned.slice(4) : cleaned
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#E0E0E0] border-t-[#1A1A1A]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header - BLACK BACKGROUND */}
      <header className="bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {garageSlug ? `Leads - ${garageSlug}` : 'All Leads'}
            </h1>
            <p className="text-sm text-[#9CA3AF]">
              {leads.length} lead{leads.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              to="/admin/dashboard" 
              className="inline-flex items-center gap-2 px-4 py-2 text-white bg-[#2D2D2D] hover:bg-[#4A4A4A] rounded-xl transition-all duration-200 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {error && (
          <div className="bg-white text-[#2D2D2D] px-4 py-3 rounded-xl mb-6 border-2 border-[#1A1A1A]">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] overflow-hidden">
          {leads.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 bg-[#FAFAFA] rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-[#1A1A1A]">
                <svg className="w-8 h-8 text-[#4A4A4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-[#4A4A4A]">No leads found</p>
              <p className="text-sm text-[#9CA3AF] mt-1">Leads will appear here when customers submit the form</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FAFAFA] border-b-2 border-[#1A1A1A]">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Registration</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Garage</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0E0E0]">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#FAFAFA] transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-[#4A4A4A]">{formatDate(lead.created_at)}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-[#1A1A1A] text-white font-mono font-bold text-sm">
                          {formatRegistration(lead.registration)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium text-[#1A1A1A]">{lead.name}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a 
                          href={`tel:${lead.phone}`} 
                          className="text-[#1A1A1A] hover:text-[#4A4A4A] font-medium transition-colors duration-200"
                        >
                          {lead.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold border-2 border-[#1A1A1A] text-[#1A1A1A]">
                          {lead.reason}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-[#4A4A4A]">{lead.garage_name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#4A4A4A] max-w-xs truncate" title={lead.message}>
                          {lead.message || '-'}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}