import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const [searchFilters, setSearchFilters] = useState({
    location: '', type: '', minPrice: '', maxPrice: ''
  })
  const [activeFAQ, setActiveFAQ] = useState(null)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate() ;
const [error, setError] = useState(null)
  const changingTexts = ['home', 'land', 'flat']
  const heroSlides = [
    {
      title: 'Find Your Perfect',
      subtitle: 'home with Ama Ghara',
      description: 'Discover beautiful homes across Odisha with verified listings and transparent pricing.',
      image: '/images/p-1.png'
    },
    {
      title: 'Premium Land',
      subtitle: 'plots with Ama Ghara',
      description: 'Invest in prime land locations with legal verification and expert guidance.',
      image: '/images/p-2.png'
    },
    {
      title: 'Modern Flats',
      subtitle: 'available with Ama Ghara',
      description: 'Contemporary apartments with modern amenities and convenient locations.',
      image: '/images/p-4.png'
    }
  ]
  
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % changingTexts.length)
    }, 2000)
    
    const slideInterval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length)
    }, 4000)
    
    return () => {
      clearInterval(textInterval)
      clearInterval(slideInterval)
    }
  }, [])

    useEffect(() => {
      const fetchProperties = async () => {
        try {
          setLoading(true)
          const response = await fetch('https://amaghara-server.onrender.com/property/property')
          if (!response.ok) {
            throw new Error('Failed to fetch properties')
          }
          const data = await response.json()
          if (data.success && data.properties) {
            setProperties(data.properties)
          } else {
            throw new Error('Invalid response format')
          }
        } catch (err) {
          setError(err.message)
          console.error('Error fetching properties:', err)
        } finally {
          setLoading(false)
        }
      }
  
      fetchProperties()
    }, [])

  const allProperties = [
    { id: 1, title: '1RK near KIIT Square', price: 6500, priceLabel: '₹6,500/mo', badge: '1RK • Rent', img: '/images/p-1.png', location: 'kiit square', type: '1RK' },
    { id: 2, title: '2BHK • Nayapalli', price: 4500000, priceLabel: '₹45L', badge: '2BHK • Sale', img: '/images/p-2.png', location: 'nayapalli', type: '2BHK' },
    { id: 3, title: 'Land Plot • Pahala', price: 2200000, priceLabel: '₹22L', badge: 'Land • Sale', img: '/images/p-4.png', location: 'pahala', type: 'Land' },
    { id: 4, title: '1BHK in Patia', price: 9500, priceLabel: '₹9,500/mo', badge: '1BHK • Rent', img: '/images/p-5.png', location: 'patia', type: '1BHK' },
    { id: 5, title: '3BHK • Saheed Nagar', price: 6500000, priceLabel: '₹65L', badge: '3BHK • Sale', img: '/images/p-6.png', location: 'saheed nagar', type: '3BHK' },
    { id: 6, title: '2BHK • Old Town', price: 12000, priceLabel: '₹12,000/mo', badge: '2BHK • Rent', img: '/images/p-7.png', location: 'old town', type: '2BHK' },
  ]
