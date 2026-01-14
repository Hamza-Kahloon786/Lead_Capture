 // frontend/src/LandingPage.jsx background black type
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Intersection Observer hook
function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => observer.disconnect()
  }, [threshold])
  
  return [ref, isInView]
}

// Animated counter hook
function useCountUp(end, duration = 2000, start = 0, shouldStart = false) {
  const [count, setCount] = useState(start)
  
  useEffect(() => {
    if (!shouldStart) return
    
    let startTime = null
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * (end - start) + start))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration, start, shouldStart])
  
  return count
}

// Navigation Component - Updated with clear visibility
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
      ${scrolled 
        ? 'bg-[#0a0a14]/98 backdrop-blur-xl border-b border-[#6366f1]/30 shadow-lg shadow-[#6366f1]/10' 
        : 'bg-[#0a0a14]/90 backdrop-blur-md border-b border-[#1e1e3f]/60'
      }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center group cursor-pointer">
  <img 
  src="/logo1.jpg" 
  alt="GarageAI Logo" 
  className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
/>
</div>
          
          <div className="hidden md:flex items-center gap-1">
            <button onClick={() => scrollToSection('how-it-works')} className="px-4 py-2 rounded-lg text-[#e0e7ff] text-sm font-medium hover:bg-[#1e1e3f]/70 hover:text-white transition-all duration-300">How It Works</button>
            <button onClick={() => scrollToSection('calculator')} className="px-4 py-2 rounded-lg text-[#e0e7ff] text-sm font-medium hover:bg-[#1e1e3f]/70 hover:text-white transition-all duration-300">Calculator</button>
            <button onClick={() => scrollToSection('pricing')} className="px-4 py-2 rounded-lg text-[#e0e7ff] text-sm font-medium hover:bg-[#1e1e3f]/70 hover:text-white transition-all duration-300">Pricing</button>
            <button onClick={() => scrollToSection('faq')} className="px-4 py-2 rounded-lg text-[#e0e7ff] text-sm font-medium hover:bg-[#1e1e3f]/70 hover:text-white transition-all duration-300">FAQ</button>
            <button onClick={() => scrollToSection('contact')} className="px-4 py-2 rounded-lg text-[#e0e7ff] text-sm font-medium hover:bg-[#1e1e3f]/70 hover:text-white transition-all duration-300">Contact</button>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <Link to="/admin" className="px-4 py-2 rounded-lg text-[#e0e7ff] text-sm font-medium hover:bg-[#1e1e3f]/70 hover:text-white transition-all duration-300">Admin</Link>
            <button onClick={() => scrollToSection('demo')} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300" />
              <span className="relative px-5 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-xl text-white text-sm font-semibold flex items-center gap-1 shadow-lg shadow-[#6366f1]/30">Book Demo →</span>
            </button>
          </div>
          
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-[#1e1e3f]/50 mt-2 pt-4">
            <div className="flex flex-col gap-2">
              <button onClick={() => scrollToSection('how-it-works')} className="px-4 py-2.5 rounded-lg bg-[#1e1e3f]/50 text-[#e0e7ff] font-medium text-left text-sm hover:bg-[#1e1e3f] transition-colors">How It Works</button>
              <button onClick={() => scrollToSection('calculator')} className="px-4 py-2.5 rounded-lg bg-[#1e1e3f]/50 text-[#e0e7ff] font-medium text-left text-sm hover:bg-[#1e1e3f] transition-colors">Calculator</button>
              <button onClick={() => scrollToSection('pricing')} className="px-4 py-2.5 rounded-lg bg-[#1e1e3f]/50 text-[#e0e7ff] font-medium text-left text-sm hover:bg-[#1e1e3f] transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('faq')} className="px-4 py-2.5 rounded-lg bg-[#1e1e3f]/50 text-[#e0e7ff] font-medium text-left text-sm hover:bg-[#1e1e3f] transition-colors">FAQ</button>
              <button onClick={() => scrollToSection('contact')} className="px-4 py-2.5 rounded-lg bg-[#1e1e3f]/50 text-[#e0e7ff] font-medium text-left text-sm hover:bg-[#1e1e3f] transition-colors">Contact</button>
              <Link to="/admin" className="px-4 py-2.5 rounded-lg bg-[#1e1e3f]/50 text-[#e0e7ff] font-medium text-sm hover:bg-[#1e1e3f] transition-colors">Admin</Link>
              <button onClick={() => scrollToSection('demo')} className="px-4 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg text-white font-semibold mt-2 text-sm shadow-lg shadow-[#6366f1]/30">Book Demo →</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
// Updated Hero Section with simplified orbital lines
function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => { setIsVisible(true) }, [])

  const scrollToDemo = () => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToCalculator = () => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
  
  // Realistic orbital items with images (no emojis, no initials)
  const orbitalItems = [
    { 
      type: 'image', 
      imageType: 'phone', 
      position: 'top-8 left-1/2 -translate-x-1/2',
      rotate: 'rotate-12'
    },
    { 
      type: 'image', 
      imageType: 'car', 
      position: 'top-16 right-8',
      rotate: '-rotate-12'
    },
    { 
      type: 'image', 
      imageType: 'wrench', 
      position: 'right-0 top-1/3',
      rotate: 'rotate-45'
    },
    { 
      type: 'image', 
      imageType: 'form', 
      position: 'right-4 bottom-1/3',
      rotate: '-rotate-45'
    },
    { 
      type: 'image', 
      imageType: 'check', 
      position: 'bottom-16 right-16',
      rotate: 'rotate-22'
    },
    { 
      type: 'image', 
      imageType: 'gear', 
      position: 'bottom-8 left-1/2 -translate-x-1/2',
      rotate: '-rotate-22'
    },
    { 
      type: 'image', 
      imageType: 'message', 
      position: 'bottom-16 left-16',
      rotate: 'rotate-15'
    },
    { 
      type: 'image', 
      imageType: 'calendar', 
      position: 'left-4 bottom-1/3',
      rotate: '-rotate-15',
      highlight: true 
    },
    { 
      type: 'image', 
      imageType: 'clock', 
      position: 'left-0 top-1/3',
      rotate: 'rotate-30'
    },
    { 
      type: 'image', 
      imageType: 'chart', 
      position: 'top-16 left-8',
      rotate: '-rotate-30'
    },
  ]
  
  // Image components for orbital items
  const ImageComponent = ({ type, rotate }) => {
    const commonClasses = "flex items-center justify-center bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20 backdrop-blur-sm border border-[#6366f1]/30 rounded-xl shadow-lg"
    
    const images = {
      phone: (
        <div className={`w-10 h-10 lg:w-12 lg:h-12 ${commonClasses} ${rotate}`}>
          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#a5b4fc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
      ),
      car: (
        <div className={`w-10 h-10 lg:w-12 lg:h-12 ${commonClasses} ${rotate}`}>
          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#a5b4fc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 011.447-.894L9 10m0 0l9-5m-9 5v10m9-5v10m0 0l5.447-2.724A1 1 0 0021 16.382V7.618a1 1 0 00-1.447-.894L15 10" />
          </svg>
        </div>
      ),
      wrench: (
        <div className={`w-10 h-10 lg:w-12 lg:h-12 ${commonClasses} ${rotate}`}>
          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#a5b4fc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      ),
      form: (
        <div className={`w-10 h-10 lg:w-12 lg:h-12 ${commonClasses} ${rotate}`}>
          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#a5b4fc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      ),
      check: (
        <div className={`w-10 h-10 lg:w-12 lg:h-12 ${commonClasses} ${rotate}`}>
          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ),
      gear: (
        <div className={`w-10 h-10 lg:w-12 lg:h-12 ${commonClasses} ${rotate}`}>
          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#a5b4fc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
        </div>
      ),
      message: (
        <div className={`w-10 h-10 lg:w-12 lg:h-12 ${commonClasses} ${rotate}`}>
          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#a5b4fc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
      ),
      calendar: (
        <div className={`w-10 h-10 lg:w-12 lg:h-12 ${commonClasses} ${rotate}`}>
          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#fbbf24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      ),
      clock: (
        <div className={`w-10 h-10 lg:w-12 lg:h-12 ${commonClasses} ${rotate}`}>
          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#a5b4fc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      chart: (
        <div className={`w-10 h-10 lg:w-12 lg:h-12 ${commonClasses} ${rotate}`}>
          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      ),
    }
    
    return images[type] || images.phone
  }
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a14] via-[#0d0d1a] to-[#0a0a14]">
        {/* Galaxy effect lines */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Central white glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
        </div>
        
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6366f1]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT SIDE - Content with REDUCED FONT SIZE */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* REDUCED FONT SIZE */}
            <h1 className="mb-5">
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.1] tracking-tight text-white">
                Turn Your Missed
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.1] tracking-tight text-white">
               Calls Into Leads
              </span>
              {/* <span className="block text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.1] tracking-tight text-white">
                Out of Reach –
              </span> */}
              <span className="block text-xl sm:text-2xl lg:text-3xl font-black leading-[1.1] tracking-tight mt-3">
                <span className="text-transparent bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text">Now Just One</span>
              </span>
              <span className="block text-xl sm:text-2xl lg:text-3xl font-black leading-[1.1] tracking-tight">
                <span className="text-transparent bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text">Click Away!</span>
              </span>
            </h1>
            
            <p className="text-sm sm:text-base text-[#c4c0ff] leading-relaxed mb-6 max-w-lg">
              GarageAI turns every missed call into a potential paying customer. We instantly send one polite SMS — then guide the customer to a simple form to collect full details.
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button onClick={scrollToDemo} className="group relative inline-flex">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300" />
                <span className="relative px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full text-white font-semibold text-sm flex items-center gap-2 hover:shadow-xl transition-all duration-300">
                  BOOK Demo
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 text-xs text-[#94a3b8]">
              {['£49/month', 'Cancel anytime', 'Works with your number'].map((text, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-[#22c55e]/30 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* RIGHT SIDE - Updated Orbital Animation with SIMPLIFIED lines */}
          <div className={`relative flex items-center justify-center transform transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative w-[350px] h-[350px] lg:w-[420px] lg:h-[420px]">
              
              {/* SIMPLIFIED: Just clear white orbital rings - no multiple layers */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Outer ring - Bright white and clear */}
                <div className="absolute w-full h-full border-[2px] border-white/60 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
                
                {/* Middle ring - clear */}
                <div className="absolute w-[75%] h-[75%] border-[1.5px] border-white/50 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                
                {/* Inner ring - clear */}
                <div className="absolute w-[50%] h-[50%] border-[1px] border-white/40 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
              </div>
              
              {/* Center Content - Stats WITHOUT black box background */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Removed background box - just text floating */}
                <div className="text-center">
                  <div className="text-5xl lg:text-6xl font-black text-transparent bg-gradient-to-r from-white via-[#a5b4fc] to-white bg-clip-text mb-1 drop-shadow-[0_0_20px_rgba(165,180,252,0.5)]">
                    20k+
                  </div>
                  <div className="text-[#a5b4fc] font-medium text-sm tracking-wider">SPECIALISTS</div>
                </div>
              </div>
              
              {/* Floating Orbital Items - Realistic images only (no initials) */}
              {orbitalItems.map((item, index) => (
                <div 
                  key={index}
                  className={`absolute ${item.position} animate-bounce`}
                  style={{ 
                    animationDuration: `${3 + (index * 0.3)}s`,
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  {item.highlight && (
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] rounded text-white text-xs font-medium whitespace-nowrap shadow-lg">
                      Demo
                    </div>
                  )}
                  <ImageComponent type={item.imageType} rotate={item.rotate} />
                </div>
              ))}
              
              {/* Simple star effects */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
              <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
              <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-white rounded-full shadow-[0_0_6px_white]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
// How It Works Section - REDUCED SPACING
function HowItWorksSection() {
  const [ref, isInView] = useInView(0.2)
  
  const steps = [
    { 
      emoji: '📞',
      title: 'Call Missed', 
      description: "You're busy under a car — the call goes unanswered. Our system detects it instantly.",
      glowColor: 'shadow-[#f87171]/50',
      borderHover: 'hover:border-[#f87171]/50'
    },
    { 
      emoji: '⚡',
      title: 'Smart SMS Sent Instantly', 
      description: 'One polite message: "Sorry we missed you — reply with your details for a callback"',
      glowColor: 'shadow-[#fbbf24]/50',
      borderHover: 'hover:border-[#fbbf24]/50'
    },
    { 
      emoji: '📩',
      title: 'Full Lead Delivered', 
      description: 'Customer fills simple form (reg, name, phone, job type & notes) — you get complete lead in inbox.',
      glowColor: 'shadow-[#22c55e]/50',
      borderHover: 'hover:border-[#22c55e]/50'
    }
  ]
  
  return (
    <section id="how-it-works" ref={ref} className="relative py-16 overflow-hidden bg-[#0a0a14]">
      {/* Section Label */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#6366f1]/50 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-12 transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#a5b4fc] text-xs font-semibold mb-4">HOW IT WORKS</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#c4c0ff] mb-3">Invisible & Automatic</h2>
          <p className="text-base text-[#94a3b8]">No software to learn. No dashboard to check. Just leads in your inbox.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`group relative transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <div className={`absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className={`relative p-6 rounded-2xl border border-[#1e1e3f]/50 bg-[#0f0f1a]/95 backdrop-blur-xl ${step.borderHover} transition-all duration-500 hover:-translate-y-1`}>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-sm">{index + 1}</span>
                  </div>
                  
                  <div className={`w-14 h-14 rounded-xl bg-[#1e1e3f]/50 border border-[#3730a3]/30 flex items-center justify-center mb-4 shadow-lg ${step.glowColor} group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{step.emoji}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-[#94a3b8] leading-relaxed">{step.description}</p>
                </div>
              </div>
              
              {index < 2 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 w-6 items-center justify-center z-10">
                  <div className="w-6 h-6 rounded-full bg-[#1e1e3f] border border-[#3730a3]/50 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Calculator Section - REDUCED SPACING
function CalculatorSection() {
  const [ref, isInView] = useInView(0.2)
  const [avgJobValue, setAvgJobValue] = useState(500)
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(5)
  const [closeRate, setCloseRate] = useState(30)
  const [calculated, setCalculated] = useState(false)
  
  const monthlyLoss = Math.round((avgJobValue * missedCallsPerWeek * 4 * closeRate) / 100)
  const yearlyLoss = monthlyLoss * 12
  const displayedMonthly = useCountUp(monthlyLoss, 1000, 0, calculated)
  const displayedYearly = useCountUp(yearlyLoss, 1000, 0, calculated)
  
  return (
    <section id="calculator" ref={ref} className="relative py-16 overflow-hidden">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3730a3]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a] to-[#0a0a14]" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-8 transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#a5b4fc] text-xs font-semibold mb-4">REVENUE CALCULATOR</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#c4c0ff] mb-2">Revenue Missed Calculator</h2>
          <p className="text-sm text-[#94a3b8]">Quick 30-second calculator: See how many potential jobs you're losing every month.</p>
        </div>
        
        <div className={`transform transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative p-6 sm:p-8 rounded-2xl border border-[#1e1e3f]/50 bg-[#0f0f1a]/90 backdrop-blur-xl">
            <div className="space-y-4 mb-6">
              {[
                { label: 'Average job value (£)', value: avgJobValue, setter: setAvgJobValue },
                { label: 'Missed calls per week', value: missedCallsPerWeek, setter: setMissedCallsPerWeek },
                { label: 'Close rate on callbacks (%)', value: closeRate, setter: setCloseRate }
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">{field.label}</label>
                  <input type="number" value={field.value} onChange={(e) => field.setter(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg bg-[#1e1e3f]/50 border border-[#3730a3]/50 text-white text-sm focus:outline-none focus:border-[#6366f1] transition-colors" />
                </div>
              ))}
            </div>
            
            <button onClick={() => setCalculated(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold text-sm hover:shadow-xl transition-all duration-300 mb-6">Calculate Lost Revenue</button>
            
            {calculated && (
              <div className="text-center space-y-3 pt-4 border-t border-[#1e1e3f]">
                <p className="text-sm text-[#94a3b8]">You're potentially leaving...</p>
                <div className="text-2xl font-bold text-white">£{displayedMonthly.toLocaleString()} per month</div>
                <div className="text-4xl font-black text-transparent bg-gradient-to-r from-[#f87171] to-[#fb923c] bg-clip-text">£{displayedYearly.toLocaleString()} per year</div>
                <div className="pt-4">
                  <button onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1e1e3f] border border-[#3730a3]/50 text-white font-semibold text-sm hover:bg-[#2e2e5f] transition-all">Get on the Waitlist →</button>
</div>
</div>
)}
</div>
</div>
</div>
</section>
)
}
// Demo Calendar Section - REDUCED SPACING
function DemoSection() {
const [ref, isInView] = useInView(0.2)
const [currentMonth, setCurrentMonth] = useState(1)
const [currentYear, setCurrentYear] = useState(2026)
const [selectedDate, setSelectedDate] = useState(null)
const [selectedTime, setSelectedTime] = useState(null)
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate()
const getFirstDay = (m, y) => { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1 }
const isAvailable = (day) => { const d = new Date(currentYear, currentMonth, day).getDay(); return d >= 1 && d <= 5 }
const prevMonth = () => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1) } else { setCurrentMonth(currentMonth - 1) } setSelectedDate(null); setSelectedTime(null) }
const nextMonth = () => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1) } else { setCurrentMonth(currentMonth + 1) } setSelectedDate(null); setSelectedTime(null) }
const timeSlots = ['9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am', '2:00pm', '2:30pm', '3:00pm', '3:30pm', '4:00pm', '4:30pm']
return (
<section id="demo" ref={ref} className="relative py-16 overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3730a3]/50 to-transparent" />
<div className="absolute inset-0"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6366f1]/10 rounded-full blur-[120px]" /></div>
  <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
    <div className={`text-center mb-8 transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#a5b4fc] text-xs font-semibold mb-4">BOOK A DEMO</span>
      <h2 className="text-3xl sm:text-4xl font-black text-[#c4c0ff] mb-2">Book Your 15-Min Demo</h2>
      <p className="text-sm text-[#94a3b8]">See exactly how GarageAI captures missed call leads in real time.</p>
    </div>
    
    <div className={`transform transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="relative max-w-md mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 rounded-2xl blur-xl" />
        <div className="relative p-1.5 rounded-2xl border border-[#1e1e3f]/50 bg-[#0f0f1a]/90">
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] flex items-center justify-center"><span className="text-white font-bold text-sm">D</span></div>
                <div><p className="text-xs text-gray-500">Daniel Lubbe</p><p className="text-lg font-bold text-gray-900">30 Minute Meeting</p></div>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>30 min</div>
                <div className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Web conferencing</div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-4 text-sm">Select a Date & Time</h3>
              <div className="flex items-center justify-center gap-3 mb-4">
                <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><svg className="w-4 h-4 text-[#006BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
                <span className="font-semibold text-gray-900 text-sm min-w-[140px] text-center">{months[currentMonth]} {currentYear}</span>
                <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><svg className="w-4 h-4 text-[#006BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-4">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i} className="py-1.5 text-gray-400 font-semibold">{d}</div>)}
                {[...Array(getFirstDay(currentMonth, currentYear))].map((_, i) => <div key={`e-${i}`} className="py-2" />)}
                {[...Array(getDaysInMonth(currentMonth, currentYear))].map((_, i) => {
                  const day = i + 1, avail = isAvailable(day), sel = selectedDate === day
                  return <button key={day} onClick={() => avail && setSelectedDate(day)} disabled={!avail} className={`py-2 rounded-full font-medium transition-all text-xs ${sel ? 'bg-[#006BFF] text-white' : avail ? 'text-[#006BFF] hover:bg-[#006BFF]/10' : 'text-gray-300'}`}>{day}</button>
                })}
              </div>
              
              {selectedDate && (
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <p className="text-xs text-gray-500 mb-2">Available times for {months[currentMonth]} {selectedDate}:</p>
                  <div className="grid grid-cols-4 gap-1.5">
                    {timeSlots.map(t => <button key={t} onClick={() => setSelectedTime(t)} className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${selectedTime === t ? 'bg-[#006BFF] text-white' : 'border border-[#006BFF] text-[#006BFF] hover:bg-[#006BFF]/10'}`}>{t}</button>)}
                  </div>
                  {selectedTime && <button className="w-full mt-4 py-2.5 bg-[#006BFF] text-white font-semibold rounded-lg text-sm hover:bg-[#0052cc] transition-colors">Confirm Booking</button>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
)
}
// Waitlist Section - REDUCED SPACING
function WaitlistSection() {
const [ref, isInView] = useInView(0.2)
const [email, setEmail] = useState('')
const [submitted, setSubmitted] = useState(false)
return (
<section id="waitlist" ref={ref} className="relative py-16 overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3730a3]/50 to-transparent" />
<div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] to-[#0d0d1a]" />
  <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
    <div className={`transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#4ade80] text-xs font-semibold mb-4"><span className="relative flex h-2 w-2 mr-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span></span>Limited Spots</span>
      <h2 className="text-3xl sm:text-4xl font-black text-[#c4c0ff] mb-2">Join the Early Access Waitlist</h2>
      <p className="text-sm text-[#94a3b8] mb-8">Be first in line when we launch in February 2026.</p>
      
      {!submitted ? (
        <form onSubmit={(e) => { e.preventDefault(); if(email) setSubmitted(true) }} className="max-w-sm mx-auto">
          <div className="relative flex gap-2 p-1.5 rounded-xl bg-[#0f0f1a] border border-[#1e1e3f]">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="flex-1 px-3 py-2 rounded-lg bg-transparent text-white placeholder-[#64748b] text-sm focus:outline-none" />
            <button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold text-sm">Join</button>
          </div>
        </form>
      ) : (
        <div className="max-w-sm mx-auto p-4 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30">
          <svg className="w-10 h-10 text-[#22c55e] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <p className="text-[#4ade80] font-semibold text-sm">You're on the list!</p>
        </div>
      )}
    </div>
  </div>
</section>
)
}
// Pricing Section - REDUCED SPACING
function PricingSection() {
const [ref, isInView] = useInView(0.2)
const features = ['Unlimited missed call detection', 'Instant SMS to every missed caller', 'Custom branded lead capture form', 'Full leads delivered to your inbox', 'Works with your existing number', 'No contracts — cancel anytime', 'UK-based support', 'GDPR compliant']
return (
<section id="pricing" ref={ref} className="relative py-16 overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3730a3]/50 to-transparent" />
  <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
    <div className={`text-center mb-10 transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#a5b4fc] text-xs font-semibold mb-4">SIMPLE PRICING</span>
      <h2 className="text-3xl sm:text-4xl font-black text-[#c4c0ff] mb-2">Stop Losing Jobs to Missed Calls</h2>
      <p className="text-sm text-[#94a3b8]">£49/month • Starts working today • Pause or cancel anytime</p>
    </div>
    
    <div className={`transform transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="relative max-w-md mx-auto group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
        <div className="relative p-6 sm:p-8 rounded-2xl border border-[#6366f1]/50 bg-[#0f0f1a]/95 backdrop-blur-xl">
          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-1"><span className="text-5xl font-black text-white">£49</span><span className="text-[#94a3b8] text-lg">/month</span></div>
            <p className="text-[#64748b] text-xs mt-1">+ VAT where applicable</p>
          </div>
          
          <div className="space-y-3 mb-6">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22c55e]/20 flex items-center justify-center"><svg className="w-3 h-3 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></div>
                <span className="text-sm text-[#e2e8f0]">{f}</span>
              </div>
            ))}
          </div>
          
          <button onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold text-sm hover:shadow-xl transition-all duration-300">Book Demo Now →</button>
          <p className="text-center text-[#64748b] text-xs mt-3">No credit card required for demo</p>
        </div>
      </div>
    </div>
  </div>
</section>
)
}
// FAQ Section - REDUCED SPACING
function FAQSection() {
const [ref, isInView] = useInView(0.2)
const [openIndex, setOpenIndex] = useState(null)
const faqs = [
{ q: "How does GarageAI detect missed calls?", a: "We integrate with your phone system via call forwarding. When a call isn't answered within a set time, our system instantly detects it and sends the SMS. No special equipment needed." },
{ q: "Will customers find the SMS intrusive?", a: "Not at all. We send one polite, professional message that customers appreciate. They called because they needed your service — the SMS just makes it easy for them to still reach you." },
{ q: "Do I need to change my phone number?", a: "No! GarageAI works with your existing phone number. We simply add call forwarding that detects when calls go unanswered." },
{ q: "What information does the lead form collect?", a: "The form captures: UK vehicle registration (validated), customer name, phone number, service type (MOT/Service/Repair/Other), and optional notes." },
{ q: "How quickly are leads sent to me?", a: "Instantly. As soon as a customer submits the form, you receive a formatted email with all their details." },
{ q: "Can I pause or cancel the service?", a: "Absolutely. There are no long-term contracts. You can pause during quiet periods or cancel anytime from your account." }
]
return (
<section id="faq" ref={ref} className="relative py-16 overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3730a3]/50 to-transparent" />
<div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] to-[#0d0d1a]" />
  <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8">
    <div className={`text-center mb-8 transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#a5b4fc] text-xs font-semibold mb-4">FAQ</span>
      <h2 className="text-3xl sm:text-4xl font-black text-[#c4c0ff]">Frequently Asked Questions</h2>
    </div>
    
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className={`transform transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 80}ms` }}>
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full p-4 rounded-xl border border-[#1e1e3f]/50 bg-[#0f0f1a]/50 hover:border-[#6366f1]/30 transition-all text-left">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-white text-sm">{faq.q}</h3>
              <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-[#1e1e3f] flex items-center justify-center transition-transform ${openIndex === i ? 'rotate-180' : ''}`}><svg className="w-3 h-3 text-[#a5b4fc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
            </div>
            {openIndex === i && <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed">{faq.a}</p>}
          </button>
        </div>
      ))}
    </div>
  </div>
</section>
)
}
// Footer with Contact - REDUCED SPACING
function Footer() {
return (
<footer id="contact" className="relative pt-12 pb-8 border-t border-[#1e1e3f]/50">
<div className="max-w-7xl mx-auto px-6 lg:px-8">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
<div className="md:col-span-2">
<div className="flex items-center gap-2 mb-4">
<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
<span className="text-xl font-bold text-white">Garage<span className="text-[#a5b4fc]">AI</span></span>
</div>
<p className="text-sm text-[#94a3b8] leading-relaxed max-w-md">Next-Gen Missed Call Lead Recovery for UK Garages. Turn every missed call into a potential paying customer.</p>
</div>
      <div>
        <h4 className="text-white font-bold mb-4 text-sm">Quick Links</h4>
        <ul className="space-y-2">
          {['how-it-works', 'calculator', 'pricing', 'faq', 'demo'].map(id => <li key={id}><a href={`#${id}`} className="text-sm text-[#94a3b8] hover:text-white transition-colors capitalize">{id.replace('-', ' ')}</a></li>)}
        </ul>
      </div>
      
      <div>
        <h4 className="text-white font-bold mb-4 text-sm">Contact Us</h4>
        <ul className="space-y-3">
          <li><a href="mailto:daniel@garageai.co.uk" className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-white transition-colors"><div className="w-8 h-8 rounded-lg bg-[#1e1e3f]/50 flex items-center justify-center"><svg className="w-4 h-4 text-[#a5b4fc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>daniel@garageai.co.uk</a></li>
          <li><a href="tel:07792546820" className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-white transition-colors"><div className="w-8 h-8 rounded-lg bg-[#1e1e3f]/50 flex items-center justify-center"><svg className="w-4 h-4 text-[#a5b4fc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>0779 254 6820</a></li>
        </ul>
      </div>
    </div>
    
    <div className="pt-6 border-t border-[#1e1e3f]/50">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[#64748b] text-xs">© 2026 GarageAI • Next-Gen Missed Call Lead Recovery for UK Garages</p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-[#94a3b8] hover:text-white transition-colors text-xs">Privacy Policy</a>
          <a href="#" className="text-[#94a3b8] hover:text-white transition-colors text-xs">Terms of Service</a>
        </div>
      </div>
    </div>
  </div>
</footer>
)
}
// Main Landing Page
export default function LandingPage() {
return (
<div className="min-h-screen bg-[#0a0a14]">
<Navigation />
<HeroSection />
<HowItWorksSection />
<CalculatorSection />
<DemoSection />
<WaitlistSection />
<PricingSection />
<FAQSection />
<Footer />
</div>
)
}  


// // landingPage.jsx background white
// import { useState, useEffect, useRef } from 'react'

// export default function LandingPage() {
//   const [scrolled, setScrolled] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
//   // Calculator state
//   const [jobValue, setJobValue] = useState(500)
//   const [missedCalls, setMissedCalls] = useState(5)
//   const [closeRate, setCloseRate] = useState(30)
//   const [calculatedRevenue, setCalculatedRevenue] = useState(null)
//   const [isCalculating, setIsCalculating] = useState(false)
  
//   // Waitlist state
//   const [waitlistEmail, setWaitlistEmail] = useState('')
//   const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
  
//   // Animation states
//   const [visibleSections, setVisibleSections] = useState({})
  
//   // Dynamic text rotation for hero phone mockup
//   const [currentTextIndex, setCurrentTextIndex] = useState(0)
//   const dynamicTexts = [
//     { 
//       line1: 'MOT Due Tomorrow', 
//       line2: 'Ford Focus 2019', 
//       line3: 'Customer: John Smith',
//       line4: '07700 900123',
//       platform1: 'Brake Inspection Required',
//       platform2: 'Full Service History Available',
//       platform3: 'Awaiting Customer Response'
//     },
//     { 
//       line1: 'Full Service Booked', 
//       line2: 'BMW 320d 2021', 
//       line3: 'Customer: Sarah Jones',
//       line4: '07712 345678',
//       platform1: 'Oil Change Included',
//       platform2: 'Filter Replacement Due',
//       platform3: 'Appointment Confirmed'
//     },
//     { 
//       line1: 'Clutch Replacement', 
//       line2: 'VW Golf 2018', 
//       line3: 'Customer: Mike Brown',
//       line4: '07798 765432',
//       platform1: 'Parts Ordered',
//       platform2: 'Estimated 4 Hours Labour',
//       platform3: 'Quote Sent to Customer'
//     },
//     { 
//       line1: 'Engine Diagnostic', 
//       line2: 'Audi A4 2020', 
//       line3: 'Customer: Emma Wilson',
//       line4: '07654 321098',
//       platform1: 'Warning Light Investigation',
//       platform2: 'Scan Tool Required',
//       platform3: 'Callback Requested'
//     },
//     { 
//       line1: 'Tyre Replacement x4', 
//       line2: 'Mercedes C-Class 2022', 
//       line3: 'Customer: David Lee',
//       line4: '07890 123456',
//       platform1: 'Premium Tyres Selected',
//       platform2: 'Wheel Alignment Included',
//       platform3: 'Ready for Collection'
//     }
//   ]

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // Rotate dynamic text every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTextIndex((prev) => (prev + 1) % dynamicTexts.length)
//     }, 3000)
//     return () => clearInterval(interval)
//   }, [])

//   // Intersection Observer for scroll animations
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setVisibleSections((prev) => ({
//               ...prev,
//               [entry.target.id]: true
//             }))
//           }
//         })
//       },
//       { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
//     )

//     const sections = document.querySelectorAll('[data-animate]')
//     sections.forEach((section) => observer.observe(section))

//     return () => sections.forEach((section) => observer.unobserve(section))
//   }, [])

//   const calculateRevenue = () => {
//     setIsCalculating(true)
//     setTimeout(() => {
//       const monthlyMissedCalls = missedCalls * 4
//       const potentialLeads = monthlyMissedCalls * (closeRate / 100)
//       const lostRevenue = potentialLeads * jobValue
//       setCalculatedRevenue(Math.round(lostRevenue))
//       setIsCalculating(false)
//     }, 800)
//   }

//   const handleWaitlistSubmit = (e) => {
//     e.preventDefault()
//     if (waitlistEmail) {
//       setWaitlistSubmitted(true)
//     }
//   }

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id)
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' })
//     }
//     setMobileMenuOpen(false)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] via-[#F5F5F0] to-[#FAFAFA] overflow-x-hidden">
      
//       {/* ========== NAVBAR - UPDATED WITH BORDERED BUTTONS ========== */}
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         scrolled 
//           ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-[#E5E7EB]' 
//           : 'bg-white border-b border-[#E5E7EB]'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//            {/* Logo */}
// {/* Logo */}
// <div className="flex items-center">
//   <img 
//     src="/logo.png" 
//     alt="GarageAI Logo" 
//     className="h-12 w-auto object-contain"
//   />
// </div>

//             {/* Desktop Menu - ALL BUTTONS WITH BORDERS */}
//             <div className="hidden lg:flex items-center gap-3">
//               <button 
//                 onClick={() => scrollToSection('how-it-works')} 
//                 className="px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962] hover:bg-[#C9A962]/5 transition-all duration-300"
//               >
//                 How It Works
//               </button>
//               <button 
//                 onClick={() => scrollToSection('calculator')} 
//                 className="px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962] hover:bg-[#C9A962]/5 transition-all duration-300"
//               >
//                 Calculator
//               </button>
//               <button 
//                 onClick={() => scrollToSection('demo')} 
//                 className="px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962] hover:bg-[#C9A962]/5 transition-all duration-300"
//               >
//                 Demo
//               </button>
//               <button 
//                 onClick={() => scrollToSection('pricing')} 
//                 className="px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962] hover:bg-[#C9A962]/5 transition-all duration-300"
//               >
//                 Pricing
//               </button>
//               <button 
//                 onClick={() => scrollToSection('contact')} 
//                 className="px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962] hover:bg-[#C9A962]/5 transition-all duration-300"
//               >
//                 Contact
//               </button>
//               <a 
//                 href="/admin" 
//                 className="px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962] hover:bg-[#C9A962]/5 transition-all duration-300"
//               >
//                 Admin
//               </a>
//             </div>

//             {/* CTA Button - Larger */}
//             <div className="hidden lg:block">
//               <button 
//                 onClick={() => scrollToSection('demo')}
//                 className="px-8 py-3 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-full shadow-lg shadow-[#C9A962]/30 hover:shadow-xl hover:shadow-[#C9A962]/40 hover:-translate-y-0.5 transition-all duration-300"
//               >
//                 Book Demo
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <button 
//               className="lg:hidden p-2"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {mobileMenuOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
//           <div className="bg-white border-t border-[#E5E7EB] px-4 py-6 space-y-3">
//             <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962]">How It Works</button>
//             <button onClick={() => scrollToSection('calculator')} className="block w-full text-left px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962]">Calculator</button>
//             <button onClick={() => scrollToSection('demo')} className="block w-full text-left px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962]">Demo</button>
//             <button onClick={() => scrollToSection('pricing')} className="block w-full text-left px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962]">Pricing</button>
//             <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962]">Contact</button>
//             <a href="/admin" className="block w-full text-left px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962]">Admin</a>
//             <button onClick={() => scrollToSection('demo')} className="w-full px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-full mt-4">Book Demo</button>
//           </div>
//         </div>
//       </nav>

//       {/* ========== HERO SECTION - WITH ANIMATED PHONE & DYNAMIC TEXT ========== */}
//       <section className="relative pt-24 pb-12 lg:pt-28 lg:pb-16 bg-[#FAFAFA] border-b border-[#E5E7EB]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            
//             {/* Left Content */}
//             <div 
//               id="hero-content" 
//               data-animate
//               className={`transition-all duration-1000 ${visibleSections['hero-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//             >
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 rounded-full mb-4 border border-[#C9A962]/20">
//                 <span className="w-2 h-2 bg-[#C9A962] rounded-full animate-pulse"></span>
//                 <span className="text-sm font-medium text-[#C9A962]">UK's #1 Missed Call Recovery System</span>
//               </div>
              
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight mb-4">
//                 Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#B8963F]">Missed Calls</span> Into Leads
//               </h1>
              
//               <p className="text-xl text-[#4A4A4A] mb-4 leading-relaxed">
//                 GarageAI turns every missed call into a potential paying customer.
//               </p>
              
//               <div className="text-[#6B7280] mb-6 space-y-2">
//                 <p className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                   We instantly send one polite SMS
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                   Guide the customer to a simple form
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                   Deliver a clean, ready-to-book lead to your inbox
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                 <button 
//                   onClick={() => scrollToSection('demo')}
//                   className="group px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-full shadow-xl shadow-[#C9A962]/30 hover:shadow-2xl hover:shadow-[#C9A962]/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
//                 >
//                   Book 15-min Demo
//                   <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </button>
//                 <button 
//                   onClick={() => scrollToSection('how-it-works')}
//                   className="px-8 py-4 bg-white text-[#1A1A1A] font-semibold rounded-full border-2 border-[#E5E7EB] hover:border-[#C9A962] hover:text-[#C9A962] transition-all duration-300"
//                 >
//                   See How It Works
//                 </button>
//               </div>

//               <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B7280]">
//                 <span className="flex items-center gap-1">
//                   <svg className="w-4 h-4 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
//                   </svg>
//                   £49/month
//                 </span>
//                 <span className="w-1 h-1 bg-[#D1D5DB] rounded-full"></span>
//                 <span>Cancel anytime</span>
//                 <span className="w-1 h-1 bg-[#D1D5DB] rounded-full"></span>
//                 <span>Works with your current number</span>
//                 <span className="w-1 h-1 bg-[#D1D5DB] rounded-full"></span>
//                 <span>GDPR compliant</span>
//               </div>
//             </div>

//             {/* Right Side - FLOATING Phone Mockup with Podium & DYNAMIC TEXT */}
//             <div 
//               id="hero-visual"
//               data-animate
//               className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${visibleSections['hero-visual'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//             >
//               <div className="relative">
//                 {/* Phone Mockup - FLOATING ANIMATION */}
//                 <div className="relative z-10 w-64 sm:w-72 mx-auto animate-phoneFloat">
//                   {/* Phone Frame */}
//                   <div className="bg-[#1A1A1A] rounded-[2.5rem] p-3 shadow-2xl shadow-black/20">
//                     {/* Phone Screen */}
//                     <div className="bg-white rounded-[2rem] overflow-hidden">
//                       <div className="p-5">
//                         {/* App Header */}
//                         <div className="flex items-center gap-3 mb-6">
//                           <div className="w-12 h-12 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-xl flex items-center justify-center">
//                             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                             </svg>
//                           </div>
//                           <div>
//                             <p className="text-base font-bold text-[#1A1A1A]">GarageAI</p>
//                             <p className="text-sm text-[#C9A962] font-medium">New Lead</p>
//                           </div>
//                         </div>
                        
//                         {/* DYNAMIC Content Line 1 */}
//                         <div className="space-y-3 mb-5">
//                           <div className="h-5 bg-gradient-to-r from-[#C9A962]/20 to-[#C9A962]/5 rounded-full overflow-hidden relative">
//                             <div className="absolute inset-0 flex items-center px-3">
//                               <span 
//                                 key={`phone-line1-${currentTextIndex}`}
//                                 className="text-xs font-semibold text-[#C9A962] animate-textFade"
//                               >
//                                 {dynamicTexts[currentTextIndex].line1}
//                               </span>
//                             </div>
//                           </div>
//                           {/* DYNAMIC Content Line 2 */}
//                           <div className="h-4 bg-[#F3F4F6] rounded-full w-4/5 overflow-hidden relative">
//                             <div className="absolute inset-0 flex items-center px-3">
//                               <span 
//                                 key={`phone-line2-${currentTextIndex}`}
//                                 className="text-[10px] font-medium text-[#6B7280] animate-textFade"
//                               >
//                                 {dynamicTexts[currentTextIndex].line2}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
                        
//                         {/* Registration Plate - STATIC */}
//                         <div className="bg-gradient-to-r from-[#C9A962]/20 to-[#E8D5A3]/20 rounded-xl py-4 px-6 mb-5 border border-[#C9A962]/30">
//                           <p className="text-center text-xl font-bold text-[#C9A962] tracking-wider">AB12 CDE</p>
//                         </div>
                        
//                         {/* DYNAMIC Content Line 3 & 4 */}
//                         <div className="space-y-3">
//                           <div className="h-4 bg-[#F3F4F6] rounded-full overflow-hidden relative">
//                             <div className="absolute inset-0 flex items-center px-3">
//                               <span 
//                                 key={`phone-line3-${currentTextIndex}`}
//                                 className="text-[10px] font-medium text-[#6B7280] animate-textFade"
//                               >
//                                 {dynamicTexts[currentTextIndex].line3}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="h-4 bg-[#F9FAFB] rounded-full w-3/5 overflow-hidden relative">
//                             <div className="absolute inset-0 flex items-center px-3">
//                               <span 
//                                 key={`phone-line4-${currentTextIndex}`}
//                                 className="text-[10px] font-medium text-[#9CA3AF] animate-textFade"
//                               >
//                                 {dynamicTexts[currentTextIndex].line4}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Podium/Platform - STATIC (doesn't float) */}
//                 <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full flex flex-col items-center">
//                   {/* Top Platform with DYNAMIC text */}
//                   <div className="w-48 h-6 bg-gradient-to-b from-[#F5F5F0] to-[#E8E8E3] rounded-full shadow-lg relative z-20 overflow-hidden">
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <span 
//                         key={`platform1-${currentTextIndex}`}
//                         className="text-[8px] font-medium text-[#C9A962]/60 animate-textFade"
//                       >
//                         {dynamicTexts[currentTextIndex].platform1}
//                       </span>
//                     </div>
//                   </div>
                  
//                   {/* Middle Platform with DYNAMIC text */}
//                   <div className="w-56 h-5 bg-gradient-to-b from-[#FAFAFA] to-[#EFEFEA] rounded-full shadow-md -mt-1 relative z-10 overflow-hidden">
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <span 
//                         key={`platform2-${currentTextIndex}`}
//                         className="text-[8px] font-medium text-[#9CA3AF]/60 animate-textFade"
//                       >
//                         {dynamicTexts[currentTextIndex].platform2}
//                       </span>
//                     </div>
//                   </div>
                  
//                   {/* Bottom Platform with DYNAMIC text */}
//                   <div className="w-64 h-5 bg-gradient-to-b from-[#F8F8F3] to-[#E5E5E0] rounded-full shadow -mt-1 relative z-0 overflow-hidden">
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <span 
//                         key={`platform3-${currentTextIndex}`}
//                         className="text-[8px] font-medium text-[#D1D5DB]/80 animate-textFade"
//                       >
//                         {dynamicTexts[currentTextIndex].platform3}
//                       </span>
//                     </div>
//                   </div>
                  
//                   {/* Shadow */}
//                   <div className="w-52 h-3 bg-gradient-to-b from-[#E0E0DB]/40 to-transparent rounded-full blur-sm mt-2"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== STATS BAR - WITH BORDER AND TRANSITIONS ========== */}
//       <div className="flex justify-center pt-8">
//   <span className="inline-block px-4 py-2 bg-[#C9A962]/10 rounded-full text-sm font-medium text-[#C9A962] mb-4 border border-[#C9A962]/20">
//     Growth Insights
//   </span>
// </div>
//       <section className="py-6 bg-[#FAFAFA]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div 
//             id="stats"
//             data-animate
//             className={`grid grid-cols-2 lg:grid-cols-4 gap-3 transition-all duration-1000 delay-500 ${visibleSections['stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//           >
//             {[
//               { value: '95%', label: 'Detection Accuracy' },
//               { value: '<3s', label: 'SMS Response Time' },
//               { value: '47%', label: 'Lead Conversion Rate' },
//               { value: '24/7', label: 'Automatic Operation' }
//             ].map((stat, index) => (
//               <div 
//                 key={index}
//                 className="group bg-white rounded-2xl p-5 text-center border-2 border-[#E5E7EB] hover:border-[#C9A962] shadow-sm hover:shadow-xl hover:shadow-[#C9A962]/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
//               >
//                 <p className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#B8963F] group-hover:scale-110 transition-transform duration-300">{stat.value}</p>
//                 <p className="text-sm text-[#6B7280] mt-1 group-hover:text-[#4A4A4A] transition-colors duration-300">{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ========== CALCULATOR SECTION - WITH BORDER AND TRANSITIONS ========== */}
//       <section id="calculator" className="py-12 lg:py-16 bg-gradient-to-b from-[#F5F5F0] to-[#FAFAFA]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div 
//             id="calc-header"
//             data-animate
//             className={`text-center mb-8 transition-all duration-1000 ${visibleSections['calc-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//           >
//             <span className="inline-block px-4 py-2 bg-[#C9A962]/10 rounded-full text-sm font-medium text-[#C9A962] mb-4 border border-[#C9A962]/20">
//               Revenue Calculator
//             </span>
//             <h2 className="text-3xl lg:text-5xl font-bold text-[#1A1A1A] mb-4">
//               Revenue Missed Calculator
//             </h2>
//             <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
//               Quick 30-second calculator: See how many potential jobs you're losing every month (UK garage averages).
//             </p>
//           </div>
//           <div 
//             id="calc-form"
//             data-animate
//             className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${visibleSections['calc-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//           >
//             <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border-2 border-[#E5E7EB] hover:border-[#C9A962]/50 hover:shadow-2xl hover:shadow-[#C9A962]/10 transition-all duration-500">
//               <div className="grid md:grid-cols-3 gap-6 mb-8">
//                 {/* Job Value */}
//                 <div className="group">
//                   <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Average Job Value (£)</label>
//                   <div className="relative">
//                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A962] font-semibold">£</span>
//                     <input
//                       type="number"
//                       value={jobValue}
//                       onChange={(e) => setJobValue(Number(e.target.value))}
//                       className="w-full pl-10 pr-4 py-4 bg-[#FAFAFA] border-2 border-[#E5E7EB] rounded-xl text-[#1A1A1A] font-semibold focus:outline-none focus:border-[#C9A962] hover:border-[#C9A962]/50 transition-all duration-300"
//                     />
//                   </div>
//                 </div>

//                 {/* Missed Calls */}
//                 <div className="group">
//                   <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Missed Calls Per Week</label>
//                   <input
//                     type="number"
//                     value={missedCalls}
//                     onChange={(e) => setMissedCalls(Number(e.target.value))}
//                     className="w-full px-4 py-4 bg-[#FAFAFA] border-2 border-[#E5E7EB] rounded-xl text-[#1A1A1A] font-semibold focus:outline-none focus:border-[#C9A962] hover:border-[#C9A962]/50 transition-all duration-300"
//                   />
//                 </div>

//                 {/* Close Rate */}
//                 <div className="group">
//                   <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Close Rate (%)</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={closeRate}
//                       onChange={(e) => setCloseRate(Number(e.target.value))}
//                       className="w-full pl-4 pr-10 py-4 bg-[#FAFAFA] border-2 border-[#E5E7EB] rounded-xl text-[#1A1A1A] font-semibold focus:outline-none focus:border-[#C9A962] hover:border-[#C9A962]/50 transition-all duration-300"
//                     />
//                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A962] font-semibold">%</span>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={calculateRevenue}
//                 disabled={isCalculating}
//                 className="w-full py-4 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-xl shadow-lg shadow-[#C9A962]/30 hover:shadow-xl hover:shadow-[#C9A962]/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
//               >
//                 {isCalculating ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     Calculating...
//                   </span>
//                 ) : (
//                   'Calculate Lost Revenue'
//                 )}
//               </button>

//               {/* Result */}
//               {calculatedRevenue !== null && (
//                 <div className="mt-8 p-6 bg-gradient-to-r from-[#C9A962]/10 to-[#E8D5A3]/10 rounded-2xl border-2 border-[#C9A962]/30 text-center animate-fadeIn">
//                   <p className="text-sm text-[#6B7280] mb-2">Estimated Monthly Revenue Lost</p>
//                   <p className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#B8963F]">
//                     £{calculatedRevenue.toLocaleString()}
//                   </p>
//                   <p className="text-sm text-[#6B7280] mt-4">
//                     That's <span className="font-semibold text-[#C9A962]">£{(calculatedRevenue * 12).toLocaleString()}</span> per year you could be recovering
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== HOW IT WORKS SECTION - ONLY REDUCED PADDING ========== */}
//       <section id="how-it-works" className="py-12 lg:py-16 bg-gradient-to-b from-[#FAFAFA] via-[#F5F5F0] to-[#FAFAFA] relative overflow-hidden">
//         {/* Background Decorative Elements */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A962]/5 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C9A962]/5 rounded-full blur-3xl"></div>
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#C9A962]/3 to-transparent rounded-full"></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           {/* Section Header */}
//           <div 
//             id="hiw-header"
//             data-animate
//             className={`text-center mb-12 transition-all duration-1000 ${visibleSections['hiw-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//           >
//             <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#C9A962]/10 to-[#E8D5A3]/10 rounded-full mb-6 border border-[#C9A962]/20 backdrop-blur-sm">
//               <div className="w-2 h-2 bg-[#C9A962] rounded-full animate-pulse"></div>
//               <span className="text-sm font-semibold text-[#C9A962] tracking-wide">Simple 3-Step Process</span>
//             </div>
//             <h2 className="text-4xl lg:text-6xl font-bold text-[#1A1A1A] mb-6">
//               How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] via-[#D4AF37] to-[#C9A962]">Works</span>
//             </h2>
//             <p className="text-lg lg:text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
//               Three simple steps to transform missed calls into paying customers
//             </p>
//           </div>

//           {/* Steps Container */}
//           <div 
//             id="hiw-steps"
//             data-animate
//             className={`relative transition-all duration-1000 delay-200 ${visibleSections['hiw-steps'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//           >
            
//             {/* Connection Line - Desktop */}
//             <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A962]/20 to-transparent -translate-y-1/2 z-0"></div>
//             <div className="hidden lg:block absolute top-1/2 left-[16.5%] right-[16.5%] z-0 -translate-y-1/2">
//               <div className="h-0.5 bg-gradient-to-r from-[#C9A962]/40 via-[#C9A962] to-[#C9A962]/40 relative">
//                 {/* Animated Dot */}
//                 <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9A962] rounded-full shadow-lg shadow-[#C9A962]/50 animate-moveDot"></div>
//               </div>
//             </div>

//             {/* Steps Grid */}
//             <div className="grid lg:grid-cols-3 gap-6 lg:gap-6 relative z-10">
              
//               {/* Step 1 */}
//               <div className="group relative">
//                 {/* Card */}
//                 <div className="relative bg-white rounded-3xl p-6 lg:p-8 border-2 border-[#E5E7EB] hover:border-[#C9A962] shadow-lg hover:shadow-2xl hover:shadow-[#C9A962]/20 transition-all duration-500 overflow-hidden">
                  
//                   {/* Hover Gradient Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/0 via-[#C9A962]/0 to-[#C9A962]/0 group-hover:from-[#C9A962]/5 group-hover:via-transparent group-hover:to-[#E8D5A3]/5 transition-all duration-500"></div>
                  
//                   {/* Step Number - Floating Badge */}
//                   <div className="absolute -top-0 -right-0 w-20 h-20 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-bl-[2.5rem] flex items-start justify-end p-3 shadow-lg group-hover:scale-110 transition-transform duration-500">
//                     <span className="text-xl font-bold text-white">01</span>
//                   </div>

//                   {/* Icon Container */}
//                   <div className="relative mb-6">
//                     <div className="w-16 h-16 bg-gradient-to-br from-[#FDF8F0] to-[#F5EFE0] rounded-2xl flex items-center justify-center border border-[#C9A962]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
//                       <div className="w-14 h-14 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-xl flex items-center justify-center shadow-lg shadow-[#C9A962]/30 group-hover:shadow-xl group-hover:shadow-[#C9A962]/40 transition-all duration-500">
//                         <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                         </svg>
//                       </div>
//                     </div>
//                     {/* Decorative Ring */}
//                     <div className="absolute -inset-2 border-2 border-dashed border-[#C9A962]/20 rounded-3xl group-hover:border-[#C9A962]/40 group-hover:rotate-6 transition-all duration-500"></div>
//                   </div>
                  
//                   {/* Content */}
//                   <div className="relative">
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="w-6 h-0.5 bg-gradient-to-r from-[#C9A962] to-transparent"></div>
//                       <span className="text-xs font-bold text-[#C9A962] uppercase tracking-wider">Step One</span>
//                     </div>
//                     <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#C9A962] transition-colors duration-300">
//                       Call Missed
//                     </h3>
//                     <p className="text-[#6B7280] leading-relaxed mb-4 text-sm">
//                       You're busy working on a vehicle — the customer's call goes unanswered. GarageAI instantly detects this missed opportunity.
//                     </p>
                    
//                     {/* Feature Tags */}
//                     <div className="flex flex-wrap gap-2">
//                       <span className="px-3 py-1 bg-[#C9A962]/10 rounded-full text-xs font-medium text-[#C9A962] border border-[#C9A962]/20">
//                         Instant Detection
//                       </span>
//                       <span className="px-3 py-1 bg-[#C9A962]/10 rounded-full text-xs font-medium text-[#C9A962] border border-[#C9A962]/20">
//                         24/7 Monitoring
//                       </span>
//                     </div>
//                   </div>

//                   {/* Bottom Accent Line */}
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 </div>
                
//                 {/* Mobile Arrow */}
//                 <div className="lg:hidden flex justify-center my-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-full flex items-center justify-center shadow-lg shadow-[#C9A962]/30">
//                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Step 2 */}
//               <div className="group relative lg:mt-8">
//                 {/* Card */}
//                 <div className="relative bg-white rounded-3xl p-6 lg:p-8 border-2 border-[#E5E7EB] hover:border-[#C9A962] shadow-lg hover:shadow-2xl hover:shadow-[#C9A962]/20 transition-all duration-500 overflow-hidden">
                  
//                   {/* Hover Gradient Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/0 via-[#C9A962]/0 to-[#C9A962]/0 group-hover:from-[#C9A962]/5 group-hover:via-transparent group-hover:to-[#E8D5A3]/5 transition-all duration-500"></div>
                  
//                   {/* Step Number - Floating Badge */}
//                   <div className="absolute -top-0 -right-0 w-20 h-20 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-bl-[2.5rem] flex items-start justify-end p-3 shadow-lg group-hover:scale-110 transition-transform duration-500">
//                     <span className="text-xl font-bold text-white">02</span>
//                   </div>

//                   {/* Icon Container */}
//                   <div className="relative mb-6">
//                     <div className="w-16 h-16 bg-gradient-to-br from-[#FDF8F0] to-[#F5EFE0] rounded-2xl flex items-center justify-center border border-[#C9A962]/20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-inner">
//                       <div className="w-14 h-14 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-xl flex items-center justify-center shadow-lg shadow-[#C9A962]/30 group-hover:shadow-xl group-hover:shadow-[#C9A962]/40 transition-all duration-500">
//                         <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                         </svg>
//                       </div>
//                     </div>
//                     {/* Decorative Ring */}
//                     <div className="absolute -inset-2 border-2 border-dashed border-[#C9A962]/20 rounded-3xl group-hover:border-[#C9A962]/40 group-hover:-rotate-6 transition-all duration-500"></div>
//                   </div>
                  
//                   {/* Content */}
//                   <div className="relative">
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="w-6 h-0.5 bg-gradient-to-r from-[#C9A962] to-transparent"></div>
//                       <span className="text-xs font-bold text-[#C9A962] uppercase tracking-wider">Step Two</span>
//                     </div>
//                     <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#C9A962] transition-colors duration-300">
//                       Smart SMS Sent
//                     </h3>
//                     <p className="text-[#6B7280] leading-relaxed mb-4 text-sm">
//                       Within seconds, a friendly automated message is sent to the caller with a link to your custom booking form.
//                     </p>
                    
//                     {/* SMS Preview */}
//                     <div className="bg-gradient-to-br from-[#F8F9FA] to-[#F3F4F6] rounded-xl p-3 border border-[#E5E7EB] group-hover:border-[#C9A962]/30 transition-all duration-300">
//                       <p className="text-xs text-[#4A4A4A] italic">
//                         "Sorry we missed your call! Tap here to book your service: <span className="text-[#C9A962] font-medium">link</span>"
//                       </p>
//                     </div>
//                   </div>

//                   {/* Bottom Accent Line */}
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 </div>
                
//                 {/* Mobile Arrow */}
//                 <div className="lg:hidden flex justify-center my-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-full flex items-center justify-center shadow-lg shadow-[#C9A962]/30">
//                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Step 3 */}
//               <div className="group relative">
//                 {/* Card */}
//                 <div className="relative bg-white rounded-3xl p-6 lg:p-8 border-2 border-[#E5E7EB] hover:border-[#C9A962] shadow-lg hover:shadow-2xl hover:shadow-[#C9A962]/20 transition-all duration-500 overflow-hidden">
                  
//                   {/* Hover Gradient Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/0 via-[#C9A962]/0 to-[#C9A962]/0 group-hover:from-[#C9A962]/5 group-hover:via-transparent group-hover:to-[#E8D5A3]/5 transition-all duration-500"></div>
                  
//                   {/* Step Number - Floating Badge */}
//                   <div className="absolute -top-0 -right-0 w-20 h-20 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-bl-[2.5rem] flex items-start justify-end p-3 shadow-lg group-hover:scale-110 transition-transform duration-500">
//                     <span className="text-xl font-bold text-white">03</span>
//                   </div>

//                   {/* Icon Container */}
//                   <div className="relative mb-6">
//                     <div className="w-16 h-16 bg-gradient-to-br from-[#FDF8F0] to-[#F5EFE0] rounded-2xl flex items-center justify-center border border-[#C9A962]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
//                       <div className="w-14 h-14 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-xl flex items-center justify-center shadow-lg shadow-[#C9A962]/30 group-hover:shadow-xl group-hover:shadow-[#C9A962]/40 transition-all duration-500">
//                         <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                       </div>
//                     </div>
//                     {/* Decorative Ring */}
//                     <div className="absolute -inset-2 border-2 border-dashed border-[#C9A962]/20 rounded-3xl group-hover:border-[#C9A962]/40 group-hover:rotate-6 transition-all duration-500"></div>
//                   </div>
                  
//                   {/* Content */}
//                   <div className="relative">
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="w-6 h-0.5 bg-gradient-to-r from-[#C9A962] to-transparent"></div>
//                       <span className="text-xs font-bold text-[#C9A962] uppercase tracking-wider">Step Three</span>
//                     </div>
//                     <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#C9A962] transition-colors duration-300">
//                       Lead Delivered
//                     </h3>
//                     <p className="text-[#6B7280] leading-relaxed mb-4 text-sm">
//                       Customer fills the form with their details and vehicle registration. You receive a complete, ready-to-action lead in your inbox.
//                     </p>
                    
//                     {/* Feature Tags */}
//                     <div className="flex flex-wrap gap-2">
//                       <span className="px-3 py-1 bg-[#C9A962]/10 rounded-full text-xs font-medium text-[#C9A962] border border-[#C9A962]/20">
//                         Full Details
//                       </span>
//                       <span className="px-3 py-1 bg-[#C9A962]/10 rounded-full text-xs font-medium text-[#C9A962] border border-[#C9A962]/20">
//                         Vehicle Reg
//                       </span>
//                       <span className="px-3 py-1 bg-[#C9A962]/10 rounded-full text-xs font-medium text-[#C9A962] border border-[#C9A962]/20">
//                         Direct Email
//                       </span>
//                     </div>
//                   </div>

//                   {/* Bottom Accent Line */}
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
//                   {/* Success Glow Effect */}
//                   <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#C9A962]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 </div>
//               </div>
//             </div>

//             {/* Bottom CTA */}
//             <div className="mt-12 text-center">
//               <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-2 bg-white rounded-full shadow-lg border border-[#E5E7EB]">
//                 <div className="flex items-center gap-2 px-4 py-2">
//                   <div className="flex -space-x-2">
//                     <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] border-2 border-white flex items-center justify-center text-white text-xs font-bold">J</div>
//                     <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#B8963F] to-[#C9A962] border-2 border-white flex items-center justify-center text-white text-xs font-bold">M</div>
//                     <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E8D5A3] border-2 border-white flex items-center justify-center text-white text-xs font-bold">S</div>
//                   </div>
//                   <p className="text-sm text-[#6B7280]">
//                     <span className="font-semibold text-[#1A1A1A]">500+</span> UK garages trust GarageAI
//                   </p>
//                 </div>
//                 <button 
//                   onClick={() => scrollToSection('demo')}
//                   className="px-6 py-2 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-full shadow-lg shadow-[#C9A962]/30 hover:shadow-xl hover:shadow-[#C9A962]/40 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
//                 >
//                   See It In Action
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== DEMO BOOKING SECTION - WITH CALENDAR ADDED ========== */}
//       <section id="demo" className="py-12 lg:py-16 bg-gradient-to-b from-[#FAFAFA] to-[#F5F5F0]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div 
//             id="demo-content"
//             data-animate
//             className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections['demo-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//           >
//             <span className="inline-block px-4 py-2 bg-[#C9A962]/10 rounded-full text-sm font-medium text-[#C9A962] mb-4 border border-[#C9A962]/20">
//               See It In Action
//             </span>
//             <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4">
//               Book Your 15-Min Demo
//             </h2>
//             <p className="text-lg text-[#6B7280] mb-6 max-w-xl mx-auto">
//               See exactly how GarageAI captures missed call leads in real time. Takes just 15 minutes – no obligation. Powered by Zoom.
//             </p>
            
//             <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-2 border-[#E5E7EB] hover:border-[#C9A962]/50 hover:shadow-2xl hover:shadow-[#C9A962]/10 transition-all duration-500">
//               <div className="grid lg:grid-cols-2 gap-6">
//                 {/* Left Column - Demo Info */}
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-center gap-3 mb-4">
//                     <div className="w-14 h-14 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-2xl flex items-center justify-center shadow-lg shadow-[#C9A962]/30">
//                       <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-3 text-left">
//                     {[
//                       'Live demonstration of the missed call flow',
//                       'See real leads captured in real-time',
//                       'Q&A with our team',
//                       'Custom pricing discussion'
//                     ].map((item, index) => (
//                       <div key={index} className="flex items-center gap-3 group">
//                         <div className="w-5 h-5 bg-[#C9A962]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A962]/20 transition-colors duration-300 border border-[#C9A962]/20">
//                           <svg className="w-3 h-3 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                         </div>
//                         <span className="text-[#4A4A4A] text-sm group-hover:text-[#1A1A1A] transition-colors duration-300">{item}</span>
//                       </div>
//                     ))}
//                   </div>
                  
//                   <a 
//                     href="https://calendly.com" 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-full shadow-xl shadow-[#C9A962]/30 hover:shadow-2xl hover:shadow-[#C9A962]/40 hover:-translate-y-1 transition-all duration-300 mt-4"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     Book Demo Now
//                   </a>
//                 </div>
                
//                 {/* Right Column - Calendar */}
//                 <div className="border border-[#E5E7EB] rounded-xl p-4">
//                   <div className="text-left mb-4">
//                     <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">30 Minute Meeting</h3>
//                     <div className="flex items-center gap-2 text-[#6B7280] text-sm">
//                       <span>30 min</span>
//                       <span>•</span>
//                       <span>Web conferencing details provided upon confirmation.</span>
//                     </div>
//                   </div>
                  
//                   <h4 className="text-md font-semibold text-[#1A1A1A] mb-3">Select a Date & Time</h4>
                  
//                   <div className="mb-4">
//                     <h5 className="text-sm font-medium text-[#4A4A4A] mb-2">February 2026</h5>
                    
//                     {/* Calendar Grid */}
//                     <div className="grid grid-cols-7 gap-1 mb-2">
//                       {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
//                         <div key={day} className="text-center text-xs font-medium text-[#6B7280] py-1">
//                           {day}
//                         </div>
//                       ))}
                      
//                       {/* Empty days before Feb 1 (Feb 1, 2026 is a Sunday) */}
//                       {Array.from({ length: 6 }).map((_, i) => (
//                         <div key={`empty-${i}`} className="text-center py-1"></div>
//                       ))}
                      
//                       {/* February days */}
//                       <div className="text-center py-1 text-sm text-[#4A4A4A]">1</div>
                      
//                       {/* Week 1 */}
//                       {[2, 3, 4, 5, 6, 7, 8].map((day) => (
//                         <div key={day} className="text-center py-1">
//                           <button className="w-8 h-8 rounded-full text-[#4A4A4A] text-sm hover:bg-[#C9A962]/10 hover:text-[#C9A962] transition-colors duration-300">
//                             {day}
//                           </button>
//                         </div>
//                       ))}
                      
//                       {/* Week 2 */}
//                       {[9, 10, 11, 12, 13, 14, 15].map((day) => (
//                         <div key={day} className="text-center py-1">
//                           <button className="w-8 h-8 rounded-full text-[#4A4A4A] text-sm hover:bg-[#C9A962]/10 hover:text-[#C9A962] transition-colors duration-300">
//                             {day}
//                           </button>
//                         </div>
//                       ))}
                      
//                       {/* Week 3 */}
//                       {[16, 17, 18, 19, 20, 21, 22].map((day) => (
//                         <div key={day} className="text-center py-1">
//                           <button className="w-8 h-8 rounded-full text-[#4A4A4A] text-sm hover:bg-[#C9A962]/10 hover:text-[#C9A962] transition-colors duration-300">
//                             {day}
//                           </button>
//                         </div>
//                       ))}
                      
//                       {/* Week 4 */}
//                       {[23, 24, 25, 26, 27, 28].map((day) => (
//                         <div key={day} className="text-center py-1">
//                           <button className="w-8 h-8 rounded-full text-[#4A4A4A] text-sm hover:bg-[#C9A962]/10 hover:text-[#C9A962] transition-colors duration-300">
//                             {day}
//                           </button>
//                         </div>
//                       ))}
//                     </div>
                    
//                     {/* Time Zone */}
//                     <div className="flex items-center gap-2 text-xs text-[#6B7280]">
//                       <span>🇵🇰</span>
//                       <span>Pakistan, Maldives Time (9:52pm)</span>
//                     </div>
//                   </div>
                  
//                   <div className="text-xs text-[#9CA3AF]">
//                     <span>Cookie settings</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== EARLY ACCESS WAITLIST - COMPACT VERSION ========== */}
//       <section id="waitlist" className="py-10 bg-[#FAFAFA]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div 
//             id="waitlist-content"
//             data-animate
//             className={`max-w-4xl mx-auto transition-all duration-1000 ${visibleSections['waitlist-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//           >
//             <div className="bg-gradient-to-r from-[#C9A962]/5 to-[#E8D5A3]/5 rounded-2xl p-6 lg:p-8 border-2 border-[#C9A962]/20 hover:border-[#C9A962]/40 transition-all duration-500">
//               <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
//                 <div className="flex-1 text-center lg:text-left">
//                   <span className="inline-block px-3 py-1 bg-[#C9A962]/10 rounded-full text-xs font-medium text-[#C9A962] mb-2 border border-[#C9A962]/20">
//                     Coming Soon
//                   </span>
//                   <h2 className="text-xl lg:text-2xl font-bold text-[#1A1A1A] mb-1">
//                     Join the Early Access Waitlist
//                   </h2>
//                   <p className="text-[#6B7280] text-sm">
//                     Be first in line when we launch in February 2026.
//                   </p>
//                 </div>
                
//                 <div className="flex-1 w-full lg:w-auto">
//                   {waitlistSubmitted ? (
//                     <div className="flex items-center justify-center gap-3 py-2">
//                       <div className="w-9 h-9 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-full flex items-center justify-center shadow-lg shadow-[#C9A962]/30">
//                         <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                       </div>
//                       <span className="text-[#1A1A1A] font-medium text-sm">You're on the list!</span>
//                     </div>
//                   ) : (
//                     <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2">
//                       <input
//                         type="email"
//                         value={waitlistEmail}
//                         onChange={(e) => setWaitlistEmail(e.target.value)}
//                         placeholder="Enter your email address"
//                         required
//                         className="flex-1 px-4 py-2.5 bg-white border-2 border-[#E5E7EB] rounded-full text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#C9A962] hover:border-[#C9A962]/50 transition-all duration-300"
//                       />
//                       <button
//                         type="submit"
//                         className="px-5 py-2.5 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-full shadow-lg shadow-[#C9A962]/30 hover:shadow-xl hover:shadow-[#C9A962]/40 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap text-sm"
//                       >
//                         Join Waitlist
//                       </button>
//                     </form>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== PRICING SECTION - WITH BORDER AND TRANSITIONS ========== */}
//       <section id="pricing" className="py-12 lg:py-16 bg-gradient-to-b from-[#F5F5F0] to-[#FAFAFA]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div 
//             id="pricing-content"
//             data-animate
//             className={`max-w-3xl mx-auto transition-all duration-1000 ${visibleSections['pricing-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//           >
//             <div className="text-center mb-8">
//               <span className="inline-block px-4 py-2 bg-[#C9A962]/10 rounded-full text-sm font-medium text-[#C9A962] mb-4 border border-[#C9A962]/20">
//                 Simple Pricing
//               </span>
//               <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4">
//                 One Plan. Everything Included.
//               </h2>
//               <p className="text-lg text-[#6B7280]">
//                 No hidden fees. No contracts. Cancel anytime.
//               </p>
//             </div>

//             <div className="group bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-2 border-[#E5E7EB] hover:border-[#C9A962] hover:shadow-2xl hover:shadow-[#C9A962]/10 transition-all duration-500 relative overflow-hidden">
//               {/* Popular Badge */}
//               <div className="absolute top-4 right-4">
//                 <span className="px-3 py-1 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white text-xs font-semibold rounded-full shadow-lg shadow-[#C9A962]/30">
//                   Most Popular
//                 </span>
//               </div>

//               <div className="text-center mb-4">
//                 <p className="text-[#6B7280] text-sm mb-1">Monthly subscription</p>
//                 <div className="flex items-baseline justify-center gap-1">
//                   <span className="text-4xl font-bold text-[#1A1A1A] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C9A962] group-hover:to-[#B8963F] transition-all duration-300">£49</span>
//                   <span className="text-lg text-[#6B7280]">/month</span>
//                 </div>
//               </div>

//               <div className="grid sm:grid-cols-2 gap-3 mb-4">
//                 {[
//                   'Unlimited missed call detection',
//                   'Automatic SMS responses',
//                   'Custom lead capture forms',
//                   'Email lead notifications',
//                   'UK vehicle registration validation',
//                   'Works with your existing number',
//                   'GDPR compliant',
//                   '24/7 automatic operation',
//                   'Pause or cancel anytime',
//                   'No setup fees'
//                 ].map((feature, index) => (
//                   <div key={index} className="flex items-center gap-2 group/item">
//                     <div className="w-4 h-4 bg-[#C9A962]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#C9A962]/20 transition-colors duration-300 border border-[#C9A962]/20">
//                       <svg className="w-2 h-2 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <span className="text-[#4A4A4A] text-sm group-hover/item:text-[#1A1A1A] transition-colors duration-300">{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <button 
//                 onClick={() => scrollToSection('demo')}
//                 className="w-full py-3 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-xl shadow-lg shadow-[#C9A962]/30 hover:shadow-xl hover:shadow-[#C9A962]/40 hover:-translate-y-0.5 transition-all duration-300"
//               >
//                 Start Your Free Trial
//               </button>
              
//               <p className="text-center text-xs text-[#9CA3AF] mt-3">
//                 14-day free trial. No credit card required.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== CONTACT SECTION - SIMPLIFIED ========== */}
//       <section id="contact" className="py-12 lg:py-16 bg-gradient-to-b from-[#F5F5F0] to-[#FAFAFA]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div 
//             id="contact-content"
//             data-animate
//             className={`max-w-3xl mx-auto transition-all duration-1000 ${visibleSections['contact-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//           >
//             <div className="text-center mb-8">
//               <span className="inline-block px-4 py-2 bg-[#C9A962]/10 rounded-full text-sm font-medium text-[#C9A962] mb-4 border border-[#C9A962]/20">
//                 Get In Touch
//               </span>
//               <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4">
//                 Contact
//               </h2>
//               <p className="text-lg text-[#6B7280] max-w-xl mx-auto">
//                 Have questions? We're here to help you transform missed calls into revenue.
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-4">
//               {[
//                 { 
//                   icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', 
//                   title: 'Email Us', 
//                   value: 'daniel@garageai.co.uk', 
//                   href: 'mailto:hello@garageai.co.uk' 
//                 },
//                 { 
//                   icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', 
//                   title: 'Call Us', 
//                   value: '0779 254 6820', 
//                   href: 'tel:08001234567' 
//                 },
//                 { 
//                   icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', 
//                   title: 'Location', 
//                   value: 'United Kingdom', 
//                   href: null 
//                 }
//               ].map((item, index) => (
//                 <div key={index} className="bg-white rounded-xl p-4 border-2 border-[#E5E7EB] hover:border-[#C9A962] hover:shadow-lg hover:shadow-[#C9A962]/10 transition-all duration-300 text-center group">
//                   <div className="w-10 h-10 bg-gradient-to-br from-[#C9A962]/10 to-[#E8D5A3]/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-gradient-to-br group-hover:from-[#C9A962]/20 group-hover:to-[#E8D5A3]/20 transition-all duration-300">
//                     <svg className="w-5 h-5 text-[#C9A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
//                     </svg>
//                   </div>
//                   <p className="text-sm text-[#6B7280] mb-1">{item.title}</p>
//                   {item.href ? (
//                     <a href={item.href} className="text-[#1A1A1A] font-medium text-sm hover:text-[#C9A962] transition-colors duration-300">{item.value}</a>
//                   ) : (
//                     <p className="text-[#1A1A1A] font-medium text-sm">{item.value}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== FOOTER - IMPROVED ========== */}
//       <footer className="bg-[#1A1A1A] border-t border-white/10 py-6">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
//             {/* Logo */}
//             <div className="flex items-center gap-2">
//               <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] flex items-center justify-center">
//                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//               </div>
//               <span className="text-base font-bold text-white">Garage<span className="text-[#C9A962]">AI</span></span>
//             </div>

//             {/* Copyright */}
//             <p className="text-xs text-[#9CA3AF] text-center">
//               © 2026 GarageAI • Next-Gen Missed Call Lead Recovery for UK Garages
//             </p>

//             {/* Links */}
//             <div className="flex items-center gap-4">
//               <a href="#" className="text-xs text-[#9CA3AF] hover:text-[#C9A962] transition-colors duration-300">Privacy</a>
//               <a href="#" className="text-xs text-[#9CA3AF] hover:text-[#C9A962] transition-colors duration-300">Terms</a>
//               <a href="#" className="text-xs text-[#9CA3AF] hover:text-[#C9A962] transition-colors duration-300">Contact</a>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Custom Animation Styles */}
//       <style>{`
//         @keyframes phoneFloat {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-15px); }
//         }
//         @keyframes textFade {
//           0% { opacity: 0; transform: translateY(5px); }
//           10% { opacity: 1; transform: translateY(0); }
//           90% { opacity: 1; transform: translateY(0); }
//           100% { opacity: 0; transform: translateY(-5px); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes moveDot {
//           0% { left: 0%; }
//           50% { left: calc(100% - 12px); }
//           100% { left: 0%; }
//         }
//         .animate-phoneFloat {
//           animation: phoneFloat 4s ease-in-out infinite;
//         }
//         .animate-textFade {
//           animation: textFade 3s ease-in-out;
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out;
//         }
//         .animate-moveDot {
//           animation: moveDot 4s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   )
// }