// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import LeadForm from './LeadForm'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import AdminLeads from './AdminLeads'
import AdminOnboarding from './AdminOnboarding'
import OnboardingForm from './OnboardingForm'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page - Home */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Public Routes */}
        <Route path="/form/:garageSlug" element={<LeadForm />} />
        <Route path="/onboarding" element={<OnboardingForm />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
        <Route path="/admin/leads/:garageSlug" element={<AdminLeads />} />
        <Route path="/admin/onboarding" element={<AdminOnboarding />} />
        
        {/* 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-[#0a0a14]">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-[#c4c0ff] mb-4">404</h1>
              <p className="text-[#94a3b8] mb-6">Page not found</p>
              <a href="/" className="px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-xl text-white font-semibold hover:shadow-lg transition-all">
                Go Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
