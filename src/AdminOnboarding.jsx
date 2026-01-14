// // frontend/src/AdminOnboarding.jsx orginal file not client configuration 
// import { useState, useEffect } from 'react'
// import { useNavigate, Link } from 'react-router-dom'

// export default function AdminOnboarding() {
//   const [submissions, setSubmissions] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedSubmission, setSelectedSubmission] = useState(null)
//   const [showCreateGarage, setShowCreateGarage] = useState(null)
//   const [createGarageData, setCreateGarageData] = useState({ twilio_number: '', real_phone: '', slug: '' })
//   const navigate = useNavigate()

//   const token = localStorage.getItem('adminToken')

//   useEffect(() => {
//     if (!token) {
//       navigate('/admin')
//       return
//     }
//     fetchSubmissions()
//   }, [token, navigate])

//   async function fetchSubmissions() {
//     setLoading(true)
//     try {
//       const res = await fetch('/api/admin/onboarding', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       })

//       if (res.status === 401) {
//         localStorage.removeItem('adminToken')
//         navigate('/admin')
//         return
//       }

//       const data = await res.json()
//       setSubmissions(data)
//     } catch (err) {
//       setError('Failed to load submissions')
//     } finally {
//       setLoading(false)
//     }
//   }

//   async function updateStatus(submissionId, newStatus) {
//     try {
//       const res = await fetch(`/api/admin/onboarding/${submissionId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ status: newStatus })
//       })

//       if (res.ok) {
//         fetchSubmissions()
//       }
//     } catch (err) {
//       alert('Failed to update status')
//     }
//   }

//   async function createGarageFromSubmission(submissionId) {
//     try {
//       const res = await fetch(`/api/admin/onboarding/${submissionId}/create-garage`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(createGarageData)
//       })

//       const data = await res.json()

//       if (res.ok) {
//         alert(`Garage created successfully! Slug: ${data.slug}`)
//         setShowCreateGarage(null)
//         setCreateGarageData({ twilio_number: '', real_phone: '', slug: '' })
//         fetchSubmissions()
//       } else {
//         alert(data.error || 'Failed to create garage')
//       }
//     } catch (err) {
//       alert('Failed to create garage')
//     }
//   }

//   function getStatusStyle(status) {
//     switch (status) {
//       case 'approved': return 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
//       case 'rejected': return 'bg-white text-[#4A4A4A] border-[#4A4A4A]'
//       default: return 'bg-white text-[#1A1A1A] border-[#1A1A1A]'
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
//         <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#E0E0E0] border-t-[#1A1A1A]"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-[#FAFAFA]">
//       {/* Header - BLACK BACKGROUND */}
//       <header className="bg-[#1A1A1A] text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-white">Client Onboarding</h1>
//             <p className="text-sm text-[#9CA3AF]">
//               {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
//             </p>
//           </div>
//           <div className="flex items-center gap-3">
//             <Link 
//               to="/admin/dashboard" 
//               className="inline-flex items-center gap-2 px-4 py-2 text-white bg-[#2D2D2D] hover:bg-[#4A4A4A] rounded-xl transition-all duration-200 font-medium"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               Back to Dashboard
//             </Link>
//             <a
//               href="/onboarding"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="px-4 py-2.5 bg-white text-[#1A1A1A] rounded-xl hover:bg-[#F0F0F0] font-medium transition-all duration-200"
//             >
//               View Public Form
//             </a>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
//         {error && (
//           <div className="bg-white text-[#2D2D2D] px-4 py-3 rounded-xl mb-6 border-2 border-[#1A1A1A]">
//             {error}
//           </div>
//         )}

