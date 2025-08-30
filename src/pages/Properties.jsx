import { useMemo, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Properties() {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all') // all | rent | sale | land | 1RK | 1BHK | 2BHK | 3BHK
  const [sort, setSort] = useState('featured')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5000/property/property')
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

  // Read URL params for pre-filling filters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const typeParam = params.get('type')
    const queryParam = params.get('query')
    if (typeParam && tabOptions.some(t => t.key === typeParam)) {
      setActiveTab(typeParam)
    }
    if (queryParam) {
      setQuery(queryParam)
    }
  }, [])

  const sliderRef = useRef(null)

  // Transform API data to match existing component structure
  const transformedItems = useMemo(() => {
    return properties.map(property => ({
      id: property._id,
      title: property.title,
      price: property.price,
      priceLabel: `₹${property.price.toLocaleString()}/mo`,
      badge: `${property.bhk}BHK`,
      img: property.images?.[0]?.url || property.pictures?.[0] || '/images/p-1.png',
      location: `${property.location.address}, ${property.location.city}`,
      area: `${property.carpetArea?.value || property.superBuiltupArea?.value || 0} sqft`,
      beds: property.bhk,
      baths: property.bathrooms,
      category: 'rent', // Since API data shows rent properties
      type: `${property.bhk}BHK`,
      featured: true,
      // Additional data for property details
      propertyData: property
    }))
  }, [properties])

  const tabOptions = [
    { key: 'all', label: 'All' },
    { key: 'rent', label: 'Rent' },
    { key: 'sale', label: 'Sale' },
    { key: 'land', label: 'Land' },
    { key: '1BHK', label: '1BHK' },
    { key: '2BHK', label: '2BHK' },
    { key: '3BHK', label: '3BHK' },
    { key: '4BHK', label: '4BHK' },
  ]

  const counts = useMemo(() => ({
    total: transformedItems.length,
    rent: transformedItems.filter(i => i.category === 'rent').length,
    sale: transformedItems.filter(i => i.category === 'sale').length,
    land: transformedItems.filter(i => i.type === 'Land').length,
  }), [transformedItems])

  const clearFilters = () => {
    setQuery('')
    setActiveTab('all')
    setSort('featured')
    setMinPrice('')
    setMaxPrice('')
    setShowFilters(false)
  }

  const slideLeft = () => {
    if (sliderRef.current) {
      const cardWidth = 288
      const gap = 16
      const scrollAmount = cardWidth + gap
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  const slideRight = () => {
    if (sliderRef.current) {
      const cardWidth = 288
      const gap = 16
      const scrollAmount = cardWidth + gap
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const featuredItems = transformedItems.filter(i => i.featured)

  const filtered = useMemo(() => {
    let list = [...transformedItems]

    // Tab filter
    if (activeTab === 'rent') list = list.filter(i => i.category === 'rent')
    else if (activeTab === 'sale') list = list.filter(i => i.category === 'sale')
    else if (activeTab === 'land') list = list.filter(i => i.type === 'Land')
    else if (['1BHK', '2BHK', '3BHK', '4BHK'].includes(activeTab)) {
      list = list.filter(i => i.type === activeTab)
    }

    // Query filter
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(i => 
        i.title.toLowerCase().includes(q) || 
        i.location.toLowerCase().includes(q)
      )
    }

    // Price filters
    const min = parseInt(minPrice || '0', 10)
    const max = parseInt(maxPrice || '0', 10)
    if (min) list = list.filter(i => i.price >= min)
    if (max) list = list.filter(i => i.price <= max)

    // Sort
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'featured') list.sort((a, b) => Number(b.featured) - Number(a.featured))

    return list
  }, [transformedItems, activeTab, query, sort, minPrice, maxPrice])

  if (loading) {
    return (
      <section className="space-y-12 px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading properties...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="space-y-12 px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <p className="text-slate-600">Error loading properties: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-12 px-6 sm:px-8 lg:px-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-white shadow-2xl">
        <div className="absolute inset-0">
          <img src="/images/p-5.png" alt="Properties" className="w-full h-80 sm:h-96 lg:h-[30rem] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/40"></div>
        </div>
        <div className="relative px-6 py-12 sm:py-16 lg:py-24 text-white">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-5">
              🏘️ Discover Odisha Properties
            </div>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">Find your next home, a premium land plot, or a budget-friendly flat</h1>
            <p className="mt-3 text-white/90 text-lg">Smart filters. Trusted listings. Beautiful homes.</p>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <div className="rounded-3xl border-2 border-white bg-white p-6 sm:p-7 shadow-xl -mt-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tabOptions.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${activeTab === t.key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search + Controls */}
        <div className="grid gap-3 md:gap-4 md:grid-cols-5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="md:col-span-2 rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-800 focus:border-indigo-500 focus:outline-none"
            placeholder="Search by location or keyword"
          />
          <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-800 focus:border-indigo-500 focus:outline-none" placeholder="Min ₹" type="number" />
          <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-800 focus:border-indigo-500 focus:outline-none" placeholder="Max ₹" type="number" />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-800 focus:border-indigo-500 focus:outline-none">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={clearFilters} className="rounded-xl px-3 py-2 font-semibold text-indigo-700 hover:underline bg-white">✕ Clear</button>
            <div className="hidden sm:block text-slate-700 font-semibold">{filtered.length} of {transformedItems.length} results</div>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="rounded-xl px-3 py-2 font-semibold text-white bg-indigo-600 border border-indigo-600">
            {showFilters ? 'Hide Filters' : 'Advanced Filters'}
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input className="rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-800 focus:border-indigo-500 focus:outline-none" placeholder="City / Area (e.g., Patia, Old Town)" />
            <input className="rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-800 focus:border-indigo-500 focus:outline-none" placeholder="Nearby (e.g., school, hospital)" />
          </div>
        )}

        {/* Mini Stats */}
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4">
            <div className="text-2xl font-black text-indigo-700">{counts.total}+</div>
            <div className="text-sm font-semibold text-indigo-700/80">Total Listings</div>
          </div>
          <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4">
            <div className="text-2xl font-black text-indigo-700">{counts.rent}+</div>
            <div className="text-sm font-semibold text-indigo-700/80">For Rent</div>
          </div>
          <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4">
            <div className="text-2xl font-black text-indigo-700">{counts.land}</div>
            <div className="text-sm font-semibold text-indigo-700/80">Land Plots</div>
          </div>
        </div>
      </div>

      {/* Featured Slider */}
      {featuredItems.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-slate-900">Featured</h2>
            <div className="flex items-center gap-3">
              <button onClick={slideLeft} className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                ←
              </button>
              <button onClick={slideRight} className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                →
              </button>
              <Link to="/contact" className="text-indigo-700 font-semibold hover:underline">Need help finding? →</Link>
            </div>
          </div>
          <div ref={sliderRef} className="overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 min-w-max px-1">
              {featuredItems.map(i => (
                <Link 
                  key={i.id} 
                  to={`/properties/${i.id}`}
                  state={{ propertyData: i.propertyData }}
                  className="group snap-start"
                >
                  <article className="w-72 rounded-3xl overflow-hidden border-2 border-white bg-white shadow-xl hover:shadow-2xl transition-all duration-300 snap-always">
                    <div className="relative">
                      <img src={i.img} alt={i.title} className="h-44 w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                      <span className="badge absolute left-3 top-3">{i.badge}</span>
                      <div className="absolute left-3 bottom-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{i.priceLabel}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-900 line-clamp-1">{i.title}</h3>
                      <div className="text-sm text-slate-600 line-clamp-1">{i.location}</div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-black text-slate-900">All Listings</h2>
          <div className="text-sm text-slate-600 font-semibold">Showing {filtered.length} of {transformedItems.length}</div>
        </div>
        
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No properties found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search criteria or filters</p>
            <button onClick={clearFilters} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(i => (
              <Link 
                key={i.id} 
                to={`/properties/${i.id}`}
                state={{ propertyData: i.propertyData }}
                className="group"
              >
                <article className="rounded-3xl overflow-hidden border-2 border-white bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
                  <div className="relative">
                    <img src={i.img} alt={i.title} className="h-56 w-full object-cover transition group-hover:scale-105 duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-70 transition"></div>
                    <span className="badge absolute left-3 top-3">{i.badge}</span>
                    <div className="absolute right-3 top-3">
                      <button className="h-9 w-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-slate-700 hover:text-red-500 transition shadow">♡</button>
                    </div>
                    {i.featured && (
                      <div className="absolute left-3 bottom-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Featured</div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{i.title}</h3>
                    <div className="text-slate-600 text-sm mb-2">{i.location}</div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-indigo-600 font-black text-lg">{i.priceLabel}</div>
                      <div className="text-sm text-slate-600 font-semibold">{i.area}</div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-semibold">
                      <span>🛏️ {i.beds}</span>
                      <span>🛁 {i.baths}</span>
                      <span>📐 {i.area}</span>
                    </div>
                    <button className="btn-outline mt-4 w-full">View Details</button>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Map Preview */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-white">
        <img src="/images/p-6.png" alt="Map preview" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Link to="/contact" className="rounded-2xl bg-white px-6 py-3 font-black text-indigo-700 shadow-xl hover:shadow-2xl transition-all duration-300">
            Open Map View →
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-3xl p-8 lg:p-12 text-white">
          <h2 className="text-3xl font-black mb-4">Can't find what you're looking for?</h2>
          <p className="text-white/90 text-lg mb-8">Tell us your exact needs and our team will find the perfect property for you within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all duration-300">Contact Our Experts</Link>
            <Link to="/services" className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300">Browse Services</Link>
          </div>
        </div>
      </div>
    </section>
  )
}