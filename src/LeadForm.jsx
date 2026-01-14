// frontend/src/leadform.jsx 
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


function isValidUKRegistration(reg) {
  const cleaned = reg.toUpperCase().replace(/\s/g, '')
  const patterns = [
    /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/,
    /^[A-Z][0-9]{1,3}[A-Z]{3}$/,
    /^[A-Z]{3}[0-9]{1,3}[A-Z]$/,
    /^[A-Z]{1,3}[0-9]{1,4}$/,
    /^[0-9]{1,4}[A-Z]{1,3}$/,
  ]
  return patterns.some(p => p.test(cleaned))
}

function formatReg(reg) {
  const c = reg.toUpperCase().replace(/\s/g, '')
  return c.length === 7 ? c.slice(0,4) + ' ' + c.slice(4) : c
}

export default function LeadForm() {
  const { garageSlug } = useParams()
  const [garage, setGarage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [registration, setRegistration] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')
  const [regError, setRegError] = useState('')
  const [regValid, setRegValid] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch(`/api/garages/${garageSlug}`)
      .then(res => { if (!res.ok) throw new Error('Garage not found'); return res.json() })
      .then(data => { setGarage(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [garageSlug])

  useEffect(() => {
    if (!registration) { setRegError(''); setRegValid(false); return }
    const cleaned = registration.replace(/\s/g, '')
    if (cleaned.length < 2) { setRegError(''); setRegValid(false); return }
    if (isValidUKRegistration(cleaned)) { setRegError(''); setRegValid(true) }
    else if (cleaned.length >= 7) { setRegError('Please enter a valid UK registration'); setRegValid(false) }
    else { setRegError(''); setRegValid(false) }
  }, [registration])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!regValid) { setRegError('Please enter a valid UK registration'); return }
    if (!name.trim() || !phone.trim() || !reason) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          garage_slug: garageSlug,
          registration: registration.toUpperCase().replace(/\s/g, ''),
          name: name.trim(),
          phone: phone.trim(),
          reason,
          message: message.trim()
        })
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed') }
      setSubmitted(true)
    } catch (err) { alert(err.message) }
    finally { setSubmitting(false) }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Garage Not Found</h1>
        <p className="text-gray-600">Sorry, we could not find this garage.</p>
      </div>
    </div>
  )

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-4">{garage.name} will call you back shortly.</p>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Vehicle</p>
          <p className="text-xl font-bold text-gray-800">{formatReg(registration)}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-blue-600 text-white py-6 px-4 text-center">
        <h1 className="text-xl font-bold mb-1">{garage.name}</h1>
        <p className="text-blue-100 text-sm">Sorry we missed your call! Book below.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Registration <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input type="text" value={registration} onChange={(e) => setRegistration(e.target.value.toUpperCase())}
              placeholder="AB12 CDE" maxLength={8}
              className={`w-full text-center text-2xl font-bold tracking-wider py-4 px-4 rounded-lg border-2 uppercase
                ${regError ? 'border-red-300 bg-red-50' : regValid ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-yellow-50'}
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
              style={{ fontFamily: 'monospace' }} />
            {regValid && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          {regError && <p className="mt-2 text-sm text-red-600">{regError}</p>}
          <p className="mt-2 text-xs text-gray-500 text-center">Enter your UK vehicle registration</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Name <span className="text-red-500">*</span></label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" required
            className="w-full py-3 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07700 900123" required
            className="w-full py-3 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">What do you need? <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-2 gap-2">
            {['MOT', 'Service', 'Repair', 'Other'].map((opt) => (
              <button key={opt} type="button" onClick={() => setReason(opt)}
                className={`py-3 px-4 rounded-lg font-medium transition-all
                  ${reason === opt ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Message <span className="text-gray-400">(optional)</span></label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Any details..." rows={3}
            className="w-full py-3 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>

        <button type="submit" disabled={!regValid || !name.trim() || !phone.trim() || !reason || submitting}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all
            ${regValid && name.trim() && phone.trim() && reason && !submitting
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
          {submitting ? 'Submitting...' : 'Request Callback'}
        </button>
        
        <p className="text-center text-xs text-gray-500">By submitting, you agree to be contacted by {garage.name}</p>
      </form>
    </div>
  )
}