//         <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] overflow-hidden">
//           {submissions.length === 0 ? (
//             <div className="px-6 py-12 text-center">
//               <div className="w-16 h-16 bg-[#FAFAFA] rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-[#1A1A1A]">
//                 <svg className="w-8 h-8 text-[#4A4A4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <p className="text-[#4A4A4A]">No onboarding submissions yet</p>
//               <p className="text-sm text-[#9CA3AF] mt-1">
//                 Share the onboarding form with new clients: 
//                 <a href="/onboarding" target="_blank" className="text-[#1A1A1A] hover:text-[#4A4A4A] ml-1 font-medium">
//                   /onboarding
//                 </a>
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-[#FAFAFA] border-b-2 border-[#1A1A1A]">
//                   <tr>
//                     <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Date</th>
//                     <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Business</th>
//                     <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Contact</th>
//                     <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Phone Numbers</th>
//                     <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Status</th>
//                     <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-[#E0E0E0]">
//                   {submissions.map((sub) => (
//                     <tr key={sub.id} className="hover:bg-[#FAFAFA] transition-colors duration-150">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <p className="text-sm text-[#4A4A4A]">{sub.submission_date}</p>
//                       </td>
//                       <td className="px-6 py-4">
//                         <p className="font-semibold text-[#1A1A1A]">{sub.business_name}</p>
//                       </td>
//                       <td className="px-6 py-4">
//                         <p className="text-sm font-medium text-[#1A1A1A]">{sub.contact_name}</p>
//                         <p className="text-sm text-[#4A4A4A]">{sub.contact_email}</p>
//                         <p className="text-sm text-[#4A4A4A]">{sub.contact_phone}</p>
//                       </td>
//                       <td className="px-6 py-4">
//                         {sub.mobile_numbers && sub.mobile_numbers.length > 0 ? (
//                           <div className="space-y-1">
//                             {sub.mobile_numbers.map((num, idx) => (
//                               <p key={idx} className="text-sm text-[#4A4A4A]">
//                                 {num.number} <span className="text-[#9CA3AF]">({num.carrier})</span>
//                               </p>
//                             ))}
//                           </div>
//                         ) : (
//                           <p className="text-sm text-[#9CA3AF]">No numbers</p>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <select
//                           value={sub.status}
//                           onChange={(e) => updateStatus(sub.id, e.target.value)}
//                           className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 cursor-pointer transition-all duration-200 ${getStatusStyle(sub.status)}`}
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="approved">Approved</option>
//                           <option value="rejected">Rejected</option>
//                         </select>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {sub.status !== 'approved' && (
//                           <button
//                             onClick={() => {
//                               setShowCreateGarage(sub.id)
//                               setCreateGarageData({
//                                 twilio_number: '+14388177856',
//                                 real_phone: sub.contact_phone,
//                                 slug: sub.business_name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
//                               })
//                             }}
//                             className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A1A1A] text-white hover:bg-[#2D2D2D] rounded-xl text-sm font-medium transition-all duration-200"
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                             </svg>
//                             Create Garage
//                           </button>
//                         )}
//                         {sub.status === 'approved' && (
//                           <span className="inline-flex items-center gap-1.5 text-[#1A1A1A] text-sm font-medium">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             Garage Created
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Create Garage Modal */}
//       {showCreateGarage && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border-2 border-[#1A1A1A]">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 bg-[#FAFAFA] border-2 border-[#1A1A1A] rounded-xl flex items-center justify-center">
//                 <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-[#1A1A1A]">Create Garage</h3>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">
//                   Garage Slug (URL-friendly name)
//                 </label>
//                 <input
//                   type="text"
//                   value={createGarageData.slug}
//                   onChange={(e) => setCreateGarageData({ ...createGarageData, slug: e.target.value })}
//                   placeholder="daves-garage"
//                   className="w-full px-4 py-2.5 border-2 border-[#1A1A1A] rounded-xl focus:outline-none text-[#2D2D2D] placeholder-[#9CA3AF] transition-all duration-200"
//                 />
//                 <p className="text-xs text-[#9CA3AF] mt-1.5">
//                   Form URL: <span className="font-mono">/form/{createGarageData.slug || 'your-slug'}</span>
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">
//                   Twilio Number
//                 </label>
//                 <input
//                   type="text"
//                   value={createGarageData.twilio_number}
//                   onChange={(e) => setCreateGarageData({ ...createGarageData, twilio_number: e.target.value })}
//                   placeholder="+14388177856"
//                   className="w-full px-4 py-2.5 border-2 border-[#1A1A1A] rounded-xl focus:outline-none text-[#2D2D2D] placeholder-[#9CA3AF] transition-all duration-200"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">
//                   Real Phone (where calls are forwarded)
//                 </label>
//                 <input
//                   type="text"
//                   value={createGarageData.real_phone}
//                   onChange={(e) => setCreateGarageData({ ...createGarageData, real_phone: e.target.value })}
//                   placeholder="+447700900123"
//                   className="w-full px-4 py-2.5 border-2 border-[#1A1A1A] rounded-xl focus:outline-none text-[#2D2D2D] placeholder-[#9CA3AF] transition-all duration-200"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={() => setShowCreateGarage(null)}
//                 className="flex-1 py-3 px-4 bg-white text-[#1A1A1A] rounded-xl hover:bg-[#FAFAFA] border-2 border-[#1A1A1A] font-semibold transition-all duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => createGarageFromSubmission(showCreateGarage)}
//                 className="flex-1 py-3 px-4 bg-[#1A1A1A] text-white rounded-xl hover:bg-[#2D2D2D] border-2 border-[#1A1A1A] font-semibold transition-all duration-200"
//               >
//                 Create Garage
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }  



