import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  const [activeTab, setActiveTab] = useState('mission')
  const [animatedNumbers, setAnimatedNumbers] = useState({
    properties: 0,
    clients: 0,
    years: 0,
    satisfaction: 0
  })

  // Animate numbers on scroll
  useEffect(() => {
    const animateNumbers = () => {
      const targets = {
        properties: 500,
        clients: 2000,
        years: 15,
        satisfaction: 98
      }

      const duration = 2000
      const steps = 60
      const stepValue = {}

      Object.keys(targets).forEach(key => {
        stepValue[key] = targets[key] / steps
      })

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        setAnimatedNumbers({
          properties: Math.min(Math.floor(stepValue.properties * currentStep), targets.properties),
          clients: Math.min(Math.floor(stepValue.clients * currentStep), targets.clients),
          years: Math.min(Math.floor(stepValue.years * currentStep), targets.years),
          satisfaction: Math.min(Math.floor(stepValue.satisfaction * currentStep), targets.satisfaction)
        })

        if (currentStep >= steps) {
          clearInterval(interval)
        }
      }, duration / steps)
    }

    // Start animation after component mounts
    const timer = setTimeout(animateNumbers, 500)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    { number: animatedNumbers.properties, label: 'Properties Sold', icon: '🏠', color: 'from-indigo-500 to-indigo-600' },
    { number: animatedNumbers.clients, label: 'Happy Clients', icon: '😊', color: 'from-indigo-500 to-indigo-600' },
    { number: animatedNumbers.years, label: 'Years Experience', icon: '⭐', color: 'from-indigo-500 to-indigo-600' },
    { number: animatedNumbers.satisfaction, label: 'Satisfaction Rate', icon: '💯', color: 'from-indigo-500 to-indigo-600' }
  ]

  const teamMembers = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: '/images/p-1.png',
      description: '15+ years in real estate with a vision to make home buying simple and transparent.',
      social: { linkedin: '#', twitter: '#', email: 'rajesh@amaghara.com' }
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Sales',
      image: '/images/p-2.png',
      description: 'Expert in property valuation and client relations with 10+ years experience.',
      social: { linkedin: '#', twitter: '#', email: 'priya@amaghara.com' }
    },
    {
      name: 'Amit Patel',
      role: 'Legal Advisor',
      image: '/images/p-3.png',
      description: 'Specialized in real estate law with deep understanding of property regulations.',
      social: { linkedin: '#', twitter: '#', email: 'amit@amaghara.com' }
    },
    {
      name: 'Sneha Reddy',
      role: 'Marketing Director',
      image: '/images/p-4.png',
      description: 'Creative marketing strategist focused on digital presence and brand growth.',
      social: { linkedin: '#', twitter: '#', email: 'sneha@amaghara.com' }
    }
  ]

  const achievements = [
    {
      icon: '🏆',
      title: 'Market Leader',
      description: 'Leading real estate platform in Odisha with highest customer satisfaction',
      number: '1st'
    },
    {
      icon: '⭐',
      title: 'Award Winner',
      description: 'Multiple awards for excellence in real estate services and innovation',
      number: '5+'
    },
    {
      icon: '🤝',
      title: 'Trusted Partner',
      description: 'Trusted by thousands of families for their real estate needs',
      number: '2000+'
    },
    {
      icon: '💎',
      title: 'Quality Assured',
      description: 'Every property verified and quality-checked by our expert team',
      number: '100%'
    }
  ]

  const values = [
    {
      icon: '🤝',
      title: 'Trust & Transparency',
      description: 'We believe in complete transparency in all our dealings. No hidden costs, no surprises.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: '💎',
      title: 'Quality Assurance',
      description: 'Every property is personally verified by our expert team before listing.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: '⚡',
      title: 'Quick Process',
      description: 'From property search to possession, we ensure the fastest possible process.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: '🛡️',
      title: 'Legal Security',
      description: 'Complete legal support and documentation assistance for your peace of mind.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-rose-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 h-full">
          <img
            src="/images/p-1.png"
            alt="Ama Ghara About"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-6">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
              About Ama Ghara
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="block text-white">Your Trusted Partner in</span>
              <span className="block text-white">
                Real Estate
              </span>
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              For over 15 years, we've been helping families find their perfect homes, 
              making dreams come true one property at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/properties" className="group rounded-full bg-white px-8 py-4 font-bold text-indigo-600 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-2">
                  🏠 Explore Properties
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              <Link to="/contact" className="group rounded-full border-2 border-white/30 bg-white/10 backdrop-blur px-8 py-4 font-bold text-white shadow-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-2">
                  📞 Get in Touch
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Facts Section */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-3xl p-8 border-2 border-indigo-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Why Choose Ama Ghara?</h2>
            <p className="text-lg text-slate-600">We're not just another real estate company - we're your trusted partner in finding the perfect home.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-2xl text-white shadow-lg">
                🏠
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Verified Properties</h3>
              <p className="text-sm text-slate-600">Every property is personally verified by our expert team</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-2xl text-white shadow-lg">
                💰
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Best Prices</h3>
              <p className="text-sm text-slate-600">Negotiated rates and transparent pricing guaranteed</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-2xl text-white shadow-lg">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Quick Process</h3>
              <p className="text-sm text-slate-600">From viewing to possession in just 7 days</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-2xl text-white shadow-lg">
                🛡️
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Legal Support</h3>
              <p className="text-sm text-slate-600">Free legal assistance and documentation help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Story Section */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              📖 Our Story
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Building Dreams Since 2009</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Ama Ghara started with a simple vision: to make home buying and selling 
              transparent, reliable, and enjoyable. What began as a small local agency 
              has grown into Odisha's most trusted real estate platform.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <span className="text-slate-700 font-semibold">15+ years of experience in real estate</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <span className="text-slate-700 font-semibold">500+ properties successfully sold</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <span className="text-slate-700 font-semibold">2000+ happy families served</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="/images/p-2.png" 
                alt="Ama Ghara Office" 
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border-2 border-indigo-100">
              <div className="text-center">
                <div className="text-2xl font-black text-indigo-600">15+</div>
                <div className="text-sm text-slate-600 font-semibold">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="group text-center">
              <div className={`mx-auto mb-4 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-r ${stat.color} text-3xl text-white shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                {stat.icon}
              </div>
              <div className="text-4xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {stat.number}{stat.label === 'Satisfaction Rate' ? '%' : '+'}
              </div>
              <div className="text-lg text-slate-600 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision Tabs */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            🎯 Our Purpose
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Mission & Vision</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Driving the future of real estate with innovation and integrity.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl p-2 shadow-xl border-2 border-slate-100">
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === 'mission'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                🎯 Our Mission
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === 'vision'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                🔮 Our Vision
              </button>
              <button
                onClick={() => setActiveTab('values')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === 'values'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                💎 Our Values
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-slate-100">
            {activeTab === 'mission' && (
              <div className="text-center">
                <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-3xl text-white shadow-lg">
                  🎯
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Our Mission</h3>
                <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  To simplify the home buying and selling process by providing transparent, 
                  reliable, and innovative real estate solutions. We strive to make every 
                  family's dream of owning a perfect home a reality through personalized 
                  service, expert guidance, and cutting-edge technology.
                </p>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="text-center">
                <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-3xl text-white shadow-lg">
                  🔮
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Our Vision</h3>
                <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  To become the most trusted and innovative real estate platform in India, 
                  revolutionizing how people buy, sell, and invest in properties. We envision 
                  a future where finding the perfect home is effortless, transparent, and 
                  enjoyable for everyone.
                </p>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="grid gap-6 sm:grid-cols-2">
                {values.map((value, index) => (
                  <div key={value.title} className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border-2 border-slate-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl">
                    <div className={`mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-r ${value.color} text-2xl text-white shadow-lg`}>
                      {value.icon}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h4>
                    <p className="text-slate-600">{value.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            🏆 Our Achievements
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Why We're the Best Choice</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Discover what makes Ama Ghara the most trusted real estate platform in Odisha.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, index) => (
            <div key={achievement.title} className="group relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center">
                {/* Floating Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                  {achievement.number}
                </div>
                
                {/* Icon */}
                <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-3xl text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  {achievement.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            👥 Meet Our Team
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">The Experts Behind Ama Ghara</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Dedicated professionals committed to making your real estate dreams come true.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={member.name} className="group text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  {member.role}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {member.name}
              </h3>
              <p className="text-slate-600 mb-4 text-sm">{member.description}</p>
              <div className="flex justify-center gap-3">
                <a href={member.social.linkedin} className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors">
                  <span className="text-sm">in</span>
                </a>
                <a href={member.social.twitter} className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                  <span className="text-sm">𝕏</span>
                </a>
                <a href={`mailto:${member.social.email}`} className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <span className="text-sm">✉</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl border-2 border-white bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-12 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative text-center">
                         <h3 className="text-4xl font-black mb-4 text-white">Ready to Start Your Journey?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of happy families who found their perfect homes with Ama Ghara.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/properties" className="group rounded-full bg-white px-8 py-4 font-bold text-indigo-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-2">
                  🏠 Browse Properties
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              <Link to="/contact" className="group rounded-full border-2 border-white/30 bg-white/10 backdrop-blur px-8 py-4 font-bold text-white shadow-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-2">
                  📞 Contact Us
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
