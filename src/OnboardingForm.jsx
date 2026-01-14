// frontend/src/onboardingForm.jsx
import { useState, useRef, useEffect } from 'react'

export default function OnboardingForm() {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    business_name: '',
    registered_address: '',
    company_reg_number: '',
    contact_name: '',
    contact_position: '',
    contact_email: '',
    contact_phone: '',
    mobile_numbers: [{ number: '', carrier: '', purpose: '' }],
    consent_authorize_access: false,
    consent_data_processing: false,
    consent_permissions: false,
    consent_rights: false,
    consent_risks_acknowledged: false,
    signature: '',
    signature_date: new Date().toISOString().split('T')[0],
    witness_name: ''
  })

  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    if (step === 3 && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#1A1A1A'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
    }
  }, [step])

  function updateField(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  function updateMobileNumber(index, field, value) {
    const updated = [...formData.mobile_numbers]
    updated[index] = { ...updated[index], [field]: value }
    setFormData(prev => ({ ...prev, mobile_numbers: updated }))
  }

  function addMobileNumber() {
    setFormData(prev => ({
      ...prev,
      mobile_numbers: [...prev.mobile_numbers, { number: '', carrier: '', purpose: '' }]
    }))
  }

  function removeMobileNumber(index) {
    if (formData.mobile_numbers.length > 1) {
      const updated = formData.mobile_numbers.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, mobile_numbers: updated }))
    }
  }

  function startDrawing(e) {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  function draw(e) {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  function stopDrawing() {
    setIsDrawing(false)
    if (canvasRef.current) {
      const signature = canvasRef.current.toDataURL('image/png')
      updateField('signature', signature)
    }
  }

  function clearSignature() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    updateField('signature', '')
  }

  function validateStep1() {
    const required = ['business_name', 'registered_address', 'company_reg_number', 'contact_name', 'contact_position', 'contact_email', 'contact_phone']
    for (const field of required) {
      if (!formData[field].trim()) {
        setError('Please fill in all required fields')
        return false
      }
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.contact_email)) {
      setError('Please enter a valid email address')
      return false
    }
    setError('')
    return true
  }

  function validateStep2() {
    const validNumbers = formData.mobile_numbers.filter(n => n.number.trim() && n.carrier.trim())
    if (validNumbers.length === 0) {
      setError('Please add at least one mobile number with carrier')
      return false
    }
    setError('')
    return true
  }

  function validateStep3() {
    const consents = ['consent_authorize_access', 'consent_data_processing', 'consent_permissions', 'consent_rights', 'consent_risks_acknowledged']
    for (const consent of consents) {
      if (!formData[consent]) {
        setError('Please accept all consent declarations')
        return false
      }
    }
    if (!formData.signature) {
      setError('Please provide your signature')
      return false
    }
    setError('')
    return true
  }

  function nextStep() {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2 && validateStep2()) setStep(3)
  }

  function prevStep() {
    if (step > 1) setStep(step - 1)
    setError('')
  }

  async function handleSubmit() {
    if (!validateStep3()) return
    setSubmitting(true)
    setError('')
    try {
      const cleanedData = { ...formData, mobile_numbers: formData.mobile_numbers.filter(n => n.number.trim()) }
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData)
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Submission failed. Please try again.')
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-[#EEEEEE] p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#FAFAFA] border border-[#EEEEEE] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Thank You!</h1>
          <p className="text-[#4A4A4A] mb-4">Your onboarding form has been submitted successfully.</p>
          <p className="text-[#9CA3AF] text-sm">We will review your details and contact you within 24-48 hours.</p>
          <div className="mt-6 p-4 bg-[#FAFAFA] rounded-xl border border-[#EEEEEE]">
            <p className="text-sm text-[#4A4A4A]"><strong className="text-[#1A1A1A]">What's next?</strong><br />You'll receive a confirmation email at {formData.contact_email}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-[#1A1A1A] text-white py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Client Onboarding</h1>
        <p className="text-[#9CA3AF]">Missed Call Automation System</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all duration-300 ${step >= s ? 'bg-[#1A1A1A] text-white shadow-lg shadow-black/10' : 'bg-white text-[#9CA3AF] border border-[#E0E0E0]'}`}>
                {step > s ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : s}
              </div>
              {s < 3 && <div className={`w-16 md:w-32 h-1 mx-2 rounded-full transition-all duration-300 ${step > s ? 'bg-[#1A1A1A]' : 'bg-[#E0E0E0]'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-[#4A4A4A] font-medium">
          <span>Business Details</span>
          <span>Phone Numbers</span>
          <span>Consent & Sign</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-[#EEEEEE] p-6 md:p-8">
          {error && <div className="bg-[#FAFAFA] text-[#2D2D2D] px-4 py-3 rounded-xl mb-6 text-sm border border-[#E0E0E0]">{error}</div>}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Business Details</h2>
              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Business Name <span className="text-[#4A4A4A]">*</span></label>
                <input type="text" value={formData.business_name} onChange={(e) => updateField('business_name', e.target.value)} placeholder="Dave's Garage Ltd" className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] bg-white text-[#2D2D2D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] transition-all duration-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Registered Address <span className="text-[#4A4A4A]">*</span></label>
                <textarea value={formData.registered_address} onChange={(e) => updateField('registered_address', e.target.value)} placeholder="123 High Street, London, SW1A 1AA" rows={2} className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] bg-white text-[#2D2D2D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] transition-all duration-200 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Company Registration Number <span className="text-[#4A4A4A]">*</span></label>
                <input type="text" value={formData.company_reg_number} onChange={(e) => updateField('company_reg_number', e.target.value)} placeholder="12345678" className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] bg-white text-[#2D2D2D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] transition-all duration-200" />
              </div>
              <hr className="my-6 border-[#EEEEEE]" />
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Contact Person</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Full Name <span className="text-[#4A4A4A]">*</span></label>
                  <input type="text" value={formData.contact_name} onChange={(e) => updateField('contact_name', e.target.value)} placeholder="John Smith" className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] bg-white text-[#2D2D2D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Position <span className="text-[#4A4A4A]">*</span></label>
                  <input type="text" value={formData.contact_position} onChange={(e) => updateField('contact_position', e.target.value)} placeholder="Owner / Director" className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] bg-white text-[#2D2D2D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] transition-all duration-200" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Email <span className="text-[#4A4A4A]">*</span></label>
                  <input type="email" value={formData.contact_email} onChange={(e) => updateField('contact_email', e.target.value)} placeholder="john@davesgarage.com" className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] bg-white text-[#2D2D2D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Phone <span className="text-[#4A4A4A]">*</span></label>
                  <input type="tel" value={formData.contact_phone} onChange={(e) => updateField('contact_phone', e.target.value)} placeholder="+44 7700 900123" className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] bg-white text-[#2D2D2D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] transition-all duration-200" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Mobile Numbers for Monitoring</h2>
                <p className="text-sm text-[#4A4A4A] mb-4">List all phone numbers you want to monitor for missed calls.</p>
              </div>
              {formData.mobile_numbers.map((num, index) => (
                <div key={index} className="p-4 bg-[#FAFAFA] rounded-xl border border-[#EEEEEE]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-[#1A1A1A]">Phone #{index + 1}</span>
                    {formData.mobile_numbers.length > 1 && <button onClick={() => removeMobileNumber(index)} className="text-[#4A4A4A] hover:text-[#1A1A1A] text-sm font-medium transition-colors duration-200">Remove</button>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#4A4A4A] mb-1">Phone Number</label>
                      <input type="tel" value={num.number} onChange={(e) => updateMobileNumber(index, 'number', e.target.value)} placeholder="+44 7700 900123" className="w-full px-3 py-2.5 rounded-lg border border-[#E0E0E0] bg-white text-[#2D2D2D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] transition-all duration-200 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4A4A4A] mb-1">Carrier</label>
                      <select value={num.carrier} onChange={(e) => updateMobileNumber(index, 'carrier', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-[#E0E0E0] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] transition-all duration-200 text-sm">
                        <option value="">Select carrier...</option>
                        <option value="O2">O2</option>
                        <option value="EE">EE</option>
                        <option value="Vodafone">Vodafone</option>
                        <option value="Three">Three</option>
                        <option value="MVNO">MVNO (Other)</option>
                        <option value="Landline">Landline</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4A4A4A] mb-1">Purpose</label>
                      <input type="text" value={num.purpose} onChange={(e) => updateMobileNumber(index, 'purpose', e.target.value)} placeholder="Customer leads" className="w-full px-3 py-2.5 rounded-lg border border-[#E0E0E0] bg-white text-[#2D2D2D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] transition-all duration-200 text-sm" />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addMobileNumber} className="w-full py-3.5 border-2 border-dashed border-[#E0E0E0] rounded-xl text-[#4A4A4A] hover:border-[#1A1A1A] hover:text-[#1A1A1A] hover:bg-[#FAFAFA] transition-all duration-200 font-medium">+ Add Another Number</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Consent Declaration</h2>
                <p className="text-sm text-[#4A4A4A] mb-4">GDPR Compliant - UK Data Protection Act 2018</p>
              </div>
              <div className="space-y-3">
                {[
                  { key: 'consent_authorize_access', title: 'Authorize Access', desc: 'Grant read-only access to call logs, billing records, and usage data for the listed numbers via carrier APIs/portals. Access limited to detecting "missed calls" (no-answer events).' },
                  { key: 'consent_data_processing', title: 'Data Processing', desc: 'Consent to processing of personal data (call timestamps, statuses, caller IDs where visible) solely for automation (e.g., SMS replies, CRM updates). Data retained 30 days max, then deleted.' },
                  { key: 'consent_permissions', title: 'Permissions', desc: 'Provide login credentials, OAuth tokens, or NOC as needed for integration. Authorize as delegated partner with carriers.' },
                  { key: 'consent_rights', title: 'Rights', desc: 'Retain rights to revoke consent anytime, request data deletion (within 30 days), or port data. No data sharing with third parties without further consent.' },
                  { key: 'consent_risks_acknowledged', title: 'Risks Acknowledged', desc: 'Potential carrier fees for API polling; system accuracy ~95% (false positives from short answered calls minimized). Liable for any misuse of automations (e.g., spam).' }
                ].map(({ key, title, desc }) => (
                  <label key={key} className="flex items-start gap-3 p-4 bg-[#FAFAFA] rounded-xl border border-[#EEEEEE] cursor-pointer hover:bg-[#F5F5F5] hover:border-[#E0E0E0] transition-all duration-200">
                    <input type="checkbox" checked={formData[key]} onChange={(e) => updateField(key, e.target.checked)} className="mt-0.5 w-5 h-5 text-[#1A1A1A] rounded border-[#E0E0E0] focus:ring-[#1A1A1A]/20 focus:ring-offset-0" />
                    <div>
                      <span className="font-semibold text-[#1A1A1A]">{title}</span>
                      <p className="text-sm text-[#4A4A4A] mt-1">{desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <hr className="my-6 border-[#EEEEEE]" />
              <div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Digital Signature</h3>
                <div className="border-2 border-[#E0E0E0] rounded-xl overflow-hidden">
                  <canvas ref={canvasRef} width={500} height={150} className="w-full bg-white cursor-crosshair touch-none" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-[#9CA3AF]">Sign above using mouse or touch</p>
                  <button onClick={clearSignature} className="text-sm text-[#1A1A1A] hover:text-[#4A4A4A] font-medium transition-colors duration-200">Clear Signature</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Date</label>
                  <input type="date" value={formData.signature_date} onChange={(e) => updateField('signature_date', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Witness Name <span className="text-[#9CA3AF]">(Optional)</span></label>
                  <input type="text" value={formData.witness_name} onChange={(e) => updateField('witness_name', e.target.value)} placeholder="Optional witness" className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] bg-white text-[#2D2D2D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] transition-all duration-200" />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {step > 1 && <button onClick={prevStep} className="flex-1 py-3.5 px-4 bg-[#FAFAFA] text-[#4A4A4A] rounded-xl font-semibold hover:bg-[#F0F0F0] border border-[#EEEEEE] transition-all duration-200">Back</button>}
            {step < 3 ? (
              <button onClick={nextStep} className="flex-1 py-3.5 px-4 bg-[#1A1A1A] text-white rounded-xl font-semibold hover:bg-[#2D2D2D] shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 hover:-translate-y-0.5 transition-all duration-200">Continue</button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting} className={`flex-1 py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 ${submitting ? 'bg-[#E0E0E0] text-[#9CA3AF] cursor-not-allowed' : 'bg-[#1A1A1A] text-white hover:bg-[#2D2D2D] shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 hover:-translate-y-0.5'}`}>
                {submitting ? 'Submitting...' : 'Submit Onboarding Form'}
              </button>
            )}
          </div>
        </div>
        <p className="text-center text-[#9CA3AF] text-sm mt-6">By submitting this form, you agree to our terms of service and privacy policy.</p>
      </div>
    </div>
  )
}