// frontend/src/AdminOnboarding.jsx 
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function AdminOnboarding() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [showCreateGarage, setShowCreateGarage] = useState(null)
  const [createGarageData, setCreateGarageData] = useState({ twilio_number: '', real_phone: '', slug: '' })
  const navigate = useNavigate()

  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    if (!token) {
      navigate('/admin')
      return
    }
    fetchSubmissions()
  }, [token, navigate])

  async function fetchSubmissions() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/onboarding', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (res.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin')
        return
      }

      const data = await res.json()
      setSubmissions(data)
    } catch (err) {
      setError('Failed to load submissions')
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(submissionId, newStatus) {
    try {
      const res = await fetch(`/api/admin/onboarding/${submissionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (res.ok) {
        fetchSubmissions()
      }
    } catch (err) {
      alert('Failed to update status')
    }
  }

  async function createGarageFromSubmission(submissionId) {
    try {
      const res = await fetch(`/api/admin/onboarding/${submissionId}/create-garage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(createGarageData)
      })

      const data = await res.json()

      if (res.ok) {
        alert(`Garage created successfully! Slug: ${data.slug}`)
        setShowCreateGarage(null)
        setCreateGarageData({ twilio_number: '', real_phone: '', slug: '' })
        fetchSubmissions()
      } else {
        alert(data.error || 'Failed to create garage')
      }
    } catch (err) {
      alert('Failed to create garage')
    }
  }

  function getStatusStyle(status) {
    switch (status) {
      case 'approved': return 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
      case 'rejected': return 'bg-white text-[#4A4A4A] border-[#4A4A4A]'
      default: return 'bg-white text-[#1A1A1A] border-[#1A1A1A]'
    }
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
            <h1 className="text-2xl font-bold text-white">Client Onboarding</h1>
            <p className="text-sm text-[#9CA3AF]">
              {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
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
            <a
              href="/onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-white text-[#1A1A1A] rounded-xl hover:bg-[#F0F0F0] font-medium transition-all duration-200"
            >
              View Public Form
            </a>
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
          {submissions.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 bg-[#FAFAFA] rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-[#1A1A1A]">
                <svg className="w-8 h-8 text-[#4A4A4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-[#4A4A4A]">No onboarding submissions yet</p>
              <p className="text-sm text-[#9CA3AF] mt-1">
                Share the onboarding form with new clients: 
                <a href="/onboarding" target="_blank" className="text-[#1A1A1A] hover:text-[#4A4A4A] ml-1 font-medium">
                  /onboarding
                </a>
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FAFAFA] border-b-2 border-[#1A1A1A]">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Business</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Phone Numbers</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0E0E0]">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-[#FAFAFA] transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-[#4A4A4A]">{sub.submission_date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#1A1A1A]">{sub.business_name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-[#1A1A1A]">{sub.contact_name}</p>
                        <p className="text-sm text-[#4A4A4A]">{sub.contact_email}</p>
                        <p className="text-sm text-[#4A4A4A]">{sub.contact_phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        {sub.mobile_numbers && sub.mobile_numbers.length > 0 ? (
                          <div className="space-y-1">
                            {sub.mobile_numbers.map((num, idx) => (
                              <p key={idx} className="text-sm text-[#4A4A4A]">
                                {num.number} <span className="text-[#9CA3AF]">({num.carrier})</span>
                              </p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-[#9CA3AF]">No numbers</p>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={sub.status}
                          onChange={(e) => updateStatus(sub.id, e.target.value)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 cursor-pointer transition-all duration-200 ${getStatusStyle(sub.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sub.status !== 'approved' && (
                          <button
                            onClick={() => {
                              setShowCreateGarage(sub.id)
                              setCreateGarageData({
                                twilio_number: '+447853301882',
                                real_phone: sub.contact_phone,
                                slug: sub.business_name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
                              })
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A1A1A] text-white hover:bg-[#2D2D2D] rounded-xl text-sm font-medium transition-all duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Create Garage
                          </button>
                        )}
                        {sub.status === 'approved' && (
                          <span className="inline-flex items-center gap-1.5 text-[#1A1A1A] text-sm font-medium">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Garage Created
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Create Garage Modal */}
      {showCreateGarage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border-2 border-[#1A1A1A] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FAFAFA] border-2 border-[#1A1A1A] rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1A1A1A]">Create Garage</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">
                  Garage Slug (URL-friendly name)
                </label>
                <input
                  type="text"
                  value={createGarageData.slug}
                  onChange={(e) => setCreateGarageData({ ...createGarageData, slug: e.target.value })}
                  placeholder="daves-garage"
                  className="w-full px-4 py-2.5 border-2 border-[#1A1A1A] rounded-xl focus:outline-none text-[#2D2D2D] placeholder-[#9CA3AF] transition-all duration-200"
                />
                <p className="text-xs text-[#9CA3AF] mt-1.5">
                  Form URL: <span className="font-mono">/form/{createGarageData.slug || 'your-slug'}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">
                  Twilio Number (where missed calls forward to)
                </label>
                <input
                  type="text"
                  value={createGarageData.twilio_number}
                  onChange={(e) => setCreateGarageData({ ...createGarageData, twilio_number: e.target.value })}
                  placeholder="+14388177856"
                  className="w-full px-4 py-2.5 border-2 border-[#1A1A1A] rounded-xl focus:outline-none text-[#2D2D2D] placeholder-[#9CA3AF] transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">
                  Garage's Real Phone Number
                </label>
                <input
                  type="text"
                  value={createGarageData.real_phone}
                  onChange={(e) => setCreateGarageData({ ...createGarageData, real_phone: e.target.value })}
                  placeholder="+447700900123"
                  className="w-full px-4 py-2.5 border-2 border-[#1A1A1A] rounded-xl focus:outline-none text-[#2D2D2D] placeholder-[#9CA3AF] transition-all duration-200"
                />
              </div>

              {/* Client Setup Instructions */}
              <div className="bg-[#FAFAFA] border-2 border-[#E5E7EB] rounded-xl p-4 mt-4">
                <h4 className="font-semibold text-[#1A1A1A] mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Client Must Do This:
                </h4>
                <p className="text-sm text-[#4A4A4A] mb-3">
                  The garage owner needs to dial this code on their phone to forward missed calls:
                </p>
                <div className="bg-white border border-[#1A1A1A] rounded-lg p-3 font-mono text-center text-lg">
                  **61*{createGarageData.twilio_number || '+447853301882'}**30#
                </div>
                <p className="text-xs text-[#9CA3AF] mt-2 text-center">
                  Dial this code and press CALL to activate
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateGarage(null)}
                className="flex-1 py-3 px-4 bg-white text-[#1A1A1A] rounded-xl hover:bg-[#FAFAFA] border-2 border-[#1A1A1A] font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => createGarageFromSubmission(showCreateGarage)}
                className="flex-1 py-3 px-4 bg-[#1A1A1A] text-white rounded-xl hover:bg-[#2D2D2D] border-2 border-[#1A1A1A] font-semibold transition-all duration-200"
              >
                Create Garage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}