const filteredProperties = properties.filter(property => {
if (searchFilters.location) {
  const locationString = Object.values(property.location)
    .join(' ')
    .toLowerCase();
  if (!locationString.includes(searchFilters.location.toLowerCase())) return false;
}  if (searchFilters.type && searchFilters.type !== 'Any' && property.type !== searchFilters.type) return false
  const minPrice = searchFilters.minPrice ? parseInt(searchFilters.minPrice) : 0
  const maxPrice = searchFilters.maxPrice ? parseInt(searchFilters.maxPrice) : Infinity
  if (property.price < minPrice || property.price > maxPrice) return false
  return true
})


  const handleSearchChange = (field, value) => setSearchFilters(prev => ({ ...prev, [field]: value }))
  const clearFilters = () => setSearchFilters({ location: '', type: '', minPrice: '', maxPrice: '' })

  const amenities = [
    { name: '24x7 Security', emoji: '🛡️', color: 'from-rose-500 to-pink-500', bg: 'bg-gradient-to-br from-rose-50 to-pink-50' },
    { name: 'Parking', emoji: '🅿️', color: 'from-indigo-500 to-violet-500', bg: 'bg-gradient-to-br from-indigo-50 to-violet-50' },
    { name: 'Lift', emoji: '🛗', color: 'from-fuchsia-500 to-purple-500', bg: 'bg-gradient-to-br from-fuchsia-50 to-purple-50' },
    { name: 'Water Supply', emoji: '🚰', color: 'from-cyan-500 to-sky-500', bg: 'bg-gradient-to-br from-cyan-50 to-sky-50' },
    { name: 'Power Backup', emoji: '🔌', color: 'from-amber-500 to-orange-500', bg: 'bg-gradient-to-br from-amber-50 to-orange-50' },
    { name: 'Near Schools', emoji: '🏫', color: 'from-emerald-500 to-teal-500', bg: 'bg-gradient-to-br from-emerald-50 to-teal-50' },
  ]

  const testimonials = [
    { name: 'S. Pradhan', role: 'Bhubaneswar', text: 'Found a clean 1BHK in 2 days. Transparent pricing and polite owners.', rating: 5, avatar: 'SP' },
    { name: 'R. Mishra', role: 'Cuttack', text: 'Great guidance with land paperwork. Smooth registration.', rating: 5, avatar: 'RM' },
    { name: 'P. Dash', role: 'Bhubaneswar', text: 'Helped us shortlist the best 2BHK within budget. Super responsive!', rating: 5, avatar: 'PD' },
  ]

  const stats = [
    { number: '500+', label: 'Listings', icon: '🏠', color: 'from-indigo-500 to-violet-500' },
    { number: '1200+', label: 'Happy Clients', icon: '😊', color: 'from-emerald-500 to-teal-500' },
    { number: '4.9★', label: 'Avg Rating', icon: '⭐', color: 'from-amber-500 to-orange-500' },
    { number: '50+', label: 'Cities', icon: '🌆', color: 'from-fuchsia-500 to-purple-500' },
  ]

  const featuredLocations = [
    { name: 'Patia', properties: 45, avgPrice: '₹8,500/mo', image: '/images/p-1.png', color: 'from-indigo-600 to-violet-600' },
    { name: 'Nayapalli', properties: 32, avgPrice: '₹12,000/mo', image: '/images/p-2.png', color: 'from-indigo-600 to-violet-600' },
    { name: 'KIIT Square', properties: 28, avgPrice: '₹6,500/mo', image: '/images/p-4.png', color: 'from-indigo-600 to-violet-600' },
    { name: 'Saheed Nagar', properties: 38, avgPrice: '₹15,000/mo', image: '/images/p-5.png', color: 'from-indigo-600 to-violet-600' },
  ]

  const latestDeals = [
    { title: 'Flash Sale! 2BHK in Patia', discount: '15% OFF', originalPrice: '₹45L', newPrice: '₹38.25L', daysLeft: 3, color: 'from-rose-500 to-pink-500', propertyId: 6 },
    { title: 'New Launch: 1BHK near KIIT', discount: '10% OFF', originalPrice: '₹28L', newPrice: '₹25.2L', daysLeft: 7, color: 'from-indigo-500 to-violet-500', propertyId: 4 },
    { title: 'Weekend Special: Land Plot', discount: '20% OFF', originalPrice: '₹22L', newPrice: '₹17.6L', daysLeft: 2, color: 'from-emerald-500 to-teal-500', propertyId: 3 },
  ]

  const whyChooseUs = [
    { icon: '🔍', title: 'Verified Properties', desc: 'Every listing is personally verified by our team', color: 'from-indigo-500 to-violet-500' },
    { icon: '💰', title: 'Best Prices', desc: 'Negotiated rates and transparent pricing', color: 'from-emerald-500 to-teal-500' },
    { icon: '⚡', title: 'Quick Process', desc: 'From viewing to possession in 7 days', color: 'from-amber-500 to-orange-500' },
    { icon: '🛡️', title: 'Legal Support', desc: 'Free legal assistance and documentation', color: 'from-rose-500 to-pink-500' },
    { icon: '📱', title: '24/7 Support', desc: 'Round the clock customer service', color: 'from-fuchsia-500 to-purple-500' },
    { icon: '🏆', title: 'Award Winning', desc: 'Best real estate platform 2024', color: 'from-cyan-500 to-sky-500' },
  ]

  const faqs = [
    { question: 'How do I schedule a property visit?', answer: 'Simply click on any property and use our booking form. We\'ll arrange a visit within 24 hours.' },
    { question: 'What documents do I need for renting?', answer: 'ID proof, address proof, employment letter, and 2-3 months rent as security deposit.' },
    { question: 'Do you provide home loan assistance?', answer: 'Yes! We partner with leading banks to offer the best home loan rates and quick approvals.' },
    { question: 'Are all properties verified?', answer: 'Absolutely! Every property is personally verified by our team before listing.' },
    { question: 'What if I\'m not satisfied with the property?', answer: 'We offer a 7-day satisfaction guarantee. If you\'re not happy, we\'ll find you another property.' },
  ]

  return (
    <>
      {/* Hero Section - Full Screen Photo Slider */}
      <div className="relative min-h-screen overflow-hidden w-full">
        {/* Full Screen Photo Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlideIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
        
        {/* Content Overlay */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center text-white w-full px-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 backdrop-blur px-6 py-3 text-sm mb-8 px-4">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
              <span className="font-semibold">Trusted Odisha Real Estate</span>
              <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">✓ Verified</span>
            </div>
            
            {/* Auto-changing title with elegant animation */}
            <div className="space-y-6 mb-8 px-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                <span className="block text-white mb-2">{heroSlides[currentSlideIndex].title}</span>
                <span className="block text-white">
                  {heroSlides[currentSlideIndex].subtitle}
                </span>
              </h1>
              
              {/* Auto-changing description */}
              <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto px-4">
                {heroSlides[currentSlideIndex].description}
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 px-4">
              <Link to="/properties" className="group rounded-full bg-white px-6 py-3 font-bold text-slate-900 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-2">
                  🏠 Browse Properties
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              <Link to="/pricing" className="group rounded-full border-2 border-white/30 bg-white/10 backdrop-blur px-6 py-3 font-bold text-white shadow-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-2">
                  💰 View Pricing
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto px-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur text-2xl text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 border border-white/20">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-black text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-white/80 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-white/50 ${
                  currentSlideIndex === index 
                    ? 'bg-white scale-125 border-white' 
                    : 'bg-transparent hover:bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Slide Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-1000 ease-linear"
            style={{ width: `${((currentSlideIndex + 1) / heroSlides.length) * 100}%` }}
          />
          
        </div>
      </div>

      


      {/* Latest Deals */}
      <div className="mx-auto max-w-7xl px-6 pt-7 pb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            🔥 Limited Time Offers
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Latest Deals</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Don't miss these exclusive offers! Limited time deals on premium properties with incredible discounts.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestDeals.map((deal, i) => (
            <div key={i} className="relative rounded-3xl border-2 border-white bg-white p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute -top-3 -right-3 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">{deal.discount}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{deal.title}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 line-through font-semibold">{deal.originalPrice}</span>
                  <span className="text-2xl font-black text-slate-900">{deal.newPrice}</span>
                </div>
                <div className="text-sm text-slate-600 font-semibold">⏰ {deal.daysLeft} days left</div>
              </div>
              <Link to={`/properties/${deal.propertyId || 1}`} className="w-full mt-4 rounded-2xl bg-indigo-600 py-3 font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center block">Grab Deal Now!</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="mx-auto max-w-7xl px-6 pt-7 pb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            🏘️ Property Types
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Popular Categories</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Choose from our most sought-after property types designed for every lifestyle and budget.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
    { title: 'Land Plots', desc: 'Residential & commercial', icon: '🌱', param: 'land' },
    { title: '1RK & 1BHK', desc: 'Budget-friendly rentals', icon: '🏠', param: '1BHK' },
    { title: '2BHK', desc: 'Family-friendly homes', icon: '🏡', param: '2BHK' },
    { title: '3BHK', desc: 'Premium spacious living', icon: '🏰', param: '3BHK' },
  ].map((c) => (
        
            <button key={c.title}
    onClick={() => navigate(`/properties?type=${c.param}`)}
                 className="rounded-3xl border-2 border-slate-200 bg-white p-8 text-left shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-indigo-300">
              <div className="text-4xl mb-4">{c.icon}</div>
              <div className="text-xl font-bold mb-2 text-slate-900">{c.title}</div>
              <div className="text-sm text-slate-600 font-semibold">{c.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Locations */}
      <div className="mx-auto max-w-7xl px-6 pt-7 pb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            📍 Prime Locations
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Featured Locations</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Explore the most popular and rapidly developing areas in Bhubaneswar with excellent connectivity.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredLocations.map((location) => (
            <div key={location.name} className="group rounded-3xl overflow-hidden border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="relative h-48">
                <img src={location.image} alt={location.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{location.name}</h3>
                  <p className="text-sm opacity-90 font-semibold">{location.properties} properties</p>
                </div>
              </div>
              <div className="p-5 bg-white">
                <div className="text-lg font-bold text-slate-900 mb-3">Avg: {location.avgPrice}</div>
                <Link to={`/properties?query=${encodeURIComponent(location.name.toLowerCase())}`} className="w-full rounded-2xl bg-indigo-600 py-3 font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center block">Explore Area</Link>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Search */}
      <div className="mx-auto max-w-7xl px-6 py-16 -mt-4">
        <div className="rounded-3xl border-2 border-white bg-white/95 backdrop-blur p-8 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-2xl">🔍</span>
              Find Your Dream Property
            </h3>
            {(searchFilters.location || searchFilters.type || searchFilters.minPrice || searchFilters.maxPrice) && (
              <button onClick={clearFilters} className="text-sm text-indigo-700 hover:underline font-semibold">✕ Clear filters</button>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            <input className="md:col-span-2 rounded-2xl border-2 border-slate-200 px-5 py-4 text-lg focus:border-indigo-500 focus:outline-none shadow-sm" placeholder="📍 Location (e.g., Patia, Nayapalli)" value={searchFilters.location} onChange={(e) => handleSearchChange('location', e.target.value)} />
            <select className="rounded-2xl border-2 border-slate-200 px-5 py-4 text-lg focus:border-indigo-500 focus:outline-none shadow-sm" value={searchFilters.type} onChange={(e) => handleSearchChange('type', e.target.value)}>
              <option value="">🏠 Type: Any</option>
              <option value="1RK">1RK</option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
              <option value="Land">Land</option>
            </select>
            <input className="rounded-2xl border-2 border-slate-200 px-5 py-4 text-lg focus:border-indigo-500 focus:outline-none shadow-sm" placeholder="💰 Min Price (₹)" type="number" value={searchFilters.minPrice} onChange={(e) => handleSearchChange('minPrice', e.target.value)} />
            <input className="rounded-2xl border-2 border-slate-200 px-5 py-4 text-lg focus:border-indigo-500 focus:outline-none shadow-sm" placeholder="💰 Max Price (₹)" type="number" value={searchFilters.maxPrice} onChange={(e) => handleSearchChange('maxPrice', e.target.value)} />
          </div>

        </div>
      </div>

{/* Properties (filtered) */}
<div className="mx-auto max-w-7xl px-4 pt-5 pb-12">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
      {(searchFilters.location || searchFilters.type || searchFilters.minPrice || searchFilters.maxPrice) 
        ? <>🔍 <span>Search Results</span></> 
        : <>⭐ <span>Featured Listings</span></>
      }
    </h2>
    <Link 
      to="/properties" 
      className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors duration-200 flex items-center gap-1"
    >
      View all <span className="text-xs">→</span>
    </Link>
  </div>
  
  {filteredProperties.length > 0 ? (
    <div className="relative">
      {/* Horizontal scrolling container */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth">
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {filteredProperties.slice(0, 8).map((property,index) => (
          <Link 
            key={index} 
            to={`/properties/${property._id}`}
            className="group flex-shrink-0 w-72"
          >
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
              <div className="relative">
                <img 
                  src={property.pictures[0]} 
                  alt={property.title} 
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                <span className="absolute left-3 top-3 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm border border-slate-200/50">
                  {property.badge}
                </span>
                
                <div className="absolute right-3 top-3">
                  <button className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm text-slate-500 shadow-sm hover:text-rose-500 hover:bg-white border border-slate-200/50 transition-all duration-300 flex items-center justify-center text-sm">
                    ♡
                  </button>
                </div>
              </div>
              
              <div className="p-4 space-y-2.5">
                <h3 className="font-bold text-base leading-tight group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                  {property.title}
                </h3>
                
                <div className="text-indigo-600 font-black text-lg">
                  {property.priceLabel}
                </div>
                
                <button className="w-full rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-300 flex items-center justify-center gap-1">
                  View Details 
                  <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </button>
              </div>
            </article>
          </Link>
        ))}
        
        {/* Show more card if there are more properties */}
        {filteredProperties.length > 8 && (
          <Link 
            to={`/properties/${i._id}`}
            className="flex-shrink-0 w-72 group"
          >
            <div className="h-full rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-300 flex flex-col items-center justify-center text-center p-8">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🏠</div>
              <h3 className="font-bold text-slate-700 mb-2">View More Properties</h3>
              <p className="text-sm text-slate-500 mb-4">
                +{filteredProperties.length - 8} more available
              </p>
              <div className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm group-hover:shadow-md transition-all duration-300">
                Browse All →
              </div>
            </div>
          </Link>
        )}
      </div>
      
      {/* Scroll indicators */}
      <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 z-10">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.currentTarget.closest('.relative').querySelector('.overflow-x-auto').scrollBy({ left: -300, behavior: 'smooth' });
          }}
          className="h-10 w-10 rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          ←
        </button>
      </div>
      <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.currentTarget.closest('.relative').querySelector('.overflow-x-auto').scrollBy({ left: 300, behavior: 'smooth' });
          }}
          className="h-10 w-10 rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          →
        </button>
      </div>
    </div>
  ) : (
    <div className="text-center py-12">
      <div className="text-5xl mb-3 animate-bounce">🔍</div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">No properties found</h3>
      <p className="text-slate-600 mb-4 text-sm">Try adjusting your search filters</p>
      <button 
        onClick={clearFilters} 
        className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-md hover:shadow-lg hover:bg-indigo-700 transition-all duration-300"
      >
        Clear Filters
      </button>
    </div>
  )}
</div>

      {/* Virtual Tour */}
      <div className="mx-auto max-w-7xl px-6 pt-7 pb-20">
                    <div className="rounded-3xl border-2 border-white bg-white p-10 shadow-xl">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-3">🏡 Virtual Property Tours</h2>
              <p className="text-lg text-slate-600 mb-6">Experience properties from home with our immersive 360° tours.</p>
              <ul className="space-y-3 text-slate-700 mb-6">
                <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> 360° panoramic views</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Measure room dimensions</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Check natural lighting</li>
              </ul>
              <Link to="/contact" className="rounded-2xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-block">Start Virtual Tour</Link>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img src="/images/p-1.png" alt="Virtual tour" className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mx-auto max-w-7xl px-6 pt-7 pb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            🤝 Trust & Excellence
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Why Choose Ama Ghara?</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">We're your trusted partner in finding the perfect home with unmatched expertise and personalized service.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="rounded-3xl border-2 border-white bg-white p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-indigo-600 text-3xl text-white shadow-lg">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 font-semibold">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mx-auto max-w-7xl px-6 pt-7 pb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            ✨ Luxury Amenities
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Amenities you'll love</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Modern conveniences and luxury amenities designed to enhance your living experience.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {amenities.map((a) => (
            <div key={a.name} className="rounded-3xl border-2 border-white bg-white p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-indigo-600 text-3xl text-white shadow-lg">
                {a.emoji}
              </div>
              <div className="font-bold text-slate-800">{a.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mx-auto max-w-7xl px-6 pt-7 pb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-sky-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            💬 Customer Stories
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">What people say</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Real stories and testimonials from our happy customers who found their dream homes with us.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-3xl border-2 border-white bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="text-sm text-slate-500 font-semibold">{t.role}</div>
                </div>
              </div>
              <div className="text-amber-500 text-lg mb-3">{'★'.repeat(t.rating)}</div>
              <blockquote className="text-slate-600 font-semibold">"{t.text}"</blockquote>
            </figure>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-7xl px-6 pt-7 pb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            ❓ Get Answers
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Everything you need to know about our services, properties, and the buying process.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl border-2 border-white bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <button onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)} className="w-full p-6 text-left flex items-center justify-between hover:bg-indigo-50 transition-colors duration-300">
                <span className="text-lg font-bold text-slate-900">{faq.question}</span>
                <span className="text-2xl text-indigo-700 font-bold">{activeFAQ === idx ? '−' : '+'}</span>
              </button>
              {activeFAQ === idx && (
                <div className="px-6 pb-6 text-slate-600 font-semibold">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-7xl px-6 pt-7 pb-20">
        <div className="relative overflow-hidden rounded-3xl border-2 border-white bg-indigo-600 p-12 text-white shadow-2xl">
          <div className="relative grid gap-8 items-center md:grid-cols-3">
            <div className="md:col-span-2">
              <h3 className="text-4xl font-black mb-3 text-white">🚀 Ready to visit your next home?</h3>
              <p className="text-lg opacity-90 font-semibold">Schedule site visits, get expert guidance, and move in with confidence.</p>
            </div>
            <div className="md:text-right">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 font-black text-indigo-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-2">
                  📞 Book Free Consultation
                  <span className="text-2xl">→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
