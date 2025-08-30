import { useParams, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function PropertyDetails() {
  const { id } = useParams()
  const location = useLocation()
  const [activeImage, setActiveImage] = useState(0)
  const [showContact, setShowContact] = useState(false)
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        
        // First try to use data passed from Properties component
        if (location.state?.propertyData) {
          setProperty(transformApiData(location.state.propertyData))
          setLoading(false)
          return
        }

        // If no state data, fetch from API
        const response = await fetch(`http://localhost:5000/property/property/${id}`)
        if (!response.ok) {
          throw new Error('Property not found')
        }
        const data = await response.json()
        
        if (data.success && data.property) {
          setProperty(transformApiData(data.property))
        } else {
          throw new Error('Invalid response format')
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching property:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id, location.state])

  // Transform API data to component format
  const transformApiData = (apiData) => {
    return {
      id: apiData._id,
      title: apiData.title,
      price: `₹${(apiData.price / 100000).toFixed(1)} Lakhs`,
      pricePerSqft: `₹${Math.round(apiData.price / (apiData.carpetArea?.value || apiData.superBuiltupArea?.value || 1))}/sqft`,
      type: `${apiData.bhk}BHK ${apiData.propertyType}`,
      status: 'For Rent',
      location: `${apiData.location.address}, ${apiData.location.city}, ${apiData.location.state}`,
      area: `${apiData.carpetArea?.value || apiData.superBuiltupArea?.value || 0} sqft`,
      built: new Date().getFullYear() - 2, // Mock data since not in API
      facing: apiData.facing || 'East',
      floor: `Floor of ${apiData.totalFloors}`,
      furnished: apiData.furnishing,
      parking: `${apiData.carParking || 0} Car parking`,
      description: apiData.description,
      maintenanceMonthly: apiData.maintenanceMonthly,
      bachelorsAllowed: apiData.bachelorsAllowed,
      images: apiData.images?.map(img => img.url) || apiData.pictures || ['/images/p-1.png'],
      amenities: apiData.amenities?.map(amenity => ({
        name: amenity,
        icon: getAmenityIcon(amenity)
      })) || [],
      nearby: [
        { name: 'KIIT University', distance: '2.0 km', type: 'school' },
        { name: 'Local Hospital', distance: '1.5 km', type: 'hospital' },
        { name: 'Shopping Complex', distance: '0.8 km', type: 'shopping' },
        { name: 'Bus Stop', distance: '0.3 km', type: 'transport' },
      ],
      agent: {
        name: 'Property Agent',
        phone: apiData.contactNumber,
        email: apiData.contactEmail,
        experience: '5+ years',
      }
    }
  }

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      'Power Backup': '🔌',
      'Play Ground': '🏃',
      'Security': '🛡️',
      'Fire Safety': '🚨',
      'Swimming Pool': '🏊',
      'Gym': '💪',
      'Garden': '🌳',
      'Lift': '🛗',
      'Parking': '🅿️',
      'Club House': '🏠',
    }
    return iconMap[amenity] || '✅'
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'school': return '🏫'
      case 'hospital': return '🏥'
      case 'shopping': return '🛒'
      case 'transport': return '🚉'
      default: return '📍'
    }
  }

  if (loading) {
    return (
      <section className="space-y-12 px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading property details...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !property) {
    return (
      <section className="space-y-12 px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <p className="text-slate-600">Error loading property: {error || 'Property not found'}</p>
            <Link 
              to="/properties" 
              className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Back to Properties
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-12 px-6 sm:px-8 lg:px-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-sky-600">Home</Link>
        <span>/</span>
        <Link to="/properties" className="hover:text-sky-600">Properties</Link>
        <span>/</span>
        <span className="text-slate-900">{property.title}</span>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-white shadow-2xl">
        <div className="absolute inset-0">
          <img src={property.images[0]} alt="Property" className="w-full h-72 sm:h-80 lg:h-[26rem] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/40"></div>
        </div>
        <div className="relative px-6 py-10 sm:py-14 lg:py-16 text-white">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-4">
              🏠 Property Details
            </div>
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">{property.title}</h1>
            <p className="mt-2 text-white/90">{property.location}</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="badge">{property.type}</span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
              {property.status}
            </span>
            {property.bachelorsAllowed && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                Bachelors Allowed
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{property.title}</h1>
          <p className="text-slate-600 flex items-center gap-1">
            <span>📍</span> {property.location}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-sky-600">{property.price}</div>
          <div className="text-sm text-slate-500">{property.pricePerSqft}</div>
          {property.maintenanceMonthly && (
            <div className="text-sm text-slate-500">+ ₹{property.maintenanceMonthly}/mo maintenance</div>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              <img
                src={property.images[activeImage]}
                alt={`${property.title} - Image ${activeImage + 1}`}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
            {property.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`rounded-lg overflow-hidden border-2 transition ${
                      activeImage === index ? 'border-sky-500' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-bold mb-4">Property Details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Area:</span>
                <span className="font-semibold">{property.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Built Year:</span>
                <span className="font-semibold">{property.built}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Facing:</span>
                <span className="font-semibold">{property.facing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Floor:</span>
                <span className="font-semibold">{property.floor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Furnished:</span>
                <span className="font-semibold">{property.furnished}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Parking:</span>
                <span className="font-semibold">{property.parking}</span>
              </div>
              {property.maintenanceMonthly && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Maintenance:</span>
                  <span className="font-semibold">₹{property.maintenanceMonthly}/mo</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-600">Bachelors:</span>
                <span className="font-semibold">{property.bachelorsAllowed ? 'Allowed' : 'Not Allowed'}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-bold mb-4">Description</h3>
            <p className="text-slate-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <div className="rounded-2xl border p-6">
              <h3 className="text-xl font-bold mb-4">Amenities</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{amenity.icon}</span>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Places */}
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-bold mb-4">What's Nearby</h3>
            <div className="space-y-3">
              {property.nearby.map((place, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(place.type)}</span>
                    <span>{place.name}</span>
                  </div>
                  <span className="text-sm text-slate-500">{place.distance}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map */}

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="rounded-2xl border-2 border-white bg-white p-6 shadow-xl sticky top-24">
            <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
            
            {/* Agent Info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
                  {property.agent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold">{property.agent.name}</div>
                  <div className="text-sm text-slate-500">{property.agent.experience} experience</div>
                </div>
              </div>
            </div>

            {showContact ? (
              <div className="space-y-3">
                <a href={`tel:${property.agent.phone}`} className="btn-primary w-full">
                  📞 Call {property.agent.phone}
                </a>
                <a href={`mailto:${property.agent.email}`} className="btn-outline w-full">
                  ✉️ Email Agent
                </a>
                <button 
                  onClick={() => setShowContact(false)}
                  className="w-full text-sm text-slate-500 hover:text-slate-700"
                >
                  Hide Contact
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <input className="w-full rounded-xl border px-4 py-3" placeholder="Your Name" />
                <input className="w-full rounded-xl border px-4 py-3" placeholder="Phone Number" type="tel" />
                <input className="w-full rounded-xl border px-4 py-3" placeholder="Email" type="email" />
                <textarea 
                  className="w-full rounded-xl border px-4 py-3" 
                  rows="3" 
                  placeholder="I'm interested in this property..."
                />
                <button 
                  onClick={() => setShowContact(true)}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Get Contact Details
                </button>
                <div className="text-center">
                  <button className="w-full py-3 px-5 rounded-2xl font-bold text-indigo-700 bg-white border-2 border-indigo-200 hover:bg-indigo-50 transition-all">Schedule Site Visit</button>
                </div>
              </form>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border-2 border-white bg-white p-6 shadow-xl">
            <h4 className="font-bold mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition">
                ❤️ Save to Favorites
              </button>
              <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition">
                📤 Share Property
              </button>
              <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition">
                📊 Property Report
              </button>
              <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition">
                🏦 EMI Calculator
              </button>
            </div>
          </div>

          {/* Property Highlights */}
          <div className="rounded-2xl border-2 border-white bg-white p-6 shadow-xl">
            <h4 className="font-bold mb-4">Property Highlights</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Monthly Rent:</span>
                <span className="font-semibold text-indigo-600">₹{property.price.replace('₹', '').replace(' Lakhs', '000')}</span>
              </div>
              {property.maintenanceMonthly && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Maintenance:</span>
                  <span className="font-semibold">₹{property.maintenanceMonthly}/mo</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-600">Carpet Area:</span>
                <span className="font-semibold">{property.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Furnishing:</span>
                <span className="font-semibold">{property.furnished}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="border-t pt-8">
        <h3 className="text-2xl font-bold mb-6">Similar Properties</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { id: 2, title: '1BHK in Patia', price: '₹28L', badge: '1BHK', img: '/images/p-2.png' },
            { id: 3, title: '3BHK in Jaydev Vihar', price: '₹65L', badge: '3BHK', img: '/images/p-5.png' },
            { id: 4, title: '2BHK in Saheed Nagar', price: '₹42L', badge: '2BHK', img: '/images/p-4.png' },
          ].map((prop) => (
            <Link key={prop.id} to={`/properties/${prop.id}`} className="group">
              <article className="overflow-hidden rounded-2xl border bg-white group-hover:shadow-lg transition">
                <div className="relative">
                  <img src={prop.img} alt={prop.title} className="h-48 w-full object-cover" />
                  <span className="badge absolute left-3 top-3">{prop.badge}</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold group-hover:text-sky-600 transition">{prop.title}</h4>
                  <div className="text-sky-600 font-bold mt-1">{prop.price}